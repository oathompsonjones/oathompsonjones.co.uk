
import type { Sketch } from "@p5-wrapper/react";
import type { Theme } from "@mui/material";
import { hexToRgb } from "../background";
import type p5 from "p5";

/**
 * A Game of Life background.
 * @param theme - The theme to use.
 * @returns A sketch.
 */
export function gameOfLife(theme: Theme): Sketch {
    const bgColour = hexToRgb(theme.palette.background.default);
    const mainColour = hexToRgb(theme.palette.primary.main);

    return function sketch(p5: p5) {
        class Game {
            public hasLooped = false;

            private readonly cellSize = 20;

            private readonly gridSize = p5.createVector(
                Math.floor(p5.width / this.cellSize),
                Math.floor(p5.height / this.cellSize),
            );

            private cells = Array.from(
                { length: this.gridSize.x },
                () => Array.from({ length: this.gridSize.y }, () => 0),
            );

            private readonly frames: string[] = [];

            public constructor(percentage: number = 25) {
                for (let j = 0; j < this.gridSize.y; j++) {
                    for (let i = 0; i < this.gridSize.x; i++)
                        this.cells[i]![j] = p5.random(100) <= percentage ? 1 : 0;
                }
            }

            public render(): void {
                for (let j = 0; j < this.gridSize.y; j++) {
                    for (let i = 0; i < this.gridSize.x; i++) {
                        if (this.cells[i]![j] === 1)
                            p5.square(i * p5.width / this.gridSize.x, j * p5.height / this.gridSize.y, this.cellSize);
                    }
                }
            }

            public update(): void {
                const nextCells = Array.from(
                    { length: this.gridSize.x },
                    () => Array.from({ length: this.gridSize.y }, () => 0),
                );

                for (let j = 0; j < this.gridSize.y; j++) {
                    for (let i = 0; i < this.gridSize.x; i++) {
                        const livingNeighbours = this.getLivingNeighbours(i, j);

                        nextCells[i]![j] = this.cells[i]![j] === 1 && livingNeighbours === 2 || livingNeighbours === 3
                            ? 1
                            : 0;
                    }
                }

                this.cells = nextCells;
                this.hasLooped = this.frames.includes(this.compressFrame(this.cells));
                this.saveFrame(this.cells);
            }

            private getLivingNeighbours(x: number, y: number): number {
                let livingNeighbours = 0;

                for (let i = -1; i < 2; i++) {
                    for (let j = -1; j < 2; j++) {
                        const col = (x + i + this.gridSize.x) % this.gridSize.x;
                        const row = (y + j + this.gridSize.y) % this.gridSize.y;

                        if (x !== col || y !== row)
                            livingNeighbours += this.cells[col]![row]!;
                    }
                }

                return livingNeighbours;
            }

            private compressFrame(frame: number[][]): string {
                let binary = "";

                for (let j = 0; j < this.gridSize.y; j++) {
                    for (let i = 0; i < this.gridSize.x; i++)
                        binary += frame[i]![j]!;
                }
                const counter: number[] = [];
                let lastChar = "0";
                let currentCount = 0;

                for (const thisChar of binary) {
                    if (thisChar === lastChar) {
                        currentCount++;
                    } else {
                        counter.push(currentCount);
                        currentCount = 1;
                    }

                    lastChar = thisChar;
                }

                return counter.map((i) => i.toString()).join("-");
            }

            private saveFrame(frame: number[][]): void {
                this.frames.push(this.compressFrame(frame));
            }
        }

        let game: Game;

        p5.setup = (): void => {
            p5.createCanvas(window.innerWidth, window.innerHeight);
            p5.fullscreen();
            p5.noCursor();
            p5.background(...bgColour);
            p5.fill(...mainColour, 25);
            p5.stroke(...mainColour);
            p5.frameRate(1);
            game = new Game();
        };

        p5.draw = (): void => {
            if (game.hasLooped)
                game = new Game();

            p5.background(...bgColour);
            game.render();
            game.update();
        };
    };
}
