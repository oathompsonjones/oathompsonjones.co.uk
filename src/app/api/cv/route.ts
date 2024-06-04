import { generateTex, mapSection } from ".";
import type { CV } from ".";
import { NextResponse } from "next/server";
import cv from "assets/cv.json";
import pdflatex from "node-pdflatex";

const data = cv as CV;

/**
 * Gets the CV in PDF format.
 * @returns The CV in PDF format.
 */
export async function GET(): Promise<NextResponse> {
    const tex = generateTex(Object.keys(data).map((section) => mapSection(section as keyof CV)).join("\n"));
    let pdf: Buffer | null = null;

    try {
        pdf = await pdflatex(tex);
    } catch (e: unknown) {
        void e;
    }

    return new NextResponse(pdf, { headers: { contentType: "application/pdf" } });
}
