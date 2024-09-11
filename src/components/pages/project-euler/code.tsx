import type { ReactNode } from "react";
import hljs from "highlight.js/lib/common";

/**
 * Renders a code block.
 * @param props - An object containing the component props.
 * @param props.children - The code to render.
 * @returns The code block.
 */
export function Code({ children }: { children: string; }): ReactNode {
    return (
        <pre><code
            className="language-typescript"
            style={{
                backgroundColor: "#282C34",
                border: "3px solid gray",
                borderRadius: "2vmin",
                overflow: "auto",
                padding: "1rem",
                textAlign: "left",
            }}
            // eslint-disable-next-line @typescript-eslint/naming-convention
            dangerouslySetInnerHTML={{ __html: hljs.highlight(children, { language: "typescript" }).value }}
        /></pre>
    );
}
