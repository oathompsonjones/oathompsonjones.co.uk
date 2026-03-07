import type { Metadata } from "next";
import { layout } from "components/layout";
import { title } from "utils";

export const metadata: Metadata = { title: title("Articles - Coming Soon") };

export default layout({ className: "wrapper" });
