import { useCallback, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import type { PaletteEntry } from "components/pages/tools/colour/paletteColourCard";
import { runColourTool } from "tools/colour/colour-tool";
import type { ColourToolResult } from "tools/colour/colour-tool";
import {
    MAX_PALETTE_COLOURS,
    createPaletteCssVariables,
    generateHarmonyPalette,
    getPaletteContrast,
    normalisePaletteColour,
} from "tools/colour/palette";
import type { HarmonyMode } from "tools/colour/palette";

/**
 * Owns the palette editor state, validation, harmony generation, and CSS export.
 * @returns The palette state and actions used by the palette UI.
 */
export function usePaletteBuilder() {
    const [entries, setEntries] = useState<PaletteEntry[]>([
        { id: 1, name: "Primary", value: "#1C7EEA" },
        { id: 2, name: "Secondary", value: "#7B2CBF" },
        { id: 3, name: "Accent", value: "#E63946" },
    ]);
    const [nextId, setNextId] = useState(4);
    const [harmony, setHarmony] = useState<HarmonyMode>("complementary");
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const results = useMemo<ColourToolResult[]>(() => {
        try {
            return entries.map(({ value }) => runColourTool({ colour: normalisePaletteColour(value) }));
        } catch {
            return [];
        }
    }, [entries]);
    const contrastPairs = useMemo(() => getPaletteContrast(results), [results]);
    const valid = results.length === entries.length && entries.length > 0;

    const updateEntry = useCallback((id: number, field: "name" | "value", value: string): void => {
        setEntries((current) => current.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry)));
        setCopied(false);
        setError(null);
    }, []);

    const addEntry = useCallback((): void => {
        if (entries.length >= MAX_PALETTE_COLOURS) {
            setError(`A palette can contain no more than ${MAX_PALETTE_COLOURS} colours.`);

            return;
        }

        setEntries((current) => [...current, {
            id: nextId,
            name: `Colour ${current.length + 1}`,
            value: "#336699",
        }]);
        setNextId((current) => current + 1);
        setError(null);
    }, [entries.length, nextId]);

    const duplicateEntry = useCallback((entry: PaletteEntry): void => {
        if (entries.length >= MAX_PALETTE_COLOURS) {
            setError(`A palette can contain no more than ${MAX_PALETTE_COLOURS} colours.`);

            return;
        }

        const index = entries.findIndex(({ id }) => id === entry.id);

        setEntries((current) => {
            const next = [...current];

            next.splice(index + 1, 0, { ...entry, id: nextId, name: `${entry.name} copy` });

            return next;
        });
        setNextId((current) => current + 1);
        setError(null);
    }, [entries, nextId]);

    const removeEntry = useCallback((id: number): void => {
        setEntries((current) => current.filter((entry) => entry.id !== id));
        setError(null);
    }, []);

    const moveEntry = useCallback((index: number, direction: 1 | -1): void => {
        setEntries((current) => {
            const destination = index + direction;

            if (destination < 0 || destination >= current.length)
                return current;

            const next = [...current];
            const currentEntry = next[index]!;

            next[index] = next[destination]!;
            next[destination] = currentEntry;

            return next;
        });
    }, []);

    const applyHarmony = useCallback((): void => {
        try {
            const seed = normalisePaletteColour(entries[0]?.value ?? "");
            const colours = generateHarmonyPalette(seed, harmony);

            setEntries(colours.map((value, index) => ({
                id: index < entries.length ? entries[index]!.id : nextId + index - entries.length,
                name: index < entries.length ? entries[index]!.name : `Colour ${index + 1}`,
                value,
            })));
            setNextId((current) => current + Math.max(0, colours.length - entries.length));
            setError(null);
            setCopied(false);
        } catch (caught) {
            setError(caught instanceof Error ? caught.message : "Unable to generate this harmony.");
        }
    }, [entries, harmony, nextId]);

    const copyCss = useCallback(async (): Promise<void> => {
        if (!valid) {
            setError("Correct or remove invalid colour values before exporting.");

            return;
        }

        try {
            await navigator.clipboard.writeText(createPaletteCssVariables(
                results,
                entries.map(({ name }) => name),
            ));
            setCopied(true);
            setError(null);
        } catch {
            setError("Clipboard access failed. You can select and copy the CSS manually.");
        }
    }, [entries, results, valid]);

    const handleHarmonyChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        setHarmony(event.target.value as HarmonyMode);
    }, []);

    const handleCopyCss = useCallback((): void => {
        void copyCss();
    }, [copyCss]);

    const handleGenerateHarmony = useCallback((): void => {
        applyHarmony();
    }, [applyHarmony]);

    return {
        addEntry,
        copied,
        contrastPairs,
        duplicateEntry,
        entries,
        error,
        handleCopyCss,
        handleGenerateHarmony,
        handleHarmonyChange,
        harmony,
        moveEntry,
        removeEntry,
        updateEntry,
        results,
        valid,
    };
}
