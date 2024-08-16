import Image from "next/image";
import type { ReactElement } from "react";
import desk from "images/desk.jpg";

/**
 * A div which will be used to either fade in or out.
 * @param children - The children.
 * @returns A div.
 */
export default function Background(): ReactElement {
    return (
        <Image
            alt="Picture of a computer desk."
            src={desk}
            style={{
                filter: "brightness(50%) opacity(75%)",
                left: "50%",
                minHeight: "100%",
                minWidth: "100%",
                objectFit: "cover",
                position: "fixed",
                top: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: -5,
            }}
        />
    );
}
