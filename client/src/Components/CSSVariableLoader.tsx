import React, { Component } from "react";

export class CSSVariableLoader extends Component<{ cssVars: { [key: string]: string; }; }> {
    public constructor(public readonly props: { cssVars: { [key: string]: string; }; }) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <style>{`:root {${Object.entries(this.props.cssVars).map(([key, value]) => `--${key}: ${value};`).join("\n")}}`}</style>
        );
    }
}