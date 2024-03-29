import { redirect } from "next/navigation";

/** Redirects to my GitHub profile. */
export function GET(): void {
    redirect("https://github.com/oathompsonjones");
}
