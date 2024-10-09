// TODO: Add linear interpolation to the vertices.

/* eslint-disable jsdoc/convert-to-jsdoc-comments */
import type { Sketch } from "@p5-wrapper/react";
import type { Theme } from "@mui/material";
import { hexToRgb } from "../background";
import type p5 from "p5";

/**
 * A metaballs background.
 * @param theme - The theme to use.
 * @returns A sketch.
 */
export function metaballs(theme: Theme): Sketch {
    const bgColour = hexToRgb(theme.palette.background.default);
    const mainColour = hexToRgb(theme.palette.primary.main);

    return function sketch(p5: p5) {
        class Metaball {
            public readonly angle = p5.random(2 * p5.PI);

            public readonly radius = p5.random(p5.width / 100, p5.width / 25);

            public position = p5.createVector(
                p5.random(p5.width),
                p5.random(p5.height),
            );

            public velocity = p5.createVector(
                this.radius / 25 * Math.cos(this.angle),
                this.radius / 25 * Math.sin(this.angle),
            );

            public update(): void {
                this.position.x += this.velocity.x;
                this.position.y += this.velocity.y;

                if (this.position.x > p5.width || this.position.x < 0)
                    this.velocity.x *= -1;

                if (this.position.y > p5.height || this.position.y < 0)
                    this.velocity.y *= -1;
            }

            public show(): void {
                p5.ellipse(this.position.x, this.position.y, this.radius * 2);
            }
        }

        const ballCount = 10;
        const balls: Metaball[] = [];
        let gridSize: number;
        const lines = [
            // None
            (x: number, y: number): void => {
                void [x, y];
            },
            // Top Right
            (x: number, y: number): void => {
                p5.line(x + gridSize / 2, y, x + gridSize, y + gridSize / 2);
            },
            // Bottom Right
            (x: number, y: number): void => {
                p5.line(x + gridSize / 2, y + gridSize, x + gridSize, y + gridSize / 2);
            },
            // Vertical
            (x: number, y: number): void => {
                p5.line(x + gridSize / 2, y, x + gridSize / 2, y + gridSize);
            },
            // Bottom Left
            (x: number, y: number): void => {
                p5.line(x, y + gridSize / 2, x + gridSize / 2, y + gridSize);
            },
            // Top Right & Bottom Left
            (x: number, y: number): void => {
                p5.line(x + gridSize / 2, y, x + gridSize, y + gridSize / 2);
                p5.line(x, y + gridSize / 2, x + gridSize / 2, y + gridSize);
            },
            // Horizontal
            (x: number, y: number): void => {
                p5.line(x, y + gridSize / 2, x + gridSize, y + gridSize / 2);
            },
            // Top Left
            (x: number, y: number): void => {
                p5.line(x, y + gridSize / 2, x + gridSize / 2, y);
            },
            // Top Left
            (x: number, y: number): void => {
                p5.line(x, y + gridSize / 2, x + gridSize / 2, y);
            },
            // Horizontal
            (x: number, y: number): void => {
                p5.line(x, y + gridSize / 2, x + gridSize, y + gridSize / 2);
            },
            // Top Left & Bottom Right
            (x: number, y: number): void => {
                p5.line(x, y + gridSize / 2, x + gridSize / 2, y);
                p5.line(x + gridSize / 2, y + gridSize, x + gridSize, y + gridSize / 2);
            },
            // Bottom Left
            (x: number, y: number): void => {
                p5.line(x, y + gridSize / 2, x + gridSize / 2, y + gridSize);
            },
            // Vertical
            (x: number, y: number): void => {
                p5.line(x + gridSize / 2, y, x + gridSize / 2, y + gridSize);
            },
            // Bottom Right
            (x: number, y: number): void => {
                p5.line(x + gridSize / 2, y + gridSize, x + gridSize, y + gridSize / 2);
            },
            // Top Right
            (x: number, y: number): void => {
                p5.line(x + gridSize / 2, y, x + gridSize, y + gridSize / 2);
            },
            // None
            (x: number, y: number): void => {
                void [x, y];
            },
        ];

        p5.setup = (): void => {
            p5.createCanvas(window.innerWidth, window.innerHeight);
            p5.fullscreen();
            p5.stroke(mainColour);
            p5.strokeWeight(3);
            p5.noFill();

            for (let i = 0; i < ballCount; i++)
                balls.push(new Metaball());

            gridSize = Math.max(p5.width, p5.height) / 100;
        };

        p5.draw = (): void => {
            p5.background(bgColour);

            for (const ball of balls)
                ball.update();

            for (let x = 0; x < p5.width; x += gridSize) {
                for (let y = 0; y < p5.height; y += gridSize) {
                    const index = parseInt(
                        [[x, y], [x, y + gridSize], [x + gridSize, y + gridSize], [x + gridSize, y]]
                            // eslint-disable-next-line arrow-body-style
                            .map(([x1, y1]) => balls.reduce((a: number, b: Metaball): number => {
                                return a + b.radius / p5.dist(x1!, y1!, b.position.x, b.position.y);
                            }, 0) >= 1)
                            .map(Number)
                            .join(""),
                        2,
                    );

                    lines[index]!(x, y);
                }
            }
        };
    };
}
