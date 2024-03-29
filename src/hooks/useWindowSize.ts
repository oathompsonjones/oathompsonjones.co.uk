"use client";
import { useEffect, useState } from "react";

interface WindowDimensions {
    innerHeight: number;
    innerWidth: number;
    outerHeight: number;
    outerWidth: number;
}

export default function useWindowSize(): WindowDimensions {
    const [windowSize, setWindowSize] = useState<WindowDimensions>(() => ({
        innerHeight: typeof window === "undefined" ? 0 : window.innerHeight,
        innerWidth: typeof window === "undefined" ? 0 : window.innerWidth,
        outerHeight: typeof window === "undefined" ? 0 : window.outerHeight,
        outerWidth: typeof window === "undefined" ? 0 : window.outerWidth
    }));
    const onResize = (): void => setWindowSize({
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth,
        outerHeight: window.outerHeight,
        outerWidth: window.outerWidth
    });
    useEffect(() => {
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);
    return windowSize;
}
