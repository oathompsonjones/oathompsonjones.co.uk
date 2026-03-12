import md5 from "md5";

/**
 * Generates a Gravatar URL for my email address with the specified size.
 * @param size - The desired size of the Gravatar image in pixels.
 * @returns A Gravatar URL for my email address with the specified size.
 */
export function gravatarURL(size: number = 2048): string {
    const emailHash = md5("oathompsonjones@gmail.com");

    return `https://www.gravatar.com/avatar/${emailHash}?s=${size}`;
}
export const GRAVATAR_URL = gravatarURL();

/**
 * Calculates my current age.
 * @returns My current age in years.
 */
export function age(): number {
    const today: Date = new Date();
    const birthDate: Date = new Date(2003, 0, 2);

    return today.getMonth() - birthDate.getMonth() <= 0 && today.getDate() < birthDate.getDate()
        ? today.getFullYear() - birthDate.getFullYear() - 1
        : today.getFullYear() - birthDate.getFullYear();
}

export const title = (pageTitle: string): string => {
    const devPrefix = process.env.NODE_ENV === "production" ? "" : "[DEV] ";

    return `${devPrefix}Oliver Jones | ${pageTitle}`;
};

/**
 * Normalises Next.js search parameter values into a single value.
 * @param value - The search parameter value.
 * @returns A single value or null.
 */
export function getParam(value: string[] | string | undefined): string | null {
    if (value === undefined)
        return null;

    return Array.isArray(value) ? value[0] ?? null : value;
}
