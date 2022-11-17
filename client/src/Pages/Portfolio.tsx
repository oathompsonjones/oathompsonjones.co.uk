import { CircularProgress, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { GitHub } from "../../../API";
import { GitHubRepo } from "../Components";
import { Masonry } from "@mui/lab";
import axios from "axios";

export const Portfolio = (): JSX.Element => {
    document.title = "Oliver Jones | Portfolio";

    const [repos, setRepos] = useState<GitHub.IRepo[]>([]);

    useEffect(() => {
        void (async (): Promise<void> => {
            try {
                const { data }: { data: GitHub.IRepo[]; } = await axios.get("/api/github");
                setRepos(data);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    return <Container>
        <Typography variant="h2">Portfolio</Typography>
        <Typography variant="subtitle1">These projects are pulled directly from my <a href="/github">GitHub</a> profile.</Typography>
        {
            repos.length === 0
                ? <Stack justifyContent="center" alignItems="center">
                    <CircularProgress />
                </Stack>
                : <Masonry columns={{ lg: 4, md: 3, sm: 2, xs: 1 }}>
                    {repos.map((repo, i) => <GitHubRepo key={i} repo={repo} index={i} />)}
                </Masonry>
        }
    </Container>;
};