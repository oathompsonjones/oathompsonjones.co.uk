import { Box } from "@mui/material";

export default function Section({ background, children, fill }: {
    background?: JSX.Element;
    children?: JSX.Element | JSX.Element[] | string;
    fill?: boolean;
}): JSX.Element {
    return (
        <section
            style={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                margin: fill ?? true ? "-4rem -1rem 4rem" : "-4rem -1rem -1rem",
                minHeight: fill ?? true ? "100dvh" : "auto",
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
