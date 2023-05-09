import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

/**
 * Handles loading for the page.
 *
 * @returns {JSX.Element} A loading element.
 */
export default function Loading(): JSX.Element {
    return (
        <Stack alignItems="center" justifyContent="center">
            <CircularProgress />
        </Stack>
    );
}

