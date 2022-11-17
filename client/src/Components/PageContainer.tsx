import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export const PageContainer = (props: { footerHeight: string; }): JSX.Element =>
    <Container style={{ paddingBottom: props.footerHeight, width: "100vw" }}>
        <Outlet />
    </Container>;