/**
 * A multiline line break element.
 *
 * @param {{ lines?: number; }} props An object containing the component props.
 * @param {number} [props.lines] The number of line breaks to render. Defaults to 1.
 * @returns {JSX.Element} Multiple line breaks.
 */
export const Br = ({ lines }: { lines?: number; } = { lines: 1 }): JSX.Element => (
    <>
        {
            Array(lines).fill(0)
                .map((_, i) => <br key={i} />)
        }
    </>
);
