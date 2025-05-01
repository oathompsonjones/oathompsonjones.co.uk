import type { Breakpoint, TypographyVariant } from "@mui/material";
import { CollapsibleText } from "./collapsibleText";
import type { ReactNode } from "react";

/**
 * Renders my name.
 * @param props - The component properties.
 * @param props.colour - Whether to colour the text.
 * @param props.id - The ID of the component.
 * @param props.minScreenSize - The minimum screen size to display the full name.
 * @param props.variant - The text variant to use.
 * @returns The rendered component.
 */
export function Name({ colour, id, minScreenSize, variant }: {
    colour?: boolean;
    id: string;
    minScreenSize?: Breakpoint;
    variant?: TypographyVariant;
}): ReactNode {
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
