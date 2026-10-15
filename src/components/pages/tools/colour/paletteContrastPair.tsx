import { Box, Stack, Typography } from "@mui/material";
import { Card } from "components/card";
import type { PaletteContrast as PaletteContrastResult } from "tools/colour/palette";
import type { ReactNode } from "react";

type PaletteContrastPairProps = Readonly<{
    firstName: string;
    secondName: string;
    pair: PaletteContrastResult;
}>;

/**
 * Shows the ratio and WCAG status for one pair of palette colours.
 * @param root0 - The pair and the corresponding colour names.
 * @param root0.firstName - The name of the first colour.
 * @param root0.secondName - The name of the second colour.
 * @param root0.pair - The calculated contrast information.
 * @returns The contrast result card.
 */
export function PaletteContrastPair({ firstName, secondName, pair }: PaletteContrastPairProps): ReactNode {
    return (
        <Card sx={{ height: "100%" }}>
            <Card.Content>
                <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                    <Box
                        sx={{
                            bgcolor: pair.first,
                            border: 1,
                            borderColor: "divider",
                            borderRadius: 1,
                            flexShrink: 0,
                            height: 24,
                            width: 24,
                        }}
                    />
                    <Typography variant="body2">{firstName}</Typography>
                    <Typography color="text.secondary" variant="body2">/</Typography>
                    <Box
                        sx={{
                            bgcolor: pair.second,
                            border: 1,
                            borderColor: "divider",
                            borderRadius: 1,
                            flexShrink: 0,
                            height: 24,
                            width: 24,
                        }}
                    />
                    <Typography variant="body2">{secondName}</Typography>
                </Stack>
                <Typography sx={{ mt: 1 }} variant="body2">{pair.ratio.toFixed(2)}:1</Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                    <Typography color={pair.meetsAA ? "success.main" : "error.main"} variant="caption">
                        AA {pair.meetsAA ? "Pass" : "Fail"}
                    </Typography>
                    <Typography color={pair.meetsAAA ? "success.main" : "error.main"} variant="caption">
                        AAA {pair.meetsAAA ? "Pass" : "Fail"}
                    </Typography>
                </Stack>
            </Card.Content>
        </Card>
    );
}
