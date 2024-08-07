import { Canvas, Image } from "canvas";

export type Repo = {
    description: string;
    homepageUrl: string | null;
    image: string;
    isPrivate: boolean;
    languages: {
        nodes: Array<{
            name: string;
        }>;
    };
    name: string;
    nameWithOwner: string;
    openGraphImageUrl: string;
    primaryLanguage: {
        name: string;
    } | null;
    url: string;
};

export type APIResponse = {
    user: {
        organizations: {
            orgs: Array<{
                repositories: {
                    repos: Repo[];
                };
            }>;
        };
        repositories: {
            repos: Repo[];
        };
    };
};

/**
 * Generates an image from an image binary.
 * @param imageBinaries - The image binaries.
 * @param i - The index of the image to generate.
 * @returns The image.
 */
export function generateImage(imageBinaries: ArrayBuffer[], i: number): string {
    const average = (l: Uint8ClampedArray): number => l.reduce((a, b) => a + b, 0) / l.length;
    const colourToHex = (c: number): string => Math.round(c).toString(16).padStart(2, "0");

    const image: Image = new Image();

    image.src = Buffer.from(imageBinaries[i]!);

    // Get the average colour of the image.
    let canvas = new Canvas(image.width, image.height);
    let context = canvas.getContext("2d");

    context.drawImage(image, 0, 0);
    const { data } = context.getImageData(0, 0, image.width, image.height);
    const colour = {
        b: average(data.filter((_, j) => j % 4 === 2)),
        g: average(data.filter((_, j) => j % 4 === 1)),
        r: average(data.filter((_, j) => j % 4 === 0)),
    };

    // Create a canvas in order to resize the image.
    canvas = new Canvas(1280, 640);
    context = canvas.getContext("2d");

    // Fill the canvas background with the colour.
    context.fillStyle = `#${colourToHex(colour.r)}${colourToHex(colour.g)}${colourToHex(colour.b)}`;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the image with the correct dimensions.
    let [dw, dh, dx] = [image.width, image.height, 0];

    if (image.height >= image.width) {
        dh = canvas.height;
        dw = dh / image.height * image.width;
        dx = (canvas.width - dw) / 2;
    } else {
        dw = canvas.width;
        dh = image.height / image.width * canvas.width;
    }

    context.drawImage(image, dx, 0, dw, dh);

    return `data:image/png;base64,${canvas.toBuffer().toString("base64")}`;
}
