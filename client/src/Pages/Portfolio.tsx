import { CircularProgress, Container, Stack, Typography } from "@mui/material";
import { GitHub } from "../../../API";
import { GitHubRepo } from "../Components";
import { Masonry } from "@mui/lab";
import { useAxios } from "../Hooks";

/**
 * This page acts as an online portfolio.
 *
 * @returns {JSX.Element} My portfolio, accessed from my GitHub profile.
 */
export const Portfolio = (): JSX.Element => {
    // Calls the backend API to access the repositories from GitHub.
    const [repos] = useAxios<GitHub.IRepo[]>("/api/github");

    // Renders the portfolio page.
    return <Container>
        <Typography variant="h2">Portfolio</Typography>
        <Typography variant="subtitle1">These projects are pulled directly from my <a href="/github">GitHub</a> profile.</Typography>
        {
            repos === null
                ? <Stack justifyContent="center" alignItems="center">
                    <CircularProgress />
                </Stack>
                : <Masonry columns={{ lg: 4, md: 3, sm: 2, xs: 1 }}>
                    {repos.map((repo, i) => <GitHubRepo key={i} repo={repo} index={i} />)}
                </Masonry>
        }
    </Container>;
};