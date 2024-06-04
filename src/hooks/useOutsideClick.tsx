"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";

/**
 * Handles clicks outside of a component.
 * @param callback - Function to execute when the user clicks outside of the component.
 * @returns The ref object to pass to the component.
 */
export default function useOutsideClick<T>(callback: () => T): RefObject<HTMLElement> {
    const ref = useRef<HTMLElement>({} as HTMLElement);

    useEffect(() => {
        const handleClick = (): T => callback();

        document.addEventListener("click", handleClick);

        return (): void => document.removeEventListener("click", handleClick);
    }, []);

    return ref;
}
