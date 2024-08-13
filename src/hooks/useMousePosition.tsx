"use client";

import { useEffect, useState } from "react";

/**
 * Returns the current mouse position.
 * @returns An object containing the current mouse position.
 */
export default function useMousePosition(): { x: number; y: number; } {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const updateMousePosition = (event: MouseEvent): void => setMousePosition({ x: event.clientX, y: event.clientY });

    useEffect(() => {
        document.addEventListener("mousemove", updateMousePosition);

        return (): void => document.removeEventListener("mousemove", updateMousePosition);
    }, []);

    return mousePosition;
}
