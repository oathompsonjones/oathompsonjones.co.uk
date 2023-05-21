import CollapsibleText from "./collapsibleText";
import type { Variant } from "@mui/material";

export default function Name({ colour, variant }: { colour?: boolean; variant?: Variant; }): JSX.Element {
    return (
        <CollapsibleText
            beginningText={colour ?? true ? [<><span className="colour">O</span>liver</>] : [<>Oliver</>]}
            collapsibleText={colour ?? true ? [
                <><span className="colour">A</span>ndrew</>,
                <span className="colour" key={0}>Thompson</span>
            ] : [<>Andrew</>, <>Thompson</>]}
            endingText={colour ?? true ? [<span className="colour" key={0}>Jones</span>] : [<>Jones</>]}
            variant={variant ?? "body1"}
        />
    );
}
