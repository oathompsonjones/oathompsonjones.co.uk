import { ReactNode } from "react";

export const colours = {
    black: "#121212",
    cream: "#c6bdac",
    grey: "#676767",
    maroon: "#7d2b32",
} as const;

/**
 * Generates a tartan pattern SVG string.
 * @param tartan - The tartan pattern to render.
 * @returns The SVG string.
 */
function generateTartanSvg(tartan: Array<{ fill: string; size: number; }>): string {
    const cumulativeSizes = tartan.map((el) => el.size).reduce<number[]>((r, a) => {
        if (r.length > 0)
        // eslint-disable-next-line no-param-reassign
            a += r[r.length - 1]!;

        r.push(a);

        return r;
    }, []);
    const size = cumulativeSizes[cumulativeSizes.length - 1];

    const horizontalRects = tartan
        .map((e, index) => {
            const y = cumulativeSizes[index - 1] ?? 0;

            return `<rect fill="${e.fill}" width="100%" height="${e.size}" x="0" y="${y}" />`;
        })
        .join("\n");

    const verticalRects = tartan
        .map((e, index) => {
            const x = cumulativeSizes[index - 1] ?? 0;

            return `<rect fill="${e.fill}" width="${e.size}" height="100%" x="${x}" y="0" />`;
        })
        .join("\n");

    return `<svg
            viewBox="0 0 ${size} ${size}"
            width="${size}"
            height="${size}"
            x="0"
            y="0"
            xmlns="http://www.w3.org/2000/svg"
        >
        <defs>
            <pattern id="diagonalStripes" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                <polygon points="0,4 0,8 8,0 4,0" fill="#ffffff" />
                <polygon points="4,8 8,8 8,4" fill="#ffffff" />
            </pattern>
            <mask id="grating" x="0" y="0" width="1" height="1">
                <rect x="0" y="0" width="100%" height="100%" fill="url(#diagonalStripes)" />
            </mask>
        </defs>
        <g id="horizontalStripes">${horizontalRects}</g>
        <g id="verticalStripes" mask="url(#grating)">${verticalRects}</g>
    </svg>`;
}

/**
 * A tartan pattern background.
 * @param options - The options for the background.
 * @param options.theme - The theme to use for the background. If not provided, the theme from context will be used.
 * @param options.position - The position to use for the background. If not provided, "fixed" will be used.
 * @returns The tartan pattern background.
 */
export const Tartan = (): ReactNode => (
    <div style={{
        height: "100vh",
        left: 0,
        position: "fixed",
        top: 0,
        width: "100vw",
        zIndex: -1000,
        backgroundImage: `url("data:image/svg+xml;base64,${Buffer.from(generateTartanSvg([
            { fill: "#121212", size: 40 },
            { fill: "#c6bdac", size: 35 },
            { fill: "#121212", size: 20 },
            { fill: "#676767", size: 50 },
            { fill: "#7d2b32", size: 10 },
            { fill: "#676767", size: 50 },
            { fill: "#121212", size: 20 },
            { fill: "#c6bdac", size: 35 },
            { fill: "#121212", size: 40 },
            { fill: "#7d2b32", size: 10 },
        ])).toString("base64")}")`,
        filter: "blur(1px) brightness(0.3)",
    }}/>
);
