import { redirect } from "next/navigation";

/** Redirects to my Discord profile. */
export function GET(): void {
    redirect("https://discord.com/users/310145094684639235");
}
