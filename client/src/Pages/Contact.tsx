import { Container, Divider, Paper, Stack, Typography } from "@mui/material";
import React, { Component } from "react";

export default class Contact extends Component<{}, { email: string | null; firstName: string | null; lastName: string | null; message: string | null; subject: string | null; }> {
    public constructor(props: {}) {
        super(props);
        this.state = { email: null, firstName: null, lastName: null, message: null, subject: null };
    }

    public render(): JSX.Element {
        document.title = "Oliver Jones | Contact Me";

        return (
            <Container>
                <Typography component="h1" variant="h2">Contact Me</Typography>
                <Paper style={{ padding: "2.5% 5% 5%" }}>
                    <Typography component="h1" variant="h4">Quick Links</Typography>
                    <Divider variant="middle" style={{ margin: "1.25% 0%" }} />
                    <Stack direction={{ md: "row", sm: "column" }} justifyContent="space-evenly" alignItems="center">
                        <a href="/email">oathompsonjones@gmail.com</a>
                        <a href="/discord">Discord</a>
                        <a href="/facebook">Facebook</a>
                        <a href="/github">GitHub</a>
                        <a href="/instagram">Instagram</a>
                        <a href="/linkedin">LinkedIn</a>
                        <a href="/twitter">Twitter</a>
                    </Stack>
                </Paper>
            </Container>
        );
    }
}
