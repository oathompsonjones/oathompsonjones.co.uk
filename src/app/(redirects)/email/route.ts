import { redirect } from "next/navigation";

/** Redirects to my email address. */
export function GET(): void {
    redirect("mailto:oathompsonjones@gmail.com");
}
