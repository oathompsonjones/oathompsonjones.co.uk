import { Component } from "react";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export class PageContainer extends Component<{ footerHeight: string; }> {
    public constructor(public readonly props: { footerHeight: string; }) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <Container style={{ paddingBottom: this.props.footerHeight, width: "100vw" }}>
                <Outlet />
            </Container>
        );
    }
}