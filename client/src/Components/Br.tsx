export const Br = ({ lines }: { lines?: number; }): JSX.Element =>
    <>{Array(lines ?? 1).fill(0).map(() => <br />)}</>;