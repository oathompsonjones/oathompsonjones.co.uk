import { Container, Typography } from "@mui/material";

/**
 * Handles any errors.
 *
 * @param {({ code: 404 | 500; })} props An object containing the component props.
 * @param {(404 | 500)} props.code The error code to display.
 * @returns {JSX.Element} An error page.
 */
export const Error = ({ code }: { code: 404 | 500; }): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const errorMessages = { 404: "Page not found.", 500: "Internal server error." };
    return <Container>
        <Typography variant="h2" gutterBottom>Error {code} - {errorMessages[code]}</Typography>
        <Typography variant="subtitle1">These aren't the droids you're looking for. Click <a href="/">here</a> to go to the homepage.</Typography>
    </Container>;
};