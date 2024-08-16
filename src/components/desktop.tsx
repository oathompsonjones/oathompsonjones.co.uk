import type { ReactElement } from "react";
import type { Theme } from "@mui/material";
import { useMediaQuery } from "@mui/material";

/**
 * Renders its children on desktop only.
 * @returns A div.
 */
export function Desktop({ children }: { readonly children?: ReactElement | ReactElement[]; }): ReactElement {
    return useMediaQuery((theme: Theme) => theme.breakpoints.up("md"))
        ? <>{children}</>
        : <></>;
}
