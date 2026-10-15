import { Box, Stack, Typography } from "@mui/material";
import { Card } from "components/card";
import type { ReactNode } from "react";
import type { PaletteContrast as PaletteContrastResult } from "tools/colour/palette";

type PaletteContrastPairProps = Readonly<{
    firstName: string;
    secondName: string;
    pair: PaletteContrastResult;
}>;

/**
 * Shows the ratio and WCAG status for one pair of palette colours.
 * @param props - The pair and the corresponding colour names.
 * @returns The contrast result card.
 */
export function PaletteContrastPair(props: PaletteContrastPairProps): ReactNode {
    return (
        <Card sx={{ height: "100%" }}>
            <Card.Content>
                <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                    <Box sx={{
                        bgcolor: props.pair.first,
                        border: 1,
                        borderColor: "divider",
                        borderRadius: 1,
                        flexShrink: 0,
                        height: 24,
                        width: 24,
                    }} />
                    <Typography variant="body2">{props.firstName}</Typography>
                    <Typography color="text.secondary" variant="body2">/</Typography>
                    <Box sx={{
                        bgcolor: props.pair.second,
                        border: 1,
                        borderColor: "divider",
                        borderRadius: 1,
                        flexShrink: 0,
                        height: 24,
                        width: 24,
                    }} />
                    <Typography variant="body2">{props.secondName}</Typography>
                </Stack>
                <Typography sx={{ mt: 1 }} variant="body2">{props.pair.ratio.toFixed(2)}:1</Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                    <Typography color={props.pair.meetsAA ? "success.main" : "error.main"} variant="caption">
                        AA {props.pair.meetsAA ? "Pass" : "Fail"}
                    </Typography>
                    <Typography color={props.pair.meetsAAA ? "success.main" : "error.main"} variant="caption">
                        AAA {props.pair.meetsAAA ? "Pass" : "Fail"}
                    </Typography>
                </Stack>
            </Card.Content>
        </Card>
    );
}
