import CircularProgress from "@mui/material/CircularProgress";

export default function Loading(): JSX.Element {
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
