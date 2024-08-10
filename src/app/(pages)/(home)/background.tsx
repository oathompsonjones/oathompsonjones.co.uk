import { Box } from "@mui/material";
import type { ReactElement } from "react";
import Image from "next/image";
import desk from "images/desk.jpg";

/**
 * A div which will be used to either fade in or out.
 * @param children - The children.
 * @returns A div.
 */
export default function Background(): ReactElement {
    return (
        <Box zIndex={-5} position="fixed">
            <Image
                alt="Picture of a computer desk."
                src={desk}
                style={{ filter: "brightness(50%) opacity(75%)", position: "fixed" }}
                fill
                objectFit="cover"
            />
        </Box>
    );
}
