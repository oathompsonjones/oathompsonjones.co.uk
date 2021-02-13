import { Carousel, Container, Row } from "react-bootstrap";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
    public render(): JSX.Element {
        document.title = "Oliver Jones";
        return (
            <Container style={{ width: "90%" }}>
                <Row className="justify-content-md-center">
                    <Carousel>
                        <Carousel.Item>
                            <img className="d-block w-100" src={this._createImage()} alt="Portfolio"/>
                            <Carousel.Caption>
                                <Link to="/portfolio">
                                    <h1>Portfolio</h1>
                                </Link>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="d-block w-100" src={this._createImage()} alt="Projects"/>
                            <Carousel.Caption>
                                <Link to="/projects">
                                    <h1>Projects</h1>
                                </Link>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="d-block w-100" src={this._createImage()} alt="Contact"/>
                            <Carousel.Caption>
                                <Link to="/contact">
                                    <h1>Contact</h1>
                                </Link>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Row>
            </Container>
        );
    }

    private _createImage(): string {
        const canvas: HTMLCanvasElement = document.createElement("canvas");
        canvas.width = 500;
        canvas.height = 250;
        const context: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
        context.fillStyle = "rgba(255, 255, 255, 0.1)";
        context.fillRect(0, 0, 500, 250);
        return canvas.toDataURL();
    }
}
