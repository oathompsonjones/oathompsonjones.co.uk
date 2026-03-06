import { Game } from "components/pages/arcade/game";
import { Masonry } from "@mui/lab";
import type { ReactNode } from "react";
import { Typography } from "@mui/material";

/**
 * This page contains some mini arcade games.
 * @returns An arcade page.
 */
export default function Arcade(): ReactNode {
    return (
        <div>
            <Typography variant="h2" align="center" gutterBottom>Would you like to play a game?</Typography>
            <Masonry columns={/* { lg: 4, md: 3, sm: 2, xl: 5, xs: 1 } */ 2}>
                <Game title="Tic Tac Toe" />
                <Game title="Connect 4" />
                {/* <Game title="Battleships" disabled /> */}
                {/* <Game title="Checkers" disabled /> */}
                {/* <Game title="Chess" disabled /> */}
                {/* <Game title="Pong" disabled /> */}
                {/* <Game title="Breakout" disabled /> */}
                {/* <Game title="Snake" disabled /> */}
                {/* <Game title="Space Invaders" disabled /> */}
                {/* <Game title="PacMan" disabled /> */}
                {/* <Game title="Tetris" disabled /> */}
                {/* <Game title="Solitaire" disabled /> */}
            </Masonry>
        </div>
    );
}
