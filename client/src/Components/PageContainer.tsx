import React, { Component } from "react";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export class PageContainer extends Component {
    public render(): JSX.Element {
        return (
            <Container style={{ paddingBottom: "1vh", width: "100vw" }}>
                <Outlet />
            </Container>
        );
    }
}