import type { ReactElement, ReactNode } from "react";
import type { Theme } from "@mui/material";
import { useMediaQuery } from "@mui/material";

/**
 * Renders its children on mobile only.
 * @param props - The component properties.
 * @param props.children - The children to render.
 * @returns Either the children or nothing.
 */
export function Mobile({ children }: { children: ReactNode; }): ReactElement {
    return useMediaQuery((theme: Theme) => theme.breakpoints.down("md"))
        ? <>{children}</>
        : <></>;
}
