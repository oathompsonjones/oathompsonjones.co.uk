import type { ReactNode } from "react";

/**
 * Renders a counter for tic tac toe.
 * @param props - The props for the counter.
 * @param props.O - Whether the counter is an O.
 * @param props.X - Whether the counter is an X.
 * @returns A React component representing a tic tac toe counter.
 */
export function TicTacToeCounter({ O, X }: { O: true; X?: never; } | { O?: never; X: true; }): ReactNode {
    return (
        <svg viewBox="0 0 100 100" width="1em" height="1em">
            {O && <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="10" fill="none" />}
            {X && <line x1="10" y1="10" x2="90" y2="90" stroke="currentColor" strokeWidth="10" />}
            {X && <line x1="90" y1="10" x2="10" y2="90" stroke="currentColor" strokeWidth="10" />}
        </svg>
    );
}
