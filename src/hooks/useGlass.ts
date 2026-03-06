"use client";

import { AccessibilityContext } from "contexts/accessibility";
import { useContext } from "react";

/**
 * A custom hook that provides styles for a glass effect,
 * taking into account accessibility settings and a disabled state.
 * @param disabled - Whether the glass effect is disabled. Defaults to false.
 * When true, the component will render with a transparent background and no blur effect.
 * @returns The class name to apply to the component for the glass effect.
 */
export function useGlass(disabled: boolean = false): string {
    const { reduceTransparency } = useContext(AccessibilityContext);
    const paperClass = `paper ${disabled ? "paper-disabled" : ""}`;
    const glassClass = reduceTransparency ? "" : `glass ${disabled ? "glass-disabled" : "glass-enabled"}`;

    return `${paperClass} ${glassClass}`.trim();
}
