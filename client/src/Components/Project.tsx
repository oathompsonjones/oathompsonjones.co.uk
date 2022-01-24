import { Accordion, Card } from "react-bootstrap";
import React, { Component } from "react";

export default class Project extends Component {
    public constructor(public readonly props: { children: Array<string | JSX.Element>; img: string; title: string; }) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <Accordion>
                <Card bg="dark">
                    <Card.Img src={this.props.img} />
                    <Card.Header>
                        <Card.Title>
                            {this.props.title}
                        </Card.Title>
                    </Card.Header>
                    <a>
                        <Accordion.Toggle as={Card.Footer} className="text-muted" eventKey="0">
                        Learn more
                        </Accordion.Toggle>
                    </a>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Card.Text>
                                {this.props.children}
                            </Card.Text>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        );
    }
}