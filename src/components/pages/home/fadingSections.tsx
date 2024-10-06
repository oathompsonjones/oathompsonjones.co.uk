import Box from "components/layout/box";
import type { ReactNode } from "react";
import { Section } from "./section";

/**
 * A wrapper which causes the child sections to fade between each other.
 * @param props - The component properties.
 * @param props.children - The children to render.
 * @param props.index - The index of which child to show.
 * @returns A div.
 */
export function FadingSections({ children, index }: { children: ReactNode[]; index: number; }): ReactNode {
    return (
        <>
            {/* Adds enough empty sections to allow for correct positioning. */}
            {Array.from({ length: children.length - 1 }, (_, i) => <Section key={i} />)}
            <Box
                className="wrapper edge"
                sx={{
                    bottom: 0,
                    height: "100vh",
                    marginTop: "-4rem",
                    pointerEvents: "none",
                    position: "sticky",
                    width: "100%",
                }}
            >
                {children.map((child, i) => (
                    <Box
                        className="edge"
                        sx={{
                            alignItems: "center",
                            display: "flex",
                            height: "100vh",
                            opacity: "var(--opacity)",
                            position: "absolute",
                            top: 0,
                            transition: "opacity 0.5s",
                            width: "100%",
                        }}
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        style={{ "--opacity": i === Math.round(index) ? "1" : "0" }}
                        key={i}
                    >
                        <Section>{child}</Section>
                    </Box>
                ))}
            </Box>
        </>
    );
}
