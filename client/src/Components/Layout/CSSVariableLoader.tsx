/**
 * Takes in an set of key-value pairs representing variables to be declared in CSS, and embeds them in a style tag. Automatically adds `--` to the start of the variable name when embedding it inside the style tag.
 *
 * @param {{ cssVars: Record<string, string>; }} props An object containing the component props.
 * @param {Record<string, string>} props.cssVars The collection of key-value pairs to embed.
 * @returns {JSX.Element} An HTML style tag containing a `:root` which holds the CSS variables.
 */
export const CSSVariableLoader = ({ cssVars }: { cssVars: Record<string, string>; }): JSX.Element =>
    <style>{`:root {${Object.entries(cssVars).map(([key, value]) => `--${key}: ${value};`).join("\n")}}`}</style>;