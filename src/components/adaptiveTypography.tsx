import { Typography } from "@mui/material";
import type { TypographyTypeMap } from "@mui/material";

type AdaptiveTypographyProps = Omit<TypographyTypeMap<Partial<{
    lg: string;
    md: string;
    sm: string;
    xl: string;
    xs: string;
}>>["props"], "display">;

/**
 * Creates five Material UI `<Typography>` elements which render differently based on the window size.
 *
 * @param {(Omit<TypographyTypeMap<Partial<Record<"lg" | "md" | "sm" | "xl" | "xs", string>>>["props"], "display">)} props
 * An object containing the component props.
 * @param {string} props.lg The text to render on large displays.
 * @param {string} props.md The text to render on medium displays.
 * @param {string} props.sm The text to render on small displays.
 * @param {string} props.xl The text to render on extra large displays.
 * @param {string} props.xs The text to render on extra small displays.
 * @param {(Omit<TypographyTypeMap["props"], "display">)} props.props Any other props which can be given to a `<Typography>` element.
 * @returns {JSX.Element} Five `<Typography>` elements, rendering only 1 at a time.
 */
// ? Is there a neater way of doing this?
export function AdaptiveTypography({ lg, md, sm, xl, xs, ...props }: AdaptiveTypographyProps): JSX.Element {
    return (
        <>
            {/* Typography element for extra small displays. */}
            <Typography
                {...props} display={{
                    lg: xs !== undefined && sm === undefined && md === undefined && lg === undefined
                        ? "block"
                        : "none",
                    md: xs !== undefined && sm === undefined && md === undefined
                        ? "block"
                        : "none",
                    sm: xs !== undefined && sm === undefined
                        ? "block"
                        : "none",
                    xl: xs !== undefined && sm === undefined && md === undefined && lg === undefined && xl === undefined
                        ? "block"
                        : "none",
                    xs: xs === undefined
                        ? "none"
                        : "block"
                }}
            >{xs}
            </Typography>
            {/* Typography element for small displays. */}
            <Typography
                {...props} display={{
                    lg: sm !== undefined && md === undefined && lg === undefined
                        ? "block"
                        : "none",
                    md: sm !== undefined && md === undefined
                        ? "block"
                        : "none",
                    sm: sm === undefined
                        ? "none"
                        : "block",
                    xl: sm !== undefined && md === undefined && lg === undefined && xl === undefined
                        ? "block"
                        : "none",
                    xs: "none"
                }}
            >{sm}
            </Typography>
            {/* Typography element for medium displays. */}
            <Typography
                {...props} display={{
                    lg: md !== undefined && lg === undefined
                        ? "block"
                        : "none",
                    md: md === undefined
                        ? "none"
                        : "block",
                    sm: "none",
                    xl: md !== undefined && lg === undefined && xl === undefined
                        ? "block"
                        : "none",
                    xs: "none"
                }}
            >{md}
            </Typography>
            {/* Typography element for large displays. */}
            <Typography
                {...props} display={{
                    lg: lg === undefined
                        ? "none"
                        : "block",
                    md: "none",
                    sm: "none",
                    xl: lg !== undefined && xl === undefined
                        ? "block"
                        : "none",
                    xs: "none"
                }}
            >{lg}
            </Typography>
            {/* Typography element for extra large displays. */}
            <Typography
                {...props} display={{
                    lg: "none",
                    md: "none",
                    sm: "none",
                    xl: xl === undefined
                        ? "none"
                        : "block",
                    xs: "none"
                }}
            >{xl}
            </Typography>
        </>
    );
}
