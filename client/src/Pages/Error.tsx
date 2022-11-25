import { Container, Typography } from "@mui/material";

export const Error = (): JSX.Element => <Container>
    <Typography variant="h2" gutterBottom>Error 404 - Page not found.</Typography>
    <Typography variant="subtitle1">These aren't the droids you're looking for.</Typography>
</Container>;