"use client";

import { useEffect, useState } from "react";

type MousePosition = {
    clientX: number;
    clientY: number;
    movementX: number;
    movementY: number;
    offsetX: number;
    offsetY: number;
    pageX: number;
    pageY: number;
    screenX: number;
    screenY: number;
};

/**
 * Returns the current mouse position.
 * @returns An object containing the current mouse position.
 */
export default function useMousePosition(): MousePosition {
    const [mousePosition, setMousePosition] = useState<MousePosition>({
        clientX: 0,
        clientY: 0,
        movementX: 0,
        movementY: 0,
        offsetX: 0,
        offsetY: 0,
        pageX: 0,
        pageY: 0,
        screenX: 0,
        screenY: 0,
    });
    const updateMousePosition = (event: MouseEvent): void => setMousePosition({
        clientX: event.clientX,
        clientY: event.clientY,
        movementX: event.movementX,
        movementY: event.movementY,
        offsetX: event.offsetX,
        offsetY: event.offsetY,
        pageX: event.pageX,
        pageY: event.pageY,
        screenX: event.screenX,
        screenY: event.screenY,
    });

    useEffect(() => {
        document.addEventListener("mousemove", updateMousePosition);

        return () => document.removeEventListener("mousemove", updateMousePosition);
    }, []);

    return mousePosition;
}
