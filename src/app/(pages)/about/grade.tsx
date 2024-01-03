import { Stack, Typography } from "@mui/material";
import Spacer from "components/spacer";

export default function Grade({ grade, subject }: { readonly grade: string; readonly subject: string; }): React.ReactElement {
    return (
        <Stack alignItems="center" direction="row" flex={1} sx={{ p: "0 5%" }}>
            <Typography>{subject}</Typography>
            <Spacer />
            <Typography>{grade}</Typography>
        </Stack>
    );
}
