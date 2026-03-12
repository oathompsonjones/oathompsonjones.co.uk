"use client";

import { Button, Typography } from "@mui/material";
import type { MouseEvent, ReactNode } from "react";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import type { Connect4Board } from "@oathompsonjones/mini-games";
import { Connect4Controller } from "@oathompsonjones/mini-games";
import { Connect4Counter } from "components/pages/arcade/connect4Counter";
import { Grid } from "components/pages/arcade/grid";

/**
 * Renders a game of Connect 4.
 * @returns A React component representing the Connect 4 game.
 */
export default function Connect4Game(): ReactNode {
    const gameRef = useRef<Connect4Controller | null>(null);
    const boardRef = useRef<Connect4Board | null>(null);
    const hasInitializedRef = useRef(false);
    const [, forceUpdate] = useReducer((x: number) => x + 1, 0);
    const [statusText, setStatusText] = useState("");

    const startGame = useCallback((): void => {
        // Get settings from query parameters
        const searchParams = new URLSearchParams(window.location.search);
        const playerCount = parseInt(searchParams.get("playerCount") ?? "1", 10) as 0 | 1 | 2;
        const difficulty = (searchParams.get("difficulty") ?? "medium") as "easy" | "hard" | "impossible" | "medium";

        setStatusText("");
        boardRef.current = null;

        gameRef.current = new Connect4Controller(
            playerCount > 0 ? "human" : `${difficulty}CPU`,
            playerCount < 2 ? `${difficulty}CPU` : "human",
            {
                onEnd: (winner): void => {
                    if (winner === null)
                        setStatusText("Game over! It's a draw!");
                    else if (playerCount === 1)
                        setStatusText(`Game over! ${winner === 0 ? "You win!" : "You lose!"}`);
                    else
                        setStatusText(`Game over! The winner is player ${winner + 1}`);
                },
                renderer: async (controller): Promise<void> => {
                    boardRef.current = controller.board;
                    forceUpdate();

                    /* This is needed to ensure that the UI updates before the CPU makes its move, otherwise the
                    rerender will only happen after the CPU has made its move. */
                    return new Promise((resolve) => {
                        requestAnimationFrame(() => requestAnimationFrame(() => {
                            resolve();
                        }));
                    });
                },
            },
        );

        forceUpdate();
        void gameRef.current.play();
    }, []);

    useEffect(() => {
        if (hasInitializedRef.current)
            return;

        hasInitializedRef.current = true;
        startGame();
    }, [startGame]);

    const onClick = (event: MouseEvent<HTMLDivElement>): void => {
        if (boardRef.current?.winner === false) {
            const id = event.currentTarget.id.split("-").map(Number);

            gameRef.current?.emit("input", { x: id[0], y: 0 });
        }
    };

    const renderCell = (x: number, y: number): ReactNode => {
        if (!boardRef.current)
            return "";

        const cellValue = boardRef.current.cellOccupier({ x, y }) ?? -1;

        return [<Connect4Counter red />, <Connect4Counter yellow />][cellValue] ?? "";
    };

    return (
        <div>
            <Typography variant="h2" align="center">Connect 4</Typography>
            <Grid height={6} width={7} onClick={onClick} renderCell={renderCell} closed />
            {statusText !== "" && <Typography variant="h3" align="center" color="text.secondary">
                {statusText} <Button onClick={startGame}>Play Again</Button>
            </Typography>}
        </div>
    );
}
