import type { IParameters } from "api/logo";
import md5 from "md5";

export const GRAVATAR_URL_ = (size: number): string => `https://www.gravatar.com/avatar/${md5("oathompsonjones@gmail.com")}?s=${size}`;
export const GRAVATAR_URL = GRAVATAR_URL_(2048);

export const LOGO_URL_ = (parameters: Partial<IParameters>): string => `/api/logo?${
    Object.entries(parameters).map(([key, value]) => (value === null ? "" : `${key}=${encodeURIComponent(value)}`))
        .join("&")}`;
export const LOGO_URL = LOGO_URL_({
    bottomTextColour: "6ACF65",
    fileType: "png",
    innerColour: "000000",
    innerLineColour: "bababa",
    middleTextColour: "bababa",
    outerColour: "094D1C",
    outerLineColour: "d4af37",
    pinColour: "808080",
    topTextColour: "6ACF65"
});
