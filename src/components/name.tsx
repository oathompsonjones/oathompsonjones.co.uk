import type { Breakpoint, Variant } from "@mui/material";
import { CollapsibleText } from "./collapsibleText";
import type { ReactElement } from "react";

/**
 * Renders my name.
 * @param props - The component properties.
 * @returns The rendered component.
 */
export function Name({ colour, id, minScreenSize, variant }: Readonly<{
    colour?: boolean;
    id: string;
    minScreenSize?: Breakpoint;
    variant?: Variant;
}>): ReactElement {
    return (
        <CollapsibleText
            beginningText={colour ?? true ? [<><span className="colour">O</span>liver</>] : ["Oliver"]}
            collapsibleText={colour ?? true
                ? [
                    <><span className="colour">A</span>ndrew</>,
                    <span className="colour" key={0}>Thompson</span>,
                ]
                : ["Andrew", "Thompson"]}
            endingText={colour ?? true ? [<span className="colour" key={0}>Jones</span>] : ["Jones"]}
            id={`name-${id}`}
            minScreenSize={minScreenSize ?? "xs"}
            variant={variant ?? "body1"}
        />
    );
}
