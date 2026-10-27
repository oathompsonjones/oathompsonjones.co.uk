import type { Metadata } from "next";
import { layout } from "components/layout";
import { pageMetadata } from "utils";

export const metadata: Metadata = pageMetadata(
    "Arcade",
    "Play browser-based games including Tic Tac Toe and Connect 4, built by software developer Oliver Jones.",
    "/arcade",
);

export default layout();
