import React, { Component } from "react";

export default class Card extends Component {
    constructor(public props: { heading: string; text: Array<string | JSX.Element>; }) {
        super(props);
        console.log(this.props);
    }

    public render() {
        return (
            <div className="card">
                <div className="card-header"><h3>{this.props.heading}</h3></div>
                <div className="card-body"><p>{this.props.text}</p></div>
            </div>
        );
    }
}
