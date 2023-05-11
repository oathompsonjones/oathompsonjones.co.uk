import type { CanvasFileType, Parameters, ResponseFileType, ValidFileType } from ".";
import { Canvas } from "canvas";
import type { CanvasRenderingContext2D } from "canvas";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const SIZE = 2048;
const MARGIN = 150;
const OUTER_WIDTH = SIZE - 2 * MARGIN;
const INNER_WIDTH = SIZE - 6 * MARGIN;

function drawPins(ctx: CanvasRenderingContext2D, parameters: Parameters): void {
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

function drawRects(ctx: CanvasRenderingContext2D, parameters: Parameters): void {
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

function drawText(ctx: CanvasRenderingContext2D, parameters: Parameters): void {
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

function generateImage(ctx: CanvasRenderingContext2D, parameters: Parameters): void {
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

function validateHex<T extends string | null>(str: string | null, defaultValue: T): T {
    return str !== null && (/#?[0-9a-fA-F]{6}/u).test(str) ? str.padStart(7, "#") as T : defaultValue;
}

function validateFileType(type: string | null, defaultValue: ValidFileType): ValidFileType {
    return type !== null && ["png", "jpg", "jpeg", "svg", "pdf", "dataUrl"].includes(type) ? type as ValidFileType : defaultValue;
}

function getResponseFileType(type: ValidFileType): ResponseFileType {
    return {
        dataUrl: "",
        jpeg: "image/jpeg",
        jpg: "image/jpeg",
        pdf: "application/pdf",
        png: "image/png",
        svg: "image/svg"
    }[type] as ResponseFileType;
}

function getCanvasFileType(type: ValidFileType): CanvasFileType {
    return {
        dataUrl: "",
        jpeg: "image",
        jpg: "image",
        pdf: "pdf",
        png: "image",
        svg: "svg"
    }[type] as CanvasFileType;
}

export function GET(req: NextRequest): NextResponse {
    const { searchParams } = new URL(req.url);
    const parameters = {
        backgroundColour: validateHex(searchParams.get("backgroundColour"), null),
        bottomTextColour: validateHex(searchParams.get("bottomTextColour"), "#6ACF65"),
        fileType: validateFileType(searchParams.get("fileType"), "svg"),
        innerColour: validateHex(searchParams.get("innerColour"), "#000000"),
        innerLineColour: validateHex(searchParams.get("innerLineColour"), "#BABABA"),
        middleTextColour: validateHex(searchParams.get("middleTextColour"), "#BABABA"),
        outerColour: validateHex(searchParams.get("outerColour"), "#094D1C"),
        outerLineColour: validateHex(searchParams.get("outerLineColour"), "#D4AF37"),
        pinColour: validateHex(searchParams.get("pinColour"), "#808080"),
        topTextColour: validateHex(searchParams.get("topTextColour"), "#6ACF65")
    };
    const canvas = new Canvas(SIZE, SIZE, getCanvasFileType(parameters.fileType));
    generateImage(canvas.getContext("2d"), parameters);
    return parameters.fileType === "dataUrl"
        ? new NextResponse(canvas.toDataURL())
        : new NextResponse(canvas.toBuffer(), { headers: { contentType: getResponseFileType(parameters.fileType) } });
}
