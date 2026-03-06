"use client";

import {
    Button,
    Card, CardActions, CardContent,
    MenuItem,
    Stack,
    TextField,
    Typography,
    Zoom,
} from "@mui/material";
import { type ReactNode, useState } from "react";
import { useGlass } from "hooks/useGlass";

/**
 * Renders a card for a game.
 * @param props - An object containing the component props.
 * @param props.title - The title (and link) of the game.
 * @param props.disabled - Whether the game is disabled (not implemented yet).
 * @returns An element which renders a game card.
 */
export function Game({ title, disabled = false }: { title: string; disabled?: boolean; }): ReactNode {
    const className = useGlass();

    type PlayerCount = 0 | 1 | 2;
    const [playerCount, setPlayerCount] = useState<PlayerCount>(1);

    type Difficulty = "easy" | "hard" | "impossible" | "medium";
    const [difficulty, setDifficulty] = useState<Difficulty>("medium");

    const href = (): string => {
        const page = title.toLowerCase().replace(/\s+/g, "-");

        return `/arcade/${page}?playerCount=${playerCount}&difficulty=${difficulty}`;
    };

    return (
        <Zoom in timeout={500}>
            <Card className={className}>
                <CardContent>
                    <Typography variant="h6">{title}</Typography>
                </CardContent>
                <CardActions>
                    {disabled
                        ? "Coming Soon"
                        : <Stack component="form" gap={1} width="100%">
                            <TextField
                                label="Player Count"
                                name="playerCount"
                                value={playerCount}
                                onChange={(e) => setPlayerCount(parseInt(e.target.value, 10) as PlayerCount)}
                                select
                            >
                                <MenuItem value={0}>0 (CPU vs CPU)</MenuItem>
                                <MenuItem value={1}>1 (User vs CPU)</MenuItem>
                                <MenuItem value={2}>2 (User vs User)</MenuItem>
                            </TextField>
                            <TextField
                                label="Difficulty"
                                name="difficulty"
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                                select
                            >
                                <MenuItem value="easy">Easy</MenuItem>
                                <MenuItem value="medium">Medium</MenuItem>
                                <MenuItem value="hard">Hard</MenuItem>
                                <MenuItem value="impossible">Impossible</MenuItem>
                            </TextField>
                            <Button type="submit" href={href()}>Play</Button>
                        </Stack>}
                </CardActions>
            </Card>
        </Zoom>
    );
}
