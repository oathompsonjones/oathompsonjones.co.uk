import { redirect } from "next/navigation";

/** Redirects to my Twitter profile. */
export function GET(): void {
    redirect("https://twitter.com/oathompsonjones");
}
