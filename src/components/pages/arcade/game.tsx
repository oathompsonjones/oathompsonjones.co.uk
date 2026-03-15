"use client";

import {
    Button,
    MenuItem,
    Stack,
    TextField,
    Zoom,
} from "@mui/material";
import { Card } from "components/card";
import type { ReactNode } from "react";
import { useState } from "react";

/**
 * Renders a card for a game.
 * @param props - An object containing the component props.
 * @param props.title - The title (and link) of the game.
 * @param props.disabled - Whether the game is disabled (not implemented yet).
 * @returns An element which renders a game card.
 */
export function Game({ title, disabled = false }: { title: string; disabled?: boolean; }): ReactNode {
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
            <Card>
                <Card.Header title={title} />
                <Card.Actions>
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
                                sx={{ display: playerCount === 2 ? "none" : "block" }}
                            >
                                <MenuItem value="easy">Easy</MenuItem>
                                <MenuItem value="medium">Medium</MenuItem>
                                <MenuItem value="hard">Hard</MenuItem>
                                <MenuItem value="impossible">Impossible</MenuItem>
                            </TextField>
                            <Button type="submit" href={href()}>Play</Button>
                        </Stack>}
                </Card.Actions>
            </Card>
        </Zoom>
    );
}
