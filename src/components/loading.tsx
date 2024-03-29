import { CircularProgress } from "@mui/material";
import type { ReactElement } from "react";

/**
 * Renders a loading spinner.
 * @returns A loading spinner.
 */
export default function Loading(): ReactElement {
    return (
        <div style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            minHeight: "100%",
        }}
        >
            <CircularProgress size="10%" />
        </div>
    );
}
