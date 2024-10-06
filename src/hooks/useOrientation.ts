"use client";

import { useEffect, useState } from "react";
import { useWindowSize } from "./useWindowSize";

/**
 * A hook which returns the current orientation of the window.
 * @returns The current orientation of the window.
 */
export function useOrientation(): "landscape" | "portrait" {
    const { height, width } = useWindowSize();
    const [orientation, setOrientation] = useState<"landscape" | "portrait">("portrait");

    useEffect(() => setOrientation(height < width ? "landscape" : "portrait"), [height, width]);

    return orientation;
}
