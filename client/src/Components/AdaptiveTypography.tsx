import { Typography, TypographyTypeMap } from "@mui/material";

type Props = Omit<TypographyTypeMap<Partial<Record<"href" | "lg" | "md" | "sm" | "xl" | "xs", string>>>["props"], "display">;

export const AdaptiveTypography = (props: Props): JSX.Element => {
    const { href, lg, md, sm, xl, xs } = props;
    const displayType = "block";

    return <>
        <Typography {...props} {...(href !== undefined && { component: "a", href })} display={{
            lg: xs !== undefined && sm === undefined && md === undefined && lg === undefined ? displayType : "none",
            md: xs !== undefined && sm === undefined && md === undefined ? displayType : "none",
            sm: xs !== undefined && sm === undefined ? displayType : "none",
            xl: xs !== undefined && sm === undefined && md === undefined && lg === undefined && xl === undefined ? displayType : "none",
            xs: xs !== undefined ? displayType : "none"
        }}>{xs}</Typography>
        <Typography {...props} {...(href !== undefined && { component: "a", href })} display={{
            lg: sm !== undefined && md === undefined && lg === undefined ? displayType : "none",
            md: sm !== undefined && md === undefined ? displayType : "none",
            sm: sm !== undefined ? displayType : "none",
            xl: sm !== undefined && md === undefined && lg === undefined && xl === undefined ? displayType : "none",
            xs: "none"
        }}>{sm}</Typography>
        <Typography {...props} {...(href !== undefined && { component: "a", href })} display={{
            lg: md !== undefined && lg === undefined ? displayType : "none",
            md: md !== undefined ? displayType : "none",
            sm: "none",
            xl: md !== undefined && lg === undefined && xl === undefined ? displayType : "none",
            xs: "none"
        }}>{md}</Typography>
        <Typography {...props} {...(href !== undefined && { component: "a", href })} display={{
            lg: lg !== undefined ? displayType : "none",
            md: "none",
            sm: "none",
            xl: lg !== undefined && xl === undefined ? displayType : "none",
            xs: "none"
        }}>{lg}</Typography>
        <Typography {...props} {...(href !== undefined && { component: "a", href })} display={{
            lg: "none",
            md: "none",
            sm: "none",
            xl: xl !== undefined ? displayType : "none",
            xs: "none"
        }}>{xl}</Typography>
    </>;
};