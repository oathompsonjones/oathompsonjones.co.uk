"use client";

import { useEffect, useState } from "react";

/**
 * Wraps a promise in a function that can be called to get the result of that promise.
 * @template T - The type of the value returned by the promise.
 * @param promise - The promise to wrap.
 * @returns A function that can be called to get the result of the promise.
 */
function promiseWrapper<T = unknown>(promise: Promise<T>): () => T {
    let status: "error" | "pending" | "success" = "pending";
    let result: Error | T;

    const s: Promise<void> = promise.then(
        (value: T) => {
            status = "success";
            result = value;
        },
        (error: Error) => {
            status = "error";
            result = error;
        },
    );

    return (): T => {
        switch (status) {
            case "pending":
                // eslint-disable-next-line @typescript-eslint/no-throw-literal, @typescript-eslint/only-throw-error
                throw s;
            case "success":
                return result as T;
            case "error":
                throw result as Error;
            default:
                throw new Error("Unknown status");
        }
    };
}

/**
 * Fetches data, then rerenders the page once that data has been fetched, using the behaviour provided by `useState`.
 * @template T - The type of the data to fetch.
 * @param url - The URL to fetch from.
 * @param type - The type of the data to expect.
 * @returns The data returned, or null if the fetch fails.
 */
export function useFetch<T = unknown>(url: string, type: T extends string ? "text" : "json"): T | null {
    /* Creates a state variable which will later store the fetched data,
    allowing this Hook to have the same behaviour as the useState Hook. */
    const [resource, setResource] = useState<T | null>(null);

    // Makes a request to fetch data from the URL.
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/require-await
        void (async (): Promise<void> => {
            const data: Promise<T> = fetch(url).then(async (res) => await res[type]() as T);

            setResource(promiseWrapper(data));
        })();
    }, [url]);

    // Returns the data.
    return resource;
}
