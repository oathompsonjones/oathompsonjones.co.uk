import Image from "next/image";
import type { ReactElement } from "react";
import desk from "images/desk.jpg";
import { useThemeContext } from "contexts/themeContext";

/**
 * A div which will be used to either fade in or out.
 * @returns A div.
 */
export function Background(): ReactElement {
    const { theme: { palette: { mode } } } = useThemeContext();

    return (
        <Image
            alt="Picture of a computer desk."
            src={desk}
            style={{
                filter: `brightness(${mode === "dark" ? 50 : 60}%) blur(5px)`,
                left: "50%",
                minHeight: "100%",
                minWidth: "100%",
                objectFit: "cover",
                position: "fixed",
                top: "50%",
                transform: "translate(-50%, -50%) scale(1.1)",
                transition: "filter 0.5s",
                zIndex: -5,
            }}
        />
    );
}
