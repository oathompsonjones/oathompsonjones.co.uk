/* eslint-disable max-classes-per-file */

"use client";

import { NextReactP5Wrapper } from "@p5-wrapper/next";
import type { ReactNode } from "react";
import type { Sketch } from "@p5-wrapper/react";
import type p5 from "p5";
import { useMediaQuery } from "@mui/system";
import { useThemeMode } from "hooks/useThemeMode";

/**
 * A div which will be used to either fade in or out.
 * @returns A div.
 */
export function Background(): ReactNode {
    const { themeColour, theme } = useThemeMode();
    const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

    const hexToRgb = (hex: string): [number, number, number] => (hex.replace(/#/g, "")
        .match(/.{1,2}/g)?.map((x) => parseInt(x, 16)) ?? [0, 0, 0]) as [number, number, number];

    const bgColour = hexToRgb(theme.palette.background.default);
    const txtColourMain = hexToRgb(theme.palette.primary.main);
    const txtColourHighlight = hexToRgb(theme.palette.common[themeColour === "dark" ? "white" : "black"]);

    const sketch: Sketch = (p5: p5) => {
        const symbolSize = 15;
        const streams: Stream[] = [];

        class Character {
            private readonly switchInterval: number;

            private value: string = "";

            public constructor(
                private readonly x: number,
                private y: number,
                private readonly speed: number,
                private readonly showWhite: boolean,
                private readonly opacity: number,
            ) {
                this.opacity /= 3;
                this.switchInterval = Math.round(Math.random() * (20 - 5) + 5);
                this.setToRandomSymbol();
            }

            public render(): void {
                this.setToRandomSymbol();
                this.rain();

                if (this.showWhite)
                    p5.fill(...txtColourHighlight, this.opacity);
                else
                    p5.fill(...txtColourMain, this.opacity);

                p5.text(this.value, this.x, this.y);
            }

            private rain(): void {
                this.y = this.y >= p5.height ? 0 : this.y + this.speed;
            }

            private setToRandomSymbol(): void {
                if (p5.frameCount % this.switchInterval === 0)
                    this.value = String.fromCharCode(0x30A0 + Math.round(Math.random() * 122));
            }
        }

        class Stream {
            private readonly totalSymbols: number;

            private readonly speed: number;

            private readonly symbols: Character[] = [];

            public constructor() {
                this.totalSymbols = Math.round(Math.random() * (100 - 15) + 15);
                this.speed = Math.round(Math.random() * (5 - 1) + 1);
                this.symbols = [];
            }

            public generateSymbols(x: number): void {
                const y = Math.round(Math.random() * -500 - 500);
                const showWhite = Math.round(Math.random() * 3) === 1;

                for (let i = 0; i < this.totalSymbols; i++) {
                    this.symbols.push(new Character(
                        x,
                        y - i * symbolSize,
                        this.speed,
                        showWhite && i === 0,
                        255 - 255 * i / this.totalSymbols,
                    ));
                }
            }

            public render(): void {
                for (const symbol of this.symbols)
                    symbol.render();
            }
        }

        p5.setup = (): void => {
            p5.createCanvas(window.innerWidth, window.innerHeight);
            p5.fullscreen();

            let x = 0;

            for (let i = 0; i < p5.width / symbolSize; i++) {
                const stream = new Stream();

                stream.generateSymbols(x);
                streams[i] = stream;
                x += symbolSize;
            }
            p5.textFont("Fira Code", symbolSize);
        };

        p5.draw = (): void => {
            p5.background(...bgColour, 150);
            for (const stream of streams)
                stream.render();
        };
    };

    return (
        <div style={{
            height: "100vh",
            left: 0,
            overflow: "hidden",
            position: "fixed",
            top: 0,
            width: "100vw",
            zIndex: -10,
        }}>
            {!reducedMotion && <NextReactP5Wrapper sketch={sketch} />}
        </div>
    );
}
