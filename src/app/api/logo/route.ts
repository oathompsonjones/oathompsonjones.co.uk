import { SIZE, generateImage, getCanvasFileType, getResponseFileType, validateFileType, validateHex } from ".";
import { Canvas } from "canvas";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

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
