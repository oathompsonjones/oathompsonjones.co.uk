import { Typography, TypographyTypeMap } from "@mui/material";
import { Component } from "react";

type Props = Omit<TypographyTypeMap<{
    href?: string;
    lg?: string;
    md?: string;
    sm?: string;
    xl?: string;
    xs?: string;
}>["props"], "display">;

export class AdaptiveTypography extends Component<Props> {
    public constructor(public readonly props: Props) {
        super(props);
    }

    public render(): JSX.Element {
        const { href, lg, md, sm, xl, xs } = this.props;
        const displayType = "block";

        return (
            <>
                <Typography {...this.props} {...(href !== undefined && { component: "a", href })} display={{
                    lg: xs !== undefined && sm === undefined && md === undefined && lg === undefined ? displayType : "none",
                    md: xs !== undefined && sm === undefined && md === undefined ? displayType : "none",
                    sm: xs !== undefined && sm === undefined ? displayType : "none",
                    xl: xs !== undefined && sm === undefined && md === undefined && lg === undefined && xl === undefined ? displayType : "none",
                    xs: xs !== undefined ? displayType : "none"
                }}>{xs}</Typography>
                <Typography {...this.props} {...(href !== undefined && { component: "a", href })} display={{
                    lg: sm !== undefined && md === undefined && lg === undefined ? displayType : "none",
                    md: sm !== undefined && md === undefined ? displayType : "none",
                    sm: sm !== undefined ? displayType : "none",
                    xl: sm !== undefined && md === undefined && lg === undefined && xl === undefined ? displayType : "none",
                    xs: "none"
                }}>{sm}</Typography>
                <Typography {...this.props} {...(href !== undefined && { component: "a", href })} display={{
                    lg: md !== undefined && lg === undefined ? displayType : "none",
                    md: md !== undefined ? displayType : "none",
                    sm: "none",
                    xl: md !== undefined && lg === undefined && xl === undefined ? displayType : "none",
                    xs: "none"
                }}>{md}</Typography>
                <Typography {...this.props} {...(href !== undefined && { component: "a", href })} display={{
                    lg: lg !== undefined ? displayType : "none",
                    md: "none",
                    sm: "none",
                    xl: lg !== undefined && xl === undefined ? displayType : "none",
                    xs: "none"
                }}>{lg}</Typography>
                <Typography {...this.props} {...(href !== undefined && { component: "a", href })} display={{
                    lg: "none",
                    md: "none",
                    sm: "none",
                    xl: xl !== undefined ? displayType : "none",
                    xs: "none"
                }}>{xl}</Typography>
            </>
        );
    }
}