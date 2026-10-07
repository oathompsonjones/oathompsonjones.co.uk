import { useCallback, useEffect, useRef, useState } from "react";

export type InfinitePaginationPage<T> = {
    items: T[];
    endCursor: string | null;
    hasNextPage: boolean;
};

export type InfinitePaginationFetchParams = {
    cursor: string | null;
};

export type UseInfinitePaginationOptions<T> = {
    initialPage?: InfinitePaginationPage<T>;
    fetchPage: (
        params: InfinitePaginationFetchParams,
    ) => Promise<InfinitePaginationPage<T>>;
    getItemKey?: (item: T) => string;
};

export type UseInfinitePaginationResult<T> = {
    items: T[];
    hasNextPage: boolean;
    isInitialLoading: boolean;
    isLoading: boolean;
    error: string | null;
    loadMore: () => void;
    retry: () => void;
    reset: (page: InfinitePaginationPage<T>) => void;
};

/**
 * Determines whether the document is currently at its bottom.
 * A document which is shorter than the viewport is considered to be at the bottom too.
 * @returns Whether the bottom of the document is in view.
 */
function isAtBottom(): boolean {
    const documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);

    return documentHeight <= window.innerHeight || window.scrollY + window.innerHeight >= documentHeight - 2;
}

/**
 * Determines whether the document is too short to scroll.
 *
 * Being at the bottom is not enough to keep loading: when placeholders are replaced by
 * items, the document can shrink for a moment, which clamps the scroll position to the bottom.
 * @returns Whether the document fits within the viewport.
 */
function isViewportUnderfilled(): boolean {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) <= window.innerHeight;
}

/**
 * Provides cursor-based infinite scrolling pagination.
 *
 * Pages are automatically loaded while the current page does not fill
 * the viewport. Once the page extends beyond the viewport, another page
 * is loaded when the user reaches the bottom.
 * @template T - The type of the items being paginated.
 * @param options - Pagination configuration.
 * @param options.initialPage - The first page of results. When omitted, the first page is fetched on mount.
 * @param options.fetchPage - Function used to fetch subsequent pages.
 * @param options.getItemKey - Optional function used to remove duplicates.
 * @returns Infinite pagination state and controls.
 */
