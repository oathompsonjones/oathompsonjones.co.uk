"use client";

import {
    Button,
    MenuItem,
    Stack,
    TextField,
    Zoom,
} from "@mui/material";
import { type ChangeEvent, type ReactNode, useCallback, useState } from "react";
import { Card } from "components/card";

/**
 * Renders a card for a game.
 * @param props - An object containing the component props.
 * @param props.title - The title (and link) of the game.
 * @param props.disabled - Whether the game is disabled (not implemented yet).
 * @returns An element which renders a game card.
 */
export function Game({ title, disabled = false }: { readonly title: string; readonly disabled?: boolean; }): ReactNode {
    type PlayerCount = 0 | 1 | 2;
    const [playerCount, setPlayerCount] = useState<PlayerCount>(1);

    type Difficulty = "easy" | "hard" | "impossible" | "medium";
    const [difficulty, setDifficulty] = useState<Difficulty>("medium");

    const href = (): string => {
        const page = title.toLowerCase().replace(/\s+/g, "-");

        return `/arcade/${page}?playerCount=${playerCount}&difficulty=${difficulty}`;
    };
    const handlePlayerCountChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        setPlayerCount(parseInt(event.target.value, 10) as PlayerCount);
    }, []);
    const handleDifficultyChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        setDifficulty(event.target.value as Difficulty);
    }, []);

    const controls = disabled
        ? "Coming Soon"
        : (
            <Stack component="form" sx={{ gap: 1, width: "100%" }}>
                <TextField
                    fullWidth
                    label="Player Count"
                    name="playerCount"
                    onChange={handlePlayerCountChange}
                    select
                    value={playerCount}
                >
                    <MenuItem value={0}>0 (CPU vs CPU)</MenuItem>
                    <MenuItem value={1}>1 (User vs CPU)</MenuItem>
                    <MenuItem value={2}>2 (User vs User)</MenuItem>
                </TextField>
                <TextField
                    fullWidth
                    label="Difficulty"
                    name="difficulty"
                    onChange={handleDifficultyChange}
                    select
                    sx={{ display: playerCount === 2 ? "none" : "block" }}
                    value={difficulty}
                >
                    <MenuItem value="easy">Easy</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="hard">Hard</MenuItem>
                    <MenuItem value="impossible">Impossible</MenuItem>
                </TextField>
                <Button href={href()} type="submit">Play</Button>
            </Stack>
        );

    return (
        <Zoom in timeout={500}>
            <Card>
                <Card.Header title={title} />
                <Card.Actions>{controls}</Card.Actions>
            </Card>
        </Zoom>
    );
}
