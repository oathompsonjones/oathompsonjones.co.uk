import type { MouseEvent, ReactNode } from "react";
import { Glass } from "components/glass";

/**
 * Renders a grid.
 * @param props - The props for the grid.
 * @param props.height - The height of the grid (number of rows).
 * @param props.width - The width of the grid (number of columns).
 * @param props.closed - Whether the grid is closed (not interactive).
 * @param props.onClick - The function to call when the grid is clicked.
 * @param props.renderCell - The function to render a cell, given its x and y coordinates.
 * @returns A React component representing a grid.
 */
export function Grid({ height, width, closed = false, onClick, renderCell }: {
    height: number;
    width: number;
    closed?: boolean;
    onClick: (event: MouseEvent<HTMLDivElement>) => void;
    renderCell: (x: number, y: number) => ReactNode;
}): ReactNode {
    return (
        <div style={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
            <Glass sx={{
                aspectRatio: `${width} / ${height}`,
                display: "grid",
                flex: 1,
                gridTemplate: `repeat(${height}, 1fr) / repeat(${width}, 1fr)`,
                maxHeight: "750px",
                maxWidth: "min(750px, 100% - 2rem)",
            }}>
                {Array(height * width).fill(null).map((_, i) => (
                    <div
                        key={i}
                        id={`${i % width}-${Math.floor(i / width)}`}
                        onClick={onClick}
                        style={{
                            alignItems: "center",
                            borderBottom: closed && i > width * (height - 1) - 1 ? "1px solid white" : undefined,
                            borderBottomLeftRadius: i === width * (height - 1) ? "1rem" : undefined,
                            borderBottomRightRadius: i === width * height - 1 ? "1rem" : undefined,
                            borderLeft: closed || i % width !== 0 ? "1px solid white" : undefined,
                            borderRight: closed && i % width === width - 1 ? "1px solid white" : undefined,
                            borderTop: closed || i >= width ? "1px solid white" : undefined,
                            borderTopLeftRadius: i === 0 ? "1rem" : undefined,
                            borderTopRightRadius: i === width - 1 ? "1rem" : undefined,
                            cursor: "pointer",
                            display: "flex",
                            gridColumn: "auto",
                            gridRow: "auto",
                            justifyContent: "center",
                        }}>
                        {renderCell(i % width, Math.floor(i / width))}
                    </div>
                ))}
            </Glass>
        </div>
    );
}
