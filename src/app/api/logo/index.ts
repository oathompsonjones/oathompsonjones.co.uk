import type { CanvasRenderingContext2D } from "canvas";
import { registerFont } from "canvas";

export type ValidFileType = "dataUrl" | "jpeg" | "jpg" | "pdf" | "png" | "svg";
export type ResponseFileType = "application/pdf" | "image/jpeg" | "image/png" | "image/svg";
export type CanvasFileType = "image" | "pdf" | "svg";
export type Parameters = {
    backgroundColour: string | null;
    outerLineColour: string;
    innerLineColour: string;
    pinColour: string;
    innerColour: string;
    outerColour: string;
    topTextColour: string;
    middleTextColour: string;
    bottomTextColour: string;
    fileType: ValidFileType;
};

export const SIZE = 2048;
const MARGIN = 150;
const OUTER_WIDTH = SIZE - 2 * MARGIN;
const INNER_WIDTH = SIZE - 6 * MARGIN;

/**
 * Draws the pins on the logo.
 * @param ctx - The canvas rendering context.
 * @param parameters - The parameters for the logo.
 */
export function drawPins(ctx: CanvasRenderingContext2D, parameters: Parameters): void {
    const PINS = 9;
    const PIN_SPACING = (SIZE - 4 * MARGIN) / (PINS - 1);
    const PIN_LENGTH = 100;

    ctx.beginPath();
    ctx.strokeStyle = parameters.pinColour;
    for (let i = 0; i < PINS; i++) {
        ctx.moveTo(2 * MARGIN + i * PIN_SPACING, MARGIN);
        ctx.lineTo(2 * MARGIN + i * PIN_SPACING, MARGIN - PIN_LENGTH);
        ctx.moveTo(2 * MARGIN + i * PIN_SPACING, MARGIN + OUTER_WIDTH);
        ctx.lineTo(2 * MARGIN + i * PIN_SPACING, MARGIN + OUTER_WIDTH + PIN_LENGTH);
        ctx.moveTo(MARGIN, 2 * MARGIN + i * PIN_SPACING);
        ctx.lineTo(MARGIN - PIN_LENGTH, 2 * MARGIN + i * PIN_SPACING);
        ctx.moveTo(MARGIN + OUTER_WIDTH, 2 * MARGIN + i * PIN_SPACING);
        ctx.lineTo(MARGIN + OUTER_WIDTH + PIN_LENGTH, 2 * MARGIN + i * PIN_SPACING);
    }
    ctx.stroke();
    ctx.closePath();
}

/**
 * Draws the rectangles on the logo.
 * @param ctx - The canvas rendering context.
 * @param parameters - The parameters for the logo.
 */
export function drawRects(ctx: CanvasRenderingContext2D, parameters: Parameters): void {
    ctx.beginPath();
    ctx.strokeStyle = parameters.outerLineColour;
    ctx.fillStyle = parameters.outerColour;
    ctx.roundRect((SIZE - OUTER_WIDTH) / 2, (SIZE - OUTER_WIDTH) / 2, OUTER_WIDTH, OUTER_WIDTH, 100);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.strokeStyle = parameters.innerLineColour;
    ctx.fillStyle = parameters.innerColour;
    ctx.rect((SIZE - INNER_WIDTH) / 2, (SIZE - INNER_WIDTH) / 2, INNER_WIDTH, INNER_WIDTH);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}

/**
 * Draws the text on the logo.
 * @param ctx - The canvas rendering context.
 * @param parameters - The parameters for the logo.
 */
export function drawText(ctx: CanvasRenderingContext2D, parameters: Parameters): void {
    registerFont("src/assets/FiraCode.ttf", { family: "Fira Code", weight: "regular" });
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "150px Fira Code";
    ctx.beginPath();
    ctx.fillStyle = parameters.topTextColour;
    ctx.fillText("OLIVER JONES", SIZE / 2, 4 * MARGIN / 2);
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = parameters.bottomTextColour;
    ctx.fillText("@oathompsonjones", SIZE / 2, SIZE - 4 * MARGIN / 2);
    ctx.closePath();
    ctx.font = "700px Fira Code";
    ctx.fillStyle = parameters.middleTextColour;
    ctx.beginPath();
    ctx.fillText("</>", SIZE / 2, SIZE / 2);
    ctx.closePath();
}

/**
 * Generates an image from the parameters.
 * @param ctx - The canvas rendering context.
 * @param parameters - The parameters for the logo.
 */
export function generateImage(ctx: CanvasRenderingContext2D, parameters: Parameters): void {
    ctx.lineWidth = 20;

    if (parameters.backgroundColour !== null) {
        ctx.beginPath();
        ctx.fillStyle = parameters.backgroundColour;
        ctx.fillRect(0, 0, SIZE, SIZE);
        ctx.closePath();
    }

    drawPins(ctx, parameters);
    drawRects(ctx, parameters);
    drawText(ctx, parameters);
}

/**
 * Validates a hex colour.
 * @param str - The string to validate.
 * @param defaultValue - The default value.
 * @returns The validated hex colour.
 */
export function validateHex<T extends string | null>(str: string | null, defaultValue: T): T {
    return str !== null && (/#?[0-9a-fA-F]{6}/u).test(str) ? str.padStart(7, "#") as T : defaultValue;
}

/**
 * Validates a file type.
 * @param type - The type to validate.
 * @param defaultValue - The default value.
 * @returns The validated file type.
 */
export function validateFileType(type: string | null, defaultValue: ValidFileType): ValidFileType {
    return type !== null && ["png", "jpg", "jpeg", "svg", "pdf", "dataUrl"].includes(type) ? type as ValidFileType : defaultValue;
}

/**
 * Gets the response file type.
 * @param type - The type to get.
 * @returns The response file type.
 */
export function getResponseFileType(type: ValidFileType): ResponseFileType {
    return {
        dataUrl: "",
        jpeg: "image/jpeg",
        jpg: "image/jpeg",
        pdf: "application/pdf",
        png: "image/png",
        svg: "image/svg",
    }[type] as ResponseFileType;
}

/**
 * Gets the canvas file type.
 * @param type - The type to get.
 * @returns The canvas file type.
 */
export function getCanvasFileType(type: ValidFileType): CanvasFileType {
    return {
        dataUrl: "",
        jpeg: "image",
        jpg: "image",
        pdf: "pdf",
        png: "image",
        svg: "svg",
    }[type] as CanvasFileType;
}
