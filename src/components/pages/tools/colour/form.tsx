"use client";

import { Alert, Button, MenuItem, Stack, TextField } from "@mui/material";
import type { MenuProps } from "@mui/material/Menu";
import {
    CSS_NAMED_COLOURS,
    DEFAULT_COLOUR,
    colourToolResultSchema,
    formatColour,
    normaliseColour,
} from "tools/colour-tool";
import type { ChangeEvent, KeyboardEvent, ReactNode } from "react";
import type { ColourToolResult, InputFormat } from "tools/colour-tool";
import { useCallback, useEffect, useState } from "react";
import { Glass } from "components/glass";
import { RestartAlt } from "@mui/icons-material";
import { requestToolApi } from "tools/api";

const SELECT_MENU_PROPS: Partial<MenuProps> = {
    anchorOrigin: { horizontal: "center", vertical: "bottom" },
    disableScrollLock: true,
    slotProps: {
        list: { disablePadding: true },
        paper: { sx: { borderRadius: "1rem" } },
    },
    transformOrigin: { horizontal: "center", vertical: "top" },
};

/**
 * Input controls for choosing a colour and requesting its analysis.
 * @param props - The selected palette colour and result callback.
 * @param props.selectedColour - The currently selected colour from the palette.
 * @param props.onResult - Callback invoked with the analysis result when available.
 * @returns The colour input form.
 */
export function ColourToolForm({ selectedColour, onResult }: Readonly<{
    selectedColour: string | null;
    onResult: (result: ColourToolResult) => void;
}>): ReactNode {
    const [colour, setColour] = useState(DEFAULT_COLOUR);
    const [format, setFormat] = useState<InputFormat>("hex");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const calculate = useCallback(async (input: string, inputFormat: InputFormat): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            const normalised = normaliseColour(input, inputFormat);
            const next = await requestToolApi("/api/tools/colour", { colour: normalised }, colourToolResultSchema);

            onResult(next);
        } catch (caught) {
            setError(caught instanceof Error ? caught.message : "Unable to calculate this colour.");
        } finally {
            setLoading(false);
        }
    }, [onResult]);

    useEffect(() => {
        void calculate(DEFAULT_COLOUR, "hex");
    }, [calculate]);

    useEffect(() => {
        if (selectedColour !== null) {
            setColour(selectedColour);
            setFormat("hex");
            void calculate(selectedColour, "hex");
        }
    }, [selectedColour, calculate]);

    const updateColour = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        setColour(event.target.value);
    }, []);

    const updateFormat = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        const nextFormat = event.target.value as InputFormat;

        if (nextFormat === format)
            return;

        if (nextFormat === "css" && format !== "css") {
            setFormat(nextFormat);
            setColour("");
            setError(null);

            return;
        }

        try {
            const hex = normaliseColour(colour, format);
            const nextColour = nextFormat === "css"
                ? ""
                : formatColour(hex, nextFormat);

            setFormat(nextFormat);
            setColour(nextColour);
            setError(null);

            if (nextFormat !== "css")
                void calculate(nextColour, nextFormat);
        } catch (caught) {
            setFormat(nextFormat);
            setColour("");
            setError(caught instanceof Error ? caught.message : "Enter a valid colour to convert formats.");
        }
    }, [calculate, colour, format]);

    const updatePicker = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value.toUpperCase();

        setColour(value);
        setFormat("hex");
        void calculate(value, "hex");
    }, [calculate]);

    const updateNamedColour = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;

        setColour(value);

        if (value !== "")
            void calculate(value, "css");
    }, [calculate]);

    const resetColour = useCallback((): void => {
        setColour(DEFAULT_COLOUR);
        setFormat("hex");
        void calculate(DEFAULT_COLOUR, "hex");
    }, [calculate]);

    const submit = useCallback((): void => {
        void calculate(colour, format);
    }, [calculate, colour, format]);

    const submitOnEnter = useCallback((event: KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === "Enter")
            submit();
    }, [submit]);

    const placeholder = format === "css" ? "Choose a named colour" : formatColour(DEFAULT_COLOUR, format);

    return (
        <Glass>
            <Stack direction={{ sm: "row", xs: "column" }} spacing={2} sx={{ alignItems: "center" }}>
                <TextField
                    label="Input format"
                    onChange={updateFormat}
                    select
                    slotProps={{ select: { MenuProps: SELECT_MENU_PROPS } }}
                    sx={{ minWidth: 150 }}
                    value={format}
                >
                    <MenuItem value="hex">HEX</MenuItem>
                    <MenuItem value="rgb">RGB</MenuItem>
                    <MenuItem value="hsl">HSL</MenuItem>
                    <MenuItem value="hsv">HSV</MenuItem>
                    <MenuItem value="hwb">HWB</MenuItem>
                    <MenuItem value="cmyk">CMYK</MenuItem>
                    <MenuItem value="css">CSS named colour</MenuItem>
                </TextField>
                {format === "css"
                    ? (
                        <TextField
                            label="CSS named colour"
                            onChange={updateNamedColour}
                            select
                            slotProps={{ select: { MenuProps: SELECT_MENU_PROPS } }}
                            sx={{ minWidth: 300 }}
                            value={colour}
                        >
                            <MenuItem value=""><em>Select a colour</em></MenuItem>
                            {CSS_NAMED_COLOURS.map((name) => (
                                <MenuItem key={name} value={name}>{name}</MenuItem>
                            ))}
                        </TextField>
                    )
                    : (
                        <TextField
                            label="Colour value"
                            onChange={updateColour}
                            onKeyDown={submitOnEnter}
                            placeholder={placeholder[format]}
                            sx={{ minWidth: 300 }}
                            value={colour}
                        />
                    )}
                <input
                    aria-label="Choose colour"
                    disabled={loading}
                    onChange={updatePicker}
                    type="color"
                    value={(/^#[\da-f]{6}$/i).test(colour) ? colour : DEFAULT_COLOUR}
                />
                <Button disabled={loading || colour.trim() === ""} onClick={submit}>Analyse</Button>
                <Button disabled={loading} onClick={resetColour} startIcon={<RestartAlt />}>Reset</Button>
            </Stack>
            {error !== null && <Alert severity="error">{error}</Alert>}
        </Glass>
    );
}
