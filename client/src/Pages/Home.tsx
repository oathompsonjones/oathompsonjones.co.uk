import { Button, Carousel, Col, Container, Image, Row } from "react-bootstrap";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Pfp from "../Images/pfp.jpg";

export default class Home extends Component {
    public render(): JSX.Element {
        document.title = "Oliver Jones";
        return (
            <Container>
                <Image src={Pfp} alt="Me" style={{ borderRadius: 15, maxWidth: "50%" }} />
                <h1>Oliver Jones</h1>
                <hr />
                <Row>
                    <Col>
                        <Button href="/about">About Me</Button>
                    </Col>
                    <Col>
                        <Button href="/contact">Contact Me</Button>
                    </Col>
                </Row>
                <hr/>
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
                                <Link to="/about">
                                    <Image src={this._createImage()} alt="About Me"/>
                                    <Carousel.Caption>
                                        <h1>About Me</h1>
                                    </Carousel.Caption>
                                </Link>
                            </Carousel.Item>
                            <Carousel.Item>
                                <Link to="/gallery">
                                    <Image src={this._createImage()} alt="Gallery"/>
                                    <Carousel.Caption>
                                        <h1>Gallery</h1>
                                    </Carousel.Caption>
                                </Link>
                            </Carousel.Item>
                            <Carousel.Item>
                                <Link to="/contact">
                                    <Image src={this._createImage()} alt="Contact Me"/>
                                    <Carousel.Caption>
                                        <h1>Contact Me</h1>
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
