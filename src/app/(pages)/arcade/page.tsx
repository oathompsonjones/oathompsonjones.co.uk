import type { ReactElement } from "react";
import { Typography } from "@mui/material";

/**
 * This page contains some mini arcade games.
 *
 * @returns An arcade page.
 */
export default function Arcade(): ReactElement {
    return (
        <>
            <Typography variant="h2">Would you like to play a game?</Typography>
            <Typography variant="h6">Upcoming Games</Typography>
            <Typography variant="body1">
                - Noughts and Crosses   <br />
                - Connect 4             <br />
                - Battleships           <br />
                - Checkers              <br />
                - Chess                 <br />
                - Pong                  <br />
                - Breakout              <br />
                - Snake                 <br />
                - Space Invaders        <br />
                - PacMan                <br />
                - Tetris                <br />
                - Solitaire             <br />
            </Typography>
            <Typography variant="h6">Upcoming Game Modes</Typography>
            <Typography variant="body1">
                - 2 players - user vs user <i>(where appropriate)</i>               <br />
                - 1 player - user vs CPU <i>(or just user where appropriate)</i>    <br />
                - 0 players - CPU vs CPU <i>(or just CPU where appropriate)</i>     <br />
            </Typography>
        </>
    );
}
