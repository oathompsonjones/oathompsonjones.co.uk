import type { Breakpoint, Variant } from "@mui/material";
import CollapsibleText from "./collapsibleText";

interface IProps {
    colour?: boolean;
    minScreenSize?: Breakpoint;
    variant?: Variant;
}

export default function Name({ colour, minScreenSize, variant }: IProps): JSX.Element {
    return (
        <CollapsibleText
            beginningText={colour ?? true ? [<><span className="colour">O</span>liver</>] : [<>Oliver</>]}
            collapsibleText={colour ?? true ? [
                <><span className="colour">A</span>ndrew</>,
                <span className="colour" key={0}>Thompson</span>
            ] : [<>Andrew</>, <>Thompson</>]}
            endingText={colour ?? true ? [<span className="colour" key={0}>Jones</span>] : [<>Jones</>]}
            minScreenSize={minScreenSize ?? "xs"}
            variant={variant ?? "body1"}
        />
    );
}
