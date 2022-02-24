import { Container, Nav, Navbar } from "react-bootstrap";
import React, { Component } from "react";

export default class Header extends Component {
    public render(): JSX.Element {
        return (
            <header>
                <Navbar bg="primary" variant="dark" sticky="top" expand="lg">
                    <Container>
                        <Navbar.Brand href="/">oathompsonjones</Navbar.Brand>
                        <Navbar.Toggle/>
                        <Navbar.Collapse className="justify-content-end">
                            <Nav className="ml-auto">
                                <Nav.Link href="/about">About Me</Nav.Link>
                                <Nav.Link href="/portfolio">Portfolio</Nav.Link>
                                <Nav.Link href="/gallery">Gallery</Nav.Link>
                                <Nav.Link href="/contact">Contact Me</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <br/>
            </header>
        );
    }
}