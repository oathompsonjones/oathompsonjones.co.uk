import type { ReactElement, ReactNode } from "react";
import Box from "components/layout/box";

/**
 * A div which will be used to either fade in or out.
 * @param props - The component properties.
 * @param props.children - The children to render.
 * @returns A div.
 */
export function FadingDiv({ children }: { children: ReactNode; }): ReactElement {
    return (
        <Box
            className="fadingDiv"
            sx={{
                alignItems: "center",
                display: "flex",
                filter: { md: "opacity(0%)" },
                flexDirection: "column",
                height: "100%",
                justifyContent: "center",
                left: 0,
                overflow: "hidden",
                padding: { md: "5rem 3rem 1rem" },
                pointerEvents: "none",
                position: { md: "fixed" },
                top: 0,
                transition: "filter 0.25s linear",
            }}>
            {children}
        </Box>
    );
}
