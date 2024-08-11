import { Theme, useMediaQuery } from "@mui/material";
import type { ReactElement } from "react";

/**
 * Renders its children on desktop only.
 * @returns A div.
 */
export default function Desktop({ children }: { readonly children?: ReactElement | ReactElement[]; }): ReactElement {
    return useMediaQuery((theme: Theme) => theme.breakpoints.up("md"))
        ? <>{children}</>
        : <></>;
}
