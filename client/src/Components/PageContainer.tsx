import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export const PageContainer = ({ footerHeight }: { footerHeight: string; }): JSX.Element =>
    <Container style={{ paddingBottom: footerHeight, width: "100vw" }}>
        <Outlet />
    </Container>;