import type { Metadata } from "next";
import { layout } from "components/layout";
import { pageMetadata } from "utils";

export const metadata: Metadata = pageMetadata(
    "Connect 4",
    "Play Connect 4 against a friend in this free browser game by Oliver Jones.",
    "/arcade/connect-4",
);

export default layout();
