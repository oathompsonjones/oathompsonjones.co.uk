import React, { Component } from "react";

export default class MobBr extends Component {
    public render(): JSX.Element {
        return window.matchMedia("(max-width: 700px)").matches ? <br/> : <></>;
    }
}