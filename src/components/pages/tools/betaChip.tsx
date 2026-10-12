import { Chip } from "@mui/material";
import type { ReactNode } from "react";

/**
 * Marks the Tools area as a work in progress.
 * @returns A small BETA chip.
 */
export function BetaChip(): ReactNode {
    return <Chip color="warning" label="BETA" size="small" sx={{ fontWeight: "bold" }} variant="outlined" />;
}
