import { useEffect, useState } from "react";
import type { AxiosResponse } from "axios";
import axios from "axios";

/**
 * Fetches data using Axios, then rerenders the page once that data has been fetched, using the behaviour provided by `useState`.
 *
 * @param {string} url The URL for Axios to fetch from.
 * @returns {([T | null])} The data returned by Axios, or null if the fetch fails.
 */
export function useAxios<T = unknown>(url: string): [T | null] {
    /* Creates a state variable which will later store the fetched data, allowing this Hook to have
        the same behaviour as the useState Hook. */
    const [data, setData] = useState<T | null>(null);

    // Makes a request to Axios to fetch data from the URL.
    useEffect(() => {
        void (async (): Promise<void> => {
            try {
                console.log(url);
                const res: AxiosResponse<T> = await axios.get(url);
                console.log(res);
                setData(res.data);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [url]);

    // Returns the data.
    return [data];
}
