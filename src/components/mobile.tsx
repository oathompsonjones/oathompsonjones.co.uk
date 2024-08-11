import { Theme, useMediaQuery } from "@mui/material";
import type { ReactElement } from "react";

/**
 * Renders its children on mobile only.
 * @returns A div.
 */
export default function Mobile({ children }: { readonly children?: ReactElement | ReactElement[]; }): ReactElement {
    return useMediaQuery((theme: Theme) => theme.breakpoints.down("md"))
        ? <>{children}</>
        : <></>;
}
