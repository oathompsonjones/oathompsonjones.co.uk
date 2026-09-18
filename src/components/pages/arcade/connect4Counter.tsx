import type { ReactNode } from "react";

/**
 * Renders a counter for connect 4.
 * @param props - The props for the counter.
 * @param props.red - Whether the counter is red.
 * @param props.yellow - Whether the counter is yellow.
 * @returns A React component representing a connect 4 counter.
 */
export function Connect4Counter({ red, yellow }: {
    red: true;
    yellow?: never;
} | {
    red?: never;
    yellow: true;
}): ReactNode {
    return (
        <svg height="90%" viewBox="0 0 100 100" width="90%">
            {red ? <circle cx="50" cy="50" fill="red" r="45" /> : null}
            {yellow ? <circle cx="50" cy="50" fill="yellow" r="45" /> : null}
        </svg>
    );
}
