import type { ReactNode } from "react";
import type { TypographyProps } from "@mui/material";
import { Typography } from "@mui/material";

/**
 * Contains the legal text from Google about Recaptcha Ts and Cs.
 * @param props - The props from the MUI Typography component.
 * @returns The legal text from Google.
 */
export function Recaptcha(props: TypographyProps): ReactNode {
    return (
        <Typography {...props}>
            This site is protected by reCAPTCHA and the Google <Link href="https://policies.google.com/privacy">
                Privacy Policy</Link> and <Link href="https://policies.google.com/terms">
                Terms of Service</Link> apply.
        </Typography>
    );
}
