import type { ReactNode } from "react";
import type { Theme } from "@mui/material";
import { useMediaQuery } from "@mui/material";

/**
 * Renders its children on desktop only.
 * @param props - The component properties.
 * @param props.children - The children to render.
 * @returns Either the children or nothing.
 */
export function Desktop({ children }: { children: ReactNode; }): ReactNode {
    return useMediaQuery((theme: Theme) => theme.breakpoints.up("md"))
        ? <>{children}</>
        : <></>;
}
