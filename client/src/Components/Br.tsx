import { Component } from "react";

export class Br extends Component<{ lines?: number; }> {
    public constructor(public readonly props: { lines?: number; }) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <>
                {Array(this.props.lines ?? 1).fill(0).map(() => <br />)}
            </>
        );
    }
}