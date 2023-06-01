import { Box } from "@mui/material";

export default function Section({ background, children }: {
    background?: JSX.Element;
    children?: JSX.Element | JSX.Element[] | string;
}): JSX.Element {
    return (
        <section
            style={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                height: "100dvh",
                justifyContent: "center",
                margin: "-4rem -1rem 4rem",
                overflow: "hidden",
                padding: "5rem 1rem 1rem",
                position: "relative",
                scrollSnapAlign: "start"
            }}
        >
            <Box zIndex={-1}>{background}</Box>
            <Box sx={{ width: "100%" }}>{children}</Box>
        </section>
    );
}
