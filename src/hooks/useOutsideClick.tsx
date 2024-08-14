"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";

/**
 * Handles clicks outside of a component.
 * @param callback - Function to execute when the user clicks outside of the component.
 * @returns The ref object to pass to the component.
 */
export default function useOutsideClick<T>(callback: () => T): RefObject<HTMLElement> {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent): void {
            if (ref.current !== null && !ref.current.contains(event.target as Node)) {
                callback();
            }
        }
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ref]);

    return ref;
}
