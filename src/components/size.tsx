import type { ReactNode } from "react";
import type { Theme } from "@mui/material";
import { useMediaQuery } from "@mui/material";

/**
 * Renders its children depending on the screen size.
 * @param props - The component properties.
 * @param props.xs - The children to render on extra small screens.
 * @param props.sm - The children to render on small screens.
 * @param props.md - The children to render on medium screens.
 * @param props.lg - The children to render on large screens.
 * @param props.xl - The children to render on extra large screens.
 * @returns Either the children or nothing.
 */
export function Size({ lg, md, sm, xl, xs }: Partial<Record<"lg" | "md" | "sm" | "xl" | "xs", ReactNode>>): ReactNode {
    const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.up("xs"));
    const isSm = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
    const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
    const isLg = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
    const isXl = useMediaQuery((theme: Theme) => theme.breakpoints.up("xl"));

    if (isXl)
        return xl ?? lg ?? md ?? sm ?? xs;

    if (isLg)
        return lg ?? md ?? sm ?? xs;

    if (isMd)
        return md ?? sm ?? xs;

    if (isSm)
        return sm ?? xs;

    if (isXs)
        return xs;

    return xs;
}
