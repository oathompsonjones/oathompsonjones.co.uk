import { redirect } from "next/navigation";

/** Redirects to my Stack Overflow profile. */
export function GET(): void {
    redirect("https://stackoverflow.com/users/11840092/oathompsonjones");
}