export function useInfinitePagination<T>({
    initialPage,
    fetchPage,
    getItemKey,
}: UseInfinitePaginationOptions<T>): UseInfinitePaginationResult<T> {
    const [items, setItems] = useState<T[]>(initialPage?.items ?? []);
    const [hasNextPage, setHasNextPage] = useState(initialPage?.hasNextPage ?? true);
    const [isLoading, setIsLoading] = useState(initialPage === undefined);
    const [isInitialLoading, setIsInitialLoading] = useState(initialPage === undefined);
    const [error, setError] = useState<string | null>(null);

    const cursorRef = useRef<string | null>(initialPage?.endCursor ?? null);
    const hasNextPageRef = useRef(initialPage?.hasNextPage ?? true);
    // Until the first page has loaded there is no cursor, but fetching is still allowed.
    const pendingInitialRef = useRef(initialPage === undefined);
    const loadingRef = useRef(false);
    const fillingRef = useRef(false);
    const mountedRef = useRef(true);

    // Tracks whether the component using the hook is mounted.
    useEffect(() => {
        mountedRef.current = true;

        return (): void => {
            mountedRef.current = false;
        };
    }, []);

    /**
     * Waits for the browser to render the newly added content.
     *
     * Two animation frames are used because components such as MUI Masonry
     * may perform their own layout after React has committed the update.
     */
    const waitForRender = useCallback(async (): Promise<void> => {
        await new Promise<void>((resolve) => {
            window.requestAnimationFrame(() => window.requestAnimationFrame(() => resolve()));
        });
    }, []);

    /**
     * Fetches one page of results.
     * @returns Whether the page was loaded successfully.
     */
    const fetchNextPage = useCallback(async (): Promise<boolean> => {
        if (loadingRef.current || !hasNextPageRef.current || cursorRef.current === null && !pendingInitialRef.current)
            return Promise.resolve(false);

        loadingRef.current = true;
        const cursor = cursorRef.current;

        if (mountedRef.current) {
            setIsLoading(true);
            setError(null);
        }

        return fetchPage({ cursor })
            .then(async (page): Promise<boolean> => {
                if (!mountedRef.current)
                    return false;

                setItems((current) => {
                    if (getItemKey === undefined)
                        return [...current, ...page.items];

                    const existing = new Set(current.map(getItemKey));

                    return [...current, ...page.items.filter((item) => !existing.has(getItemKey(item)))];
                });

                cursorRef.current = page.endCursor;
                hasNextPageRef.current = page.hasNextPage;
                pendingInitialRef.current = false;

                setHasNextPage(page.hasNextPage);

                await Promise.resolve();

                return true;
            })
            .catch(async (caught: unknown): Promise<boolean> => {
                if (!mountedRef.current)
                    return false;

                setError(caught instanceof Error ? caught.message : "Failed to load more items.");

                await Promise.resolve();

                return false;
            })
            .finally(() => {
                loadingRef.current = false;

                if (mountedRef.current) {
                    setIsLoading(false);
                    setIsInitialLoading(false);
                }
            });
    }, [fetchPage, getItemKey]);

    /**
     * Fills the viewport with additional pages while the user is
     * effectively already at the bottom of the document.
     */
    const fillViewport = useCallback(async (): Promise<void> => {
        if (fillingRef.current)
            return Promise.resolve();

        fillingRef.current = true;

        const loadUntilViewportFilled = async (): Promise<void> => {
            if (!mountedRef.current || !hasNextPageRef.current ||
                cursorRef.current === null && !pendingInitialRef.current)
                return Promise.resolve();

            return waitForRender().then(async (): Promise<void> => {
                if (!mountedRef.current || !isViewportUnderfilled())
                    return;

                const loaded = await fetchNextPage();

                if (loaded)
                    await loadUntilViewportFilled();
            });
        };

        return loadUntilViewportFilled().finally(() => {
            fillingRef.current = false;
        });
    }, [fetchNextPage, waitForRender]);

    /**
     * Loads more items when the user reaches the bottom.
     */
    const loadMore = useCallback((): void => {
        if (loadingRef.current || fillingRef.current || !hasNextPageRef.current ||
            cursorRef.current === null && !pendingInitialRef.current)
            return;

        void fetchNextPage().then(fillViewport);
    }, [fetchNextPage, fillViewport]);

    /**
     * Resets the pagination state to a new initial page.
     *
     * This is useful when the parent changes the dataset, such as when
     * applying a search or filter.
     */
    const reset = useCallback((page: InfinitePaginationPage<T>): void => {
        cursorRef.current = page.endCursor;
        hasNextPageRef.current = page.hasNextPage;
        pendingInitialRef.current = false;

        setIsInitialLoading(false);
        setItems(page.items);
        setHasNextPage(page.hasNextPage);
        setIsLoading(false);
        setError(null);

        void fillViewport();
    }, [fillViewport]);

    /**
     * Retries the most recent failed request.
     */
    const retry = useCallback((): void => {
        setError(null);

        if (pendingInitialRef.current)
            setIsInitialLoading(true);

        void fillViewport();
    }, [fillViewport]);

    // Fetches the first page when none was provided.
    useEffect(() => {
        if (pendingInitialRef.current)
            void fetchNextPage();
    }, [fetchNextPage]);

    /**
     * Automatically fills an under-filled viewport after the initial
     * render or whenever the item count changes.
     */
    useEffect(() => {
        void fillViewport();
    }, [fillViewport, items.length]);

    // Loads another page when the user reaches the bottom.
    useEffect(() => {
        let lastY = window.scrollY;

        /** Only react to scrolling down, since layout changes can clamp the scroll position upwards. */
        const onScroll = (): void => {
            const previousY = lastY;

            lastY = window.scrollY;

            if (lastY > previousY && isAtBottom())
                loadMore();
        };

        window.addEventListener("scroll", onScroll, { passive: true });

        return (): void => window.removeEventListener("scroll", onScroll);
    }, [loadMore]);

    /**
     * Re-checks whether the viewport needs filling after a resize.
     */
    useEffect(() => {
        const onResize = (): void => {
            if (isAtBottom())
                loadMore();
        };

        window.addEventListener("resize", onResize);

        return (): void => window.removeEventListener("resize", onResize);
    }, [loadMore]);

    return {
        error,
        hasNextPage,
        isInitialLoading,
        isLoading,
        items,
        loadMore,
        reset,
        retry,
    };
}
