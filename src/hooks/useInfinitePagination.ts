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
    initialPage: InfinitePaginationPage<T>;
    fetchPage: (
        params: InfinitePaginationFetchParams,
    ) => Promise<InfinitePaginationPage<T>>;
    getItemKey?: (item: T) => string;
};

export type UseInfinitePaginationResult<T> = {
    items: T[];
    hasNextPage: boolean;
    isLoading: boolean;
    error: string | null;
    loadMore: () => void;
    retry: () => void;
    reset: (page: InfinitePaginationPage<T>) => void;
};

/**
 * Provides cursor-based infinite scrolling pagination.
 *
 * Pages are automatically loaded while the current page does not fill
 * the viewport. Once the page extends beyond the viewport, another page
 * is loaded when the user reaches the bottom.
 *
 * @param options - Pagination configuration.
 * @param options.initialPage - The first page of results.
 * @param options.fetchPage - Function used to fetch subsequent pages.
 * @param options.getItemKey - Optional function used to remove duplicates.
 * @returns Infinite pagination state and controls.
 */
export function useInfinitePagination<T>({ initialPage, fetchPage, getItemKey }: UseInfinitePaginationOptions<T>): UseInfinitePaginationResult<T> {
    const [items, setItems] = useState<T[]>(initialPage.items);
    const [hasNextPage, setHasNextPage] = useState(initialPage.hasNextPage);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const cursorRef = useRef<string | null>(initialPage.endCursor);
    const hasNextPageRef = useRef(initialPage.hasNextPage);
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
     * Determines whether the document is currently at its bottom.
     *
     * A document which is shorter than the viewport is considered to be
     * at the bottom too.
     */
    const isAtBottom = useCallback((): boolean => {
        const documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);

        return documentHeight <= window.innerHeight || window.scrollY + window.innerHeight >= documentHeight - 2;
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
        if (loadingRef.current || !hasNextPageRef.current || cursorRef.current === null)
            return false;

        loadingRef.current = true;

        if (mountedRef.current) {
            setIsLoading(true);
            setError(null);
        }

        try {
            const page = await fetchPage({ cursor: cursorRef.current });

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

            setHasNextPage(page.hasNextPage);

            return true;
        } catch (caught) {
            if (!mountedRef.current)
                return false;

            setError(caught instanceof Error ? caught.message : "Failed to load more items.");

            return false;
        } finally {
            loadingRef.current = false;

            if (mountedRef.current)
                setIsLoading(false);
        }
    }, [fetchPage, getItemKey]);

    /**
     * Fills the viewport with additional pages while the user is
     * effectively already at the bottom of the document.
     */
    const fillViewport = useCallback(async (): Promise<void> => {
        if (fillingRef.current)
            return;

        fillingRef.current = true;

        try {
            while (mountedRef.current && hasNextPageRef.current && cursorRef.current !== null) {
                await waitForRender();

                if (!isAtBottom())
                    break;

                const loaded = await fetchNextPage();

                if (!loaded)
                    break;
            }
        } finally {
            fillingRef.current = false;
        }
    }, [fetchNextPage, isAtBottom, waitForRender]);

    /**
     * Loads more items when the user reaches the bottom.
     */
    const loadMore = useCallback((): void => {
        if (loadingRef.current || fillingRef.current || !hasNextPageRef.current || cursorRef.current === null)
            return;

        void fillViewport();
    }, [fillViewport]);

    /**
     * Resets the pagination state to a new initial page.
     *
     * This is useful when the parent changes the dataset, such as when
     * applying a search or filter.
     */
    const reset = useCallback((page: InfinitePaginationPage<T>): void => {
        cursorRef.current = page.endCursor;
        hasNextPageRef.current = page.hasNextPage;

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
        void fillViewport();
    }, [fillViewport]);

    /**
     * Automatically fills an under-filled viewport after the initial
     * render or whenever the item count changes.
     */
    useEffect(() => {
        void fillViewport();
    }, [fillViewport, items.length]);

    /**
     * Loads another page when the user reaches the bottom.
     */
    useEffect(() => {
        const onScroll = (): void => {
            if (isAtBottom())
                loadMore();
        };

        window.addEventListener("scroll", onScroll, { passive: true });

        return (): void => window.removeEventListener("scroll", onScroll);
    }, [isAtBottom, loadMore]);

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
    }, [isAtBottom, loadMore]);

    return { items, hasNextPage, isLoading, error, loadMore, retry, reset };
}
