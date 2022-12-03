import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

/**
 * Fetches data using Axios, then rerenders the page once that data has been fetched, using the behaviour provided by `useState`.
 *
 * @param {string} url The URL for Axios to fetch from.
 * @returns {([T | null])} The data returned by Axios, or null if the fetch fails.
 */
export const useAxios = <T = unknown>(url: string): [T | null] => {
    // Creates a state variable which will later store the fetched data, allowing this Hook to have the same behaviour as the useState Hook.
    const [data, setData] = useState<T | null>(null);

    // Makes a request to Axios to fetch data from the URL.
    useEffect(() => {
        void (async (): Promise<void> => {
            try {
                const res: AxiosResponse<T> = await axios.get(url);
                setData(res.data);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [url]);

    // Returns the data.
    return [data];
};