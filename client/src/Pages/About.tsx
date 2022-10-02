import { Avatar, Container, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import React, { Component } from "react";
import Pfp from "../Images/pfp.jpg";

export class About extends Component {
    public render(): JSX.Element {
        document.title = "Oliver Jones | About Me";
        return (
            <Container>
                <Typography component="h1" variant="h2">About Me</Typography>
                <Grid container direction="column" justifyContent="center" alignItems="center" flexGrow={1}>
                    <Paper style={{ padding: "2.5% 5% 5%" }}>
                        <Typography component="h1" variant="h4">Biography</Typography>
                        <Divider variant="middle" style={{ margin: "1.25% 0%" }} />
                        <Stack direction="row">
                            <Avatar src={Pfp} style={{
                                float: "left",
                                height: "25%",
                                marginRight: "5%",
                                width: "25%"
                            }} />
                            <Grid container direction="column" justifyContent="center" flexGrow={1}>
                                <Typography component="h6" variant="h6">Name</Typography>
                                <Typography variant="body1">
                                    <strong>O</strong>liver <strong>A</strong>ndrew <strong>Thompson Jones</strong>
                                </Typography>
                                <Divider variant="middle" style={{ margin: "1.25% 0%" }} flexItem />
                                <Typography component="h6" variant="h6">Nationality</Typography>
                                <Typography variant="body1">British</Typography>
                                <Divider variant="middle" style={{ margin: "1.25% 0%" }} flexItem />
                                <Typography component="h6" variant="h6">Age</Typography>
                                <Typography variant="body1">
                                    {((): number => {
                                        const today: Date = new Date();
                                        const birthDate: Date = new Date(2003, 0, 2);
                                        return today.getMonth() - birthDate.getMonth() <= 0 && today.getDate() < birthDate.getDate()
                                            ? today.getFullYear() - birthDate.getFullYear() - 1
                                            : today.getFullYear() - birthDate.getFullYear();
                                    })()}
                                </Typography>
                            </Grid>
                        </Stack>
                    </Paper>
                </Grid>
                <br/>
                <Stack direction={{ md: "row", sm: "column" }} justifyContent="space-evenly">
                    <Paper sx={{ display: "flex", flexDirection: "column", maxWidth: { md: "33%", sm: "100%" }, padding: "1.25% 2.5% 2.5%" }}>
                        <Typography component="h1" variant="h4">GCSEs</Typography>
                        <Divider variant="middle" style={{ margin: "1.25% 0%" }} />
                        <Stack direction="row" flexGrow={1}>
                            <Typography variant="body1" flexGrow={1}>
                                Biology <br />
                                Chemistry <br />
                                Computer Science <br />
                                English Language <br />
                                English Literature <br />
                                French <br />
                                History <br />
                                Mathematics <br />
                                Physics <br />
                            </Typography>
                            <Typography variant="body1" flexGrow={1}>
                                8 <br />
                                7 <br />
                                8 <br />
                                8 <br />
                                7 <br />
                                7 <br />
                                8 <br />
                                8 <br />
                                8 <br />
                            </Typography>
                        </Stack>
                        <Divider variant="middle" style={{ margin: "1.25% 0%" }} />
                        <Typography variant="caption" style={{ bottom: 0 }}>
                            Attained at <a href="https://tbshs.org">The Bishop's Stortford High School</a> in 2019.
                        </Typography>
                    </Paper>
                    <br />
                    <Paper sx={{ display: "flex", flexDirection: "column", maxWidth: { md: "33%", sm: "100%" }, padding: "1.25% 2.5% 2.5%" }}>
                        <Typography component="h1" variant="h4">A-Levels</Typography>
                        <Divider variant="middle" style={{ margin: "1.25% 0%" }} />
                        <Stack direction="row" flexGrow={1}>
                            <Typography variant="body1" flexGrow={1}>
                                Computer Science <br />
                                Further Mathematics <br />
                                Mathematics <br />
                                Physics <br />
                            </Typography>
                            <Typography variant="body1" flexGrow={1}>
                                A* <br />
                                B  <br />
                                A* <br />
                                A* <br />
                            </Typography>
                        </Stack>
                        <Divider variant="middle" style={{ margin: "1.25% 0%" }} />
                        <Typography variant="caption" style={{ bottom: 0 }}>
                            Attained at <a href="https://tbshs.org">The Bishop's Stortford High School</a> in 2021.
                        </Typography>
                    </Paper>
                    <br />
                    <Paper sx={{ display: "flex", flexDirection: "column", maxWidth: { md: "33%", sm: "100%" }, padding: "1.25% 2.5% 2.5%" }}>
                        <Typography component="h1" variant="h4">Further Education</Typography>
                        <Divider variant="middle" style={{ margin: "1.25% 0%" }} />
                        <Typography variant="body1" flexGrow={1}>
                            Currently studying Undergraduate Computer Science at the University of Edinburgh.
                        </Typography>
                        <Stack direction="row" flexGrow={1}>
                            <Typography variant="body1" flexGrow={1}>
                                1st Year <br />
                                2nd Year <br />
                                3rd Year <br />
                                4th Year <br />
                            </Typography>
                            <Typography variant="body1" flexGrow={1}>
                                I   <br />
                                TBD <br />
                                TBD <br />
                                TBD <br />
                            </Typography>
                        </Stack>
                        <Divider variant="middle" style={{ margin: "1.25% 0%" }} />
                        <Typography variant="caption" style={{ bottom: 0 }}>
                            Studying at <a href="https://ed.ac.uk">The University of Edinburgh</a> since 2021.
                        </Typography>
                    </Paper>
                </Stack>
                <br />
            </Container>
        );
    }
}
