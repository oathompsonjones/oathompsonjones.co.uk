import { CircularProgress } from "@mui/material";

export default function Loading(): React.ReactElement {
    return (
        <div style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            minHeight: "100%"
        }}
        >
            <CircularProgress size="10%" />
        </div>
    );
}
