import { Container, Typography } from "@mui/material";
import { Br } from "../Components";

/**
 * This page contains some mini arcade games.
 *
 * @returns {JSX.Element} An arcade page.
 */
export const Arcade = (): JSX.Element => (
    <Container>
        <Typography variant="h2">Would you like to play a game?</Typography>
        <Typography variant="h6">Upcoming Games</Typography>
        <Typography variant="body1">
            - Noughts and Crosses   <Br />
            - Connect 4             <Br />
            - Battleships           <Br />
            - Checkers              <Br />
            - Chess                 <Br />
            - Battleships           <Br />
            - Pong                  <Br />
            - Breakout              <Br />
            - Snake                 <Br />
            - Space Invaders        <Br />
            - PacMan                <Br />
            - Tetris                <Br />
            - Solitaire             <Br />
        </Typography>
        <Typography variant="h6">Upcoming Game Modes</Typography>
        <Typography variant="body1">
            - 2 players - user vs user <i>(where appropriate)</i>               <Br />
            - 1 player - user vs CPU <i>(or just user where appropriate)</i>    <Br />
            - 0 players - CPU vs CPU <i>(or just CPU where appropriate)</i>     <Br />
        </Typography>
    </Container>
);
