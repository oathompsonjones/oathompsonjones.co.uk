import { Box, Stack, Typography } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";

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
                height: "100vh",
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
            <Stack alignItems="center" direction="row" sx={{ bottom: "1rem", margin: "1rem", position: "absolute" }}>
                <KeyboardArrowDown color="secondary" />
                <Typography variant="caption">Scroll Down</Typography>
                <KeyboardArrowDown color="secondary" />
            </Stack>
        </section>
    );
}
