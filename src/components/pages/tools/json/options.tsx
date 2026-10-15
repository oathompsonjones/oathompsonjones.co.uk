"use client";

import type { ChangeEvent, ReactNode } from "react";
import { MenuItem, Stack, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import type { SelectProps } from "@mui/material/Select";
import { ToolSection } from "components/pages/tools/toolSection";

type Operation = "convert" | "format" | "validate";

type FormatMode = "minify" | "pretty";

type ConversionTarget = "csv" | "json" | "schema" | "typescript" | "xml" | "yaml";

type SelectMenu = "format" | "indent" | "operation" | "sort" | "target";

type JsonToolkitOptionsProps = {
    readonly indent: "2" | "4";
    readonly mode: FormatMode;
    readonly onIndentChange: (value: "2" | "4") => void;
    readonly onModeChange: (value: FormatMode) => void;
    readonly onOperationChange: (value: Operation) => void;
    readonly onSortKeysChange: (value: boolean) => void;
    readonly onTargetChange: (value: ConversionTarget) => void;
    readonly operation: Operation;
    readonly sortKeys: boolean;
    readonly target: ConversionTarget;
};

/**
 * Provides operation, conversion, and formatting options.
 * @param props - Current selections and change callbacks.
 * @param props.indent - The selected indentation width.
 * @param props.mode - The selected JSON output mode.
 * @param props.onIndentChange - Updates indentation width.
 * @param props.onModeChange - Updates the JSON output mode.
 * @param props.onOperationChange - Updates the requested operation.
 * @param props.onSortKeysChange - Updates whether object keys are sorted.
 * @param props.onTargetChange - Updates the conversion target.
 * @param props.operation - The requested operation.
 * @param props.sortKeys - Whether object keys are sorted.
 * @param props.target - The conversion target.
 * @returns The options section.
 */
export function JsonToolkitOptions({
    indent,
    mode,
    onIndentChange,
    onModeChange,
    onOperationChange,
    onSortKeysChange,
    onTargetChange,
    operation,
    sortKeys,
    target,
}: JsonToolkitOptionsProps): ReactNode {
    const [openMenu, setOpenMenu] = useState<SelectMenu | null>(null);
    const closeMenuOnScroll = useCallback((): void => {
        if (document.activeElement?.closest("[role='listbox']"))
            document.querySelector<HTMLElement>("[role='combobox'][aria-expanded='true']")?.focus();

        setOpenMenu(null);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", closeMenuOnScroll, { passive: true });

        return (): void => {
            window.removeEventListener("scroll", closeMenuOnScroll);
        };
    }, [closeMenuOnScroll]);

    const selectMenuProps = (menu: SelectMenu): Pick<
        SelectProps,
        "onClose" | "onOpen" | "open"
    > => ({
        onClose: (): void => setOpenMenu(null),
        onOpen: (): void => setOpenMenu(menu),
        open: openMenu === menu,
    });

    const handleFormatChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        onModeChange(event.target.value === "minify" ? "minify" : "pretty");
    }, [onModeChange]);

    const handleTargetChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        const selectedTarget = event.target.value;

        if (selectedTarget === "json" || selectedTarget === "typescript" || selectedTarget === "xml" ||
            selectedTarget === "yaml" || selectedTarget === "csv" || selectedTarget === "schema")
            onTargetChange(selectedTarget);
    }, [onTargetChange]);

    const handleIndentChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        onIndentChange(event.target.value === "4" ? "4" : "2");
    }, [onIndentChange]);

    const handleSortChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        onSortKeysChange(event.target.value === "true");
    }, [onSortKeysChange]);

    const handleOperationChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        const selectedOperation = event.target.value;

        if (selectedOperation === "format" || selectedOperation === "validate" || selectedOperation === "convert")
            onOperationChange(selectedOperation);
    }, [onOperationChange]);

    return (
        <ToolSection glass={false} title="Operation">
            <Stack
                direction={{ md: "row", xs: "column" }}
                spacing={2}
                sx={{
                    // eslint-disable-next-line @typescript-eslint/naming-convention -- CSS selector.
                    "& > .MuiTextField-root": { flex: { md: "1 1 0", xs: "none" }, minWidth: 0 },
                    flexWrap: { md: "nowrap", xs: "wrap" },
                }}
            >
                <TextField
                    label="Operation"
                    onChange={handleOperationChange}
                    select
                    slotProps={{ select: selectMenuProps("operation") }}
                    value={operation}
                >
                    <MenuItem value="format">Format JSON</MenuItem>
                    <MenuItem value="validate">Validate JSON</MenuItem>
                    <MenuItem value="convert">Convert JSON</MenuItem>
                </TextField>
                {operation !== "validate" && operation === "format" && (
                    <TextField
                        label="JSON output"
                        onChange={handleFormatChange}
                        select
                        slotProps={{ select: selectMenuProps("format") }}
                        value={mode}
                    >
                        <MenuItem value="pretty">Pretty JSON</MenuItem>
                        <MenuItem value="minify">Minified JSON</MenuItem>
                    </TextField>
                )}
                {operation === "convert" && (
                    <TextField
                        label="Convert to"
                        onChange={handleTargetChange}
                        select
                        slotProps={{ select: selectMenuProps("target") }}
                        value={target}
                    >
                        <MenuItem value="json">JSON</MenuItem>
                        <MenuItem value="typescript">TypeScript types</MenuItem>
                        <MenuItem value="xml">XML</MenuItem>
                        <MenuItem value="yaml">YAML</MenuItem>
                        <MenuItem value="csv">CSV</MenuItem>
                        <MenuItem value="schema">JSON Schema</MenuItem>
                    </TextField>
                )}
                {operation !== "validate" && (
                    <TextField
                        label="Indentation"
                        onChange={handleIndentChange}
                        select
                        slotProps={{ select: selectMenuProps("indent") }}
                        value={indent}
                    >
                        <MenuItem value="2">2 spaces</MenuItem>
                        <MenuItem value="4">4 spaces</MenuItem>
                    </TextField>
                )}
                <TextField
                    label="Sort object keys"
                    onChange={handleSortChange}
                    select
                    slotProps={{ select: selectMenuProps("sort") }}
                    value={String(sortKeys)}
                >
                    <MenuItem value="false">Keep input order</MenuItem>
                    <MenuItem value="true">Sort alphabetically</MenuItem>
                </TextField>
            </Stack>
        </ToolSection>
    );
}
