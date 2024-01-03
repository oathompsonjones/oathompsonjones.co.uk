import { Canvas, Image } from "canvas";

export interface IRepo {
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
}

export interface IAPIResponse {
    user: {
        organizations: {
            orgs: Array<{
                repositories: {
                    repos: IRepo[];
                };
            }>;
        };
        repositories: {
            repos: IRepo[];
        };
    };
}

export function generateImage(imageBinaries: ArrayBuffer[], i: number): string {
    const image: Image = new Image();
    image.src = Buffer.from(imageBinaries[i]!);

    // Get the colour of the top left pixel of the image.
    let canvas = new Canvas(image.width, image.height);
    let context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height);
    const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
    const colourToHex = (colour: number): string => colour.toString(16).padStart(2, "0");
    const hexColour = `#${colourToHex(r!)}${colourToHex(g!)}${colourToHex(b!)}`;

    // Create a canvas in order to resize the image.
    canvas = new Canvas(1280, 640);
    context = canvas.getContext("2d");

    // Fill the canvas background with the colour.
    context.fillStyle = hexColour;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the image with the correct dimensions.
    let [dw, dh, dx] = [image.width, image.height, 0];
    if (image.height >= image.width) {
        dh = canvas.height;
        dw = dh / image.height * image.width;
        dx = (canvas.width - dw) / 2;
    } else if (image.height < image.width) {
        dw = canvas.width;
        dh = image.height / image.width * canvas.width;
    }
    context.drawImage(image, dx, 0, dw, dh);
    return `data:image/png;base64,${canvas.toBuffer().toString("base64")}`;
}