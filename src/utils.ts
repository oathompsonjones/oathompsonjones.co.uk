import type { Parameters } from "api/logo";
import md5 from "md5";

export const gravatarURL = (size: number): string => `https://www.gravatar.com/avatar/${md5("oathompsonjones@gmail.com")}?s=${size}`;
export const GRAVATAR_URL = gravatarURL(2048);

export const logoURL = (parameters: Partial<Parameters>): string => `/api/logo?${
    Object.entries(parameters).map(([key, value]) => (value === null ? "" : `${key}=${encodeURIComponent(value)}`))
        .join("&")}`;
export const LOGO_URL = logoURL({
    bottomTextColour: "6ACF65",
    fileType: "png",
    innerColour: "000000",
    innerLineColour: "bababa",
    middleTextColour: "bababa",
    outerColour: "094D1C",
    outerLineColour: "d4af37",
    pinColour: "808080",
    topTextColour: "6ACF65",
});

export const age = (): number => {
    const today: Date = new Date();
    const birthDate: Date = new Date(2003, 0, 2);

    return today.getMonth() - birthDate.getMonth() <= 0 && today.getDate() < birthDate.getDate()
        ? today.getFullYear() - birthDate.getFullYear() - 1
        : today.getFullYear() - birthDate.getFullYear();
};
