export type ValidFileType = "dataUrl" | "jpeg" | "jpg" | "pdf" | "png" | "svg";
export type ResponseFileType = "application/pdf" | "image/jpeg" | "image/png" | "image/svg";
export type CanvasFileType = "image" | "pdf" | "svg";
export interface Parameters {
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
}
