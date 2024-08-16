import type { ReactElement } from "react";
import type { Theme } from "@mui/material";
import { useMediaQuery } from "@mui/material";

/**
 * Renders its children on mobile only.
 * @returns A div.
 */
export default function Mobile({ children }: { readonly children?: ReactElement | ReactElement[]; }): ReactElement {
    return useMediaQuery((theme: Theme) => theme.breakpoints.down("md"))
        ? <>{children}</>
        : <></>;
}
