/**
 * A multiline line break element.
 *
 * @param {{ lines?: number; }} props An object containing the component props.
 * @param {number} [props.lines] The number of line breaks to render.
 * @returns {JSX.Element} Multiple line breaks.
 */
export const Br = ({ lines }: { lines?: number; }): JSX.Element => <>{
    Array(lines ?? 1).fill(0)
        .map(() => <br />)
}</>;
