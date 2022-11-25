import { Typography, TypographyTypeMap } from "@mui/material";

type Props = Omit<TypographyTypeMap<Partial<Record<"href" | "lg" | "md" | "sm" | "xl" | "xs", string>>>["props"], "display">;

export const AdaptiveTypography = ({ href, lg, md, sm, xl, xs, ...props }: Props): JSX.Element => <>
    <Typography {...props} {...(href !== undefined && { component: "a", href })} display={{
        lg: xs !== undefined && sm === undefined && md === undefined && lg === undefined ? "block" : "none",
        md: xs !== undefined && sm === undefined && md === undefined ? "block" : "none",
        sm: xs !== undefined && sm === undefined ? "block" : "none",
        xl: xs !== undefined && sm === undefined && md === undefined && lg === undefined && xl === undefined ? "block" : "none",
        xs: xs !== undefined ? "block" : "none"
    }}>{xs}</Typography>
    <Typography {...props} {...(href !== undefined && { component: "a", href })} display={{
        lg: sm !== undefined && md === undefined && lg === undefined ? "block" : "none",
        md: sm !== undefined && md === undefined ? "block" : "none",
        sm: sm !== undefined ? "block" : "none",
        xl: sm !== undefined && md === undefined && lg === undefined && xl === undefined ? "block" : "none",
        xs: "none"
    }}>{sm}</Typography>
    <Typography {...props} {...(href !== undefined && { component: "a", href })} display={{
        lg: md !== undefined && lg === undefined ? "block" : "none",
        md: md !== undefined ? "block" : "none",
        sm: "none",
        xl: md !== undefined && lg === undefined && xl === undefined ? "block" : "none",
        xs: "none"
    }}>{md}</Typography>
    <Typography {...props} {...(href !== undefined && { component: "a", href })} display={{
        lg: lg !== undefined ? "block" : "none",
        md: "none",
        sm: "none",
        xl: lg !== undefined && xl === undefined ? "block" : "none",
        xs: "none"
    }}>{lg}</Typography>
    <Typography {...props} {...(href !== undefined && { component: "a", href })} display={{
        lg: "none",
        md: "none",
        sm: "none",
        xl: xl !== undefined ? "block" : "none",
        xs: "none"
    }}>{xl}</Typography>
</>;