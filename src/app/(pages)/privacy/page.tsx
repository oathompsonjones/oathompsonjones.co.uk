import Link from "next/link";
import { Typography } from "@mui/material";

/**
 * This is the privacy policy.
 *
 * @returns {JSX.Element} The privacy policy.
 */
export default function Privacy(): JSX.Element {
    return (
        <>
            <Typography variant="h1">
                Privacy Policy
            </Typography>
            <Typography variant="h4">
                What information do I collect?
            </Typography>
            <Typography>
                I may collect users names and email addresses.
            </Typography>
            <br />
            <Typography variant="h4">
                How do I collect the information?
            </Typography>
            <Typography>
                Information is only shared with me if a user submits the form found <Link href="/contact">here</Link>.
            </Typography>
            <br />
            <Typography variant="h4">
                Why do I collect the information?
            </Typography>
            <Typography>
                This information is collected to allow me to respond to any enquiries.
            </Typography>
            <br />
            <Typography variant="h4">
                Why do I share the information with?
            </Typography>
            <Typography>
                This information is not shared with any other parties.
            </Typography>
        </>
    );
}
