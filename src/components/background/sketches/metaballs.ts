// TODO: Add linear interpolation to the vertices.
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
        const metaThreshold = 2.5;
        const ballCount = 10;
        const balls: Metaball[] = [];
        const gridSize = 15;
        const lines = [
            (x: number, y: number): void => {
                // None
                void [x, y];
            },
            (x: number, y: number): void => {
                // Top Right
                p5.line(x + gridSize / 2, y, x + gridSize, y + gridSize / 2);
            },
            (x: number, y: number): void => {
                // Bottom Right
                p5.line(x + gridSize / 2, y + gridSize, x + gridSize, y + gridSize / 2);
            },
            (x: number, y: number): void => {
                // Vertical
                p5.line(x + gridSize / 2, y, x + gridSize / 2, y + gridSize);
            },
            (x: number, y: number): void => {
                // Bottom Left
                p5.line(x, y + gridSize / 2, x + gridSize / 2, y + gridSize);
            },
            (x: number, y: number): void => {
                // Top Right & Bottom Left
                p5.line(x + gridSize / 2, y, x + gridSize, y + gridSize / 2);
                p5.line(x, y + gridSize / 2, x + gridSize / 2, y + gridSize);
            },
            (x: number, y: number): void => {
                // Horizontal
                p5.line(x, y + gridSize / 2, x + gridSize, y + gridSize / 2);
            },
            (x: number, y: number): void => {
                // Top Left
                p5.line(x, y + gridSize / 2, x + gridSize / 2, y);
            },
            (x: number, y: number): void => {
                // Top Left
                p5.line(x, y + gridSize / 2, x + gridSize / 2, y);
            },
            (x: number, y: number): void => {
                // Horizontal
                p5.line(x, y + gridSize / 2, x + gridSize, y + gridSize / 2);
            },
            (x: number, y: number): void => {
                // Top Left & Bottom Right
                p5.line(x, y + gridSize / 2, x + gridSize / 2, y);
                p5.line(x + gridSize / 2, y + gridSize, x + gridSize, y + gridSize / 2);
            },
            (x: number, y: number): void => {
                // Bottom Left
                p5.line(x, y + gridSize / 2, x + gridSize / 2, y + gridSize);
            },
            (x: number, y: number): void => {
                // Vertical
                p5.line(x + gridSize / 2, y, x + gridSize / 2, y + gridSize);
            },
            (x: number, y: number): void => {
                // Bottom Right
                p5.line(x + gridSize / 2, y + gridSize, x + gridSize, y + gridSize / 2);
            },
            (x: number, y: number): void => {
                // Top Right
                p5.line(x + gridSize / 2, y, x + gridSize, y + gridSize / 2);
            },
            (x: number, y: number): void => {
                // None
                void [x, y];
            },
        ];

        class Metaball {
            public readonly radius = p5.random(75, 150);

            public angle = p5.random(2 * p5.PI);

            public position = p5.createVector(p5.width / 2, p5.height / 2);

            public get velocity(): p5.Vector {
                return p5.createVector(Math.cos(this.angle), Math.sin(this.angle)).mult(this.radius / 25);
            }

            public update(): void {
                this.position.add(this.velocity);

                // Bounce off the walls
                if (this.position.x + this.radius > p5.width || this.position.x - this.radius < 0)
                    this.angle = p5.PI - this.angle;

                if (this.position.y + this.radius > p5.height || this.position.y - this.radius < 0)
                    this.angle = -this.angle;

                // Bounce off other balls
                for (const other of balls) {
                    if (other === this)
                        continue;

                    if (this.position.dist(other.position) < this.radius + other.radius)
                        this.angle = p5.atan2(this.position.y - other.position.y, this.position.x - other.position.x);
                }

                // Show the ball
                // ? p5.ellipse(this.position.x, this.position.y, this.radius * 2);
            }
        }

        const calculateDistance = (x: number, y: number): number => balls.reduce((
            a: number,
            b: Metaball,
        ): number => a + b.radius / p5.dist(x, y, b.position.x, b.position.y), 0);

        p5.setup = (): void => {
            p5.createCanvas(window.innerWidth, window.innerHeight);
            p5.stroke(mainColour);
            p5.strokeWeight(3);
            p5.noFill();

            for (let i = 0; i < ballCount; i++)
                balls.push(new Metaball());
        };

        p5.draw = (): void => {
            p5.background(bgColour);

            for (const ball of balls)
                ball.update();

            for (let x = 0; x < p5.width; x += gridSize) {
                for (let y = 0; y < p5.height; y += gridSize) {
                    const index = parseInt([
                        [x, y],
                        [x, y + gridSize],
                        [x + gridSize, y + gridSize],
                        [x + gridSize, y],
                    ].map(([x1, y1]) => calculateDistance(x1!, y1!) >= metaThreshold).map(Number).join(""), 2);

                    lines[index]!(x, y);
                }
            }
        };
    };
}
