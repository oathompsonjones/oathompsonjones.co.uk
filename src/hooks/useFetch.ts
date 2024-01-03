"use client";
import { useEffect, useState } from "react";

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
        }
    );

    return (): T => {
        switch (status) {
            case "pending":
                // eslint-disable-next-line @typescript-eslint/no-throw-literal
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
 *
 * @param url The URL to fetch from.
 * @returns The data returned, or null if the fetch fails.
 */
export default function useFetch<T = unknown>(url: string): T | null {
    /* Creates a state variable which will later store the fetched data,
    allowing this Hook to have the same behaviour as the useState Hook. */
    const [resource, setResource] = useState<T | null>(null);

    // Makes a request to fetch data from the URL.
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/require-await
        void (async (): Promise<void> => {
            const data: Promise<T> = fetch(url).then(async (res) => await res.json() as T);
            setResource(promiseWrapper(data));
        })();
    }, [url]);

    // Returns the data.
    return resource;
}
