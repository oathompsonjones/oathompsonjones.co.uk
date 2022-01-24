import { Carousel, Col, Container, Image, Row } from "react-bootstrap";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
    public render(): JSX.Element {
        document.title = "Oliver Jones";
        return (
            <Container>
                <Row>
                    <Col>
                        <Carousel>
                            <Carousel.Item>
                                <Link to="/portfolio">
                                    <Image src={this._createImage()} alt="Portfolio"/>
                                    <Carousel.Caption>
                                        <h1>Portfolio</h1>
                                    </Carousel.Caption>
                                </Link>
                            </Carousel.Item>
                            <Carousel.Item>
                                <Link to="/projects">
                                    <Image src={this._createImage()} alt="Projects"/>
                                    <Carousel.Caption>
                                        <h1>Projects</h1>
                                    </Carousel.Caption>
                                </Link>
                            </Carousel.Item>
                            <Carousel.Item>
                                <Link to="/gallery">
                                    <Image src={this._createImage()} alt="Gallery" />
                                    <Carousel.Caption>
                                        <h1>Gallery</h1>
                                    </Carousel.Caption>
                                </Link>
                            </Carousel.Item>
                            <Carousel.Item>
                                <Link to="/contact">
                                    <Image src={this._createImage()} alt="Contact"/>
                                    <Carousel.Caption>
                                        <h1>Contact</h1>
                                    </Carousel.Caption>
                                </Link>
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                </Row>
            </Container>
        );
    }

    private _createImage(): string {
        const canvas: HTMLCanvasElement = document.createElement("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight * 0.8;
        const context: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
        context.fillStyle = "rgba(255, 255, 255, 0.1)";
        context.fillRect(0, 0, canvas.width, canvas.height);
        return canvas.toDataURL();
    }
}
