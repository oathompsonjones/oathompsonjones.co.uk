import type { Metadata } from "next";
import { layout } from "components/layout";
import { pageMetadata } from "utils";

export const metadata: Metadata = pageMetadata(
    "Tic Tac Toe",
    "Play Tic Tac Toe against a friend in this free browser game by Oliver Jones.",
    "/arcade/tic-tac-toe",
);

export default layout();
