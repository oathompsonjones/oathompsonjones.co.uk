export const Br = (props: { lines?: number; }): JSX.Element =>
    <>{Array(props.lines ?? 1).fill(0).map(() => <br />)}</>;