"use client";

import { Button, Typography } from "@mui/material";
import type { MouseEvent, ReactNode } from "react";
import { useEffect, useReducer, useRef, useState } from "react";
import { Grid } from "components/pages/arcade/grid";
import type { TicTacToeBoard } from "@oathompsonjones/mini-games";
import { TicTacToeController } from "@oathompsonjones/mini-games";
import { TicTacToeCounter } from "components/pages/arcade/tictactoeCounter";

/**
 * Renders a game of Tic Tac Toe.
 * @returns A React component representing the Tic Tac Toe game.
 */
export default function TicTacToeGame(): ReactNode {
    const gameRef = useRef<TicTacToeController | null>(null);
    const boardRef = useRef<TicTacToeBoard | null>(null);
    const [, forceUpdate] = useReducer((x: number) => x + 1, 0);
    const [statusText, setStatusText] = useState("");

    useEffect(() => {
        // Get settings from query parameters
        const searchParams = new URLSearchParams(window.location.search);
        const playerCount = parseInt(searchParams.get("playerCount") ?? "1", 10) as 0 | 1 | 2;
        const difficulty = (searchParams.get("difficulty") ?? "medium") as "easy" | "hard" | "impossible" | "medium";

        if (gameRef.current === null) {
            gameRef.current = new TicTacToeController(
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
        }

        void gameRef.current.play();
    }, []);

    const onClick = (event: MouseEvent<HTMLDivElement>): void => {
        if (boardRef.current?.winner === false) {
            const id = event.currentTarget.id.split("-").map(Number);

            gameRef.current?.emit("input", { x: id[0], y: id[1] });
        }
    };

    const renderCell = (x: number, y: number): ReactNode => {
        if (!boardRef.current)
            return "";

        const cellValue = boardRef.current.cellOccupier({ x, y }) ?? -1;

        return [<TicTacToeCounter X />, <TicTacToeCounter O />][cellValue] ?? "";
    };

    return (
        <div>
            <Typography variant="h2" align="center">Tic Tac Toe</Typography>
            <Grid height={3} width={3} onClick={onClick} renderCell={renderCell} />
            {statusText !== "" && <Typography variant="h3" align="center" color="secondary">
                {statusText} <Button onClick={() => window.location.reload()}>Play Again</Button>
            </Typography>}
        </div>
    );
}
