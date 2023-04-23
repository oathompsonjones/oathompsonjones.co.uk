import md5 from "md5";

export const AVATAR_URL_ = (n: number): string => `https://www.gravatar.com/avatar/${md5("oathompsonjones@gmail.com")}?s=${n}`;
export const AVATAR_URL = AVATAR_URL_(2048);
