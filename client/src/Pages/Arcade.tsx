import { Br } from "../Components";
import { Typography } from "@mui/material";

/**
 * This page contains some mini arcade games.
 *
 * @returns {JSX.Element} An arcade page.
 */
export const Arcade = (): JSX.Element => (
    <>
        <Typography variant="h1">Would you like to play a game?</Typography>
        <Typography variant="subtitle1">Upcoming Games</Typography>
        <Typography variant="body1">
            - Noughts and Crosses   <Br />
            - Connect 4             <Br />
            - Battleships           <Br />
            - Snake                 <Br />
            - Space Invaders        <Br />
            - PacMan                <Br />
            - Tetris                <Br />
        </Typography>
        <Typography variant="subtitle1">Upcoming Game Modes</Typography>
        <Typography variant="body1">
            - 2 players (user vs user)  <Br />
            - 1 player (user vs CPU)    <Br />
            - 0 players (CPU vs CPU)    <Br />
        </Typography>
    </>
);
