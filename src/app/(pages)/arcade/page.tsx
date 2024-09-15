import type { ReactNode } from "react";
import { Typography } from "@mui/material";

/**
 * This page contains some mini arcade games.
 * @returns An arcade page.
 */
export default function Arcade(): ReactNode {
    return (
        <>
            <Typography variant="h2">Would you like to play a game?</Typography>
            <div>
                <Typography variant="h6">Upcoming Games</Typography>
                <Typography variant="body1" component="ul">
                    <li>Noughts and Crosses</li>
                    <li>Connect 4</li>
                    <li>Battleships</li>
                    <li>Checkers</li>
                    <li>Chess</li>
                    <li>Pong</li>
                    <li>Breakout</li>
                    <li>Snake</li>
                    <li>Space Invaders</li>
                    <li>PacMan</li>
                    <li>Tetris</li>
                    <li>Solitaire</li>
                </Typography>
            </div>
            <div>
                <Typography variant="h6">Upcoming Game Modes</Typography>
                <Typography variant="body1" component="ul">
                    <li>2 players - user vs user <i>(where appropriate)</i></li>
                    <li>1 player - user vs CPU <i>(or just user where appropriate)</i></li>
                    <li>0 players - CPU vs CPU <i>(or just CPU where appropriate)</i></li>
                </Typography>
            </div>
        </>
    );
}
