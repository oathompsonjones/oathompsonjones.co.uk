import "./Header.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import React, { Component } from "react";

export default class Header extends Component {
    public render(): JSX.Element {
        return (
            <>
                <Navbar bg="primary" variant="dark" sticky="top">
                    <Container>
                        <Navbar.Brand href="#">Home</Navbar.Brand>
                        <Nav className="mr-auto">
                            <Nav.Link href="#portfolio">Portfolio</Nav.Link>
                            <Nav.Link href="#projects">Projects</Nav.Link>
                            <Nav.Link href="#contact">Contact</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
                <br/>
            </>
        );
    }
}