import type { MouseEvent, ReactNode } from "react";
import { Glass } from "components/glass";

/**
 * Renders a grid.
 * @param props - The props for the grid.
 * @param props.height - The height of the grid (number of rows).
 * @param props.width - The width of the grid (number of columns).
 * @param props.onClick - The function to call when the grid is clicked.
 * @param props.renderCell - The function to render a cell, given its x and y coordinates.
 * @returns A React component representing a grid.
 */
export function Grid({ height, width, onClick, renderCell }: {
    height: number;
    width: number;
    onClick: (event: MouseEvent<HTMLDivElement>) => void;
    renderCell: (x: number, y: number) => ReactNode;
}): ReactNode {
    const pxHeight = 750;

    return (
        <Glass sx={{
            display: "grid",
            gridTemplate: `repeat(${height}, 1fr) / repeat(${width}, 1fr)`,
            height: `${pxHeight}px`,
            margin: "0 auto",
            width: `${pxHeight * width / height}px`,
        }}>
            {Array(height * width).fill(null).map((_, i) => (
                <div
                    key={i}
                    id={`${i % width}-${Math.floor(i / width)}`}
                    onClick={onClick}
                    style={{
                        alignItems: "center",
                        borderLeft: i % width === 0 ? undefined : "1px solid white",
                        borderTop: i >= width ? "1px solid white" : undefined,
                        cursor: "pointer",
                        display: "flex",
                        fontSize: "4em",
                        gridColumn: "auto",
                        gridRow: "auto",
                        justifyContent: "center",
                    }}>
                    {renderCell(i % width, Math.floor(i / width))}
                </div>
            ))}
        </Glass>
    );
}
