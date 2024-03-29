import { redirect } from "next/navigation";

/** Redirects to my Facebook profile. */
export function GET(): void {
    redirect("https://facebook.com/oathompsonjones");
}
