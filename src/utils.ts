import md5 from "md5";

export const gravatarURL = (size: number): string => `https://www.gravatar.com/avatar/${md5("oathompsonjones@gmail.com")}?s=${size}`;
export const GRAVATAR_URL = gravatarURL(2048);

export const age = (): number => {
    const today: Date = new Date();
    const birthDate: Date = new Date(2003, 0, 2);

    return today.getMonth() - birthDate.getMonth() <= 0 && today.getDate() < birthDate.getDate()
        ? today.getFullYear() - birthDate.getFullYear() - 1
        : today.getFullYear() - birthDate.getFullYear();
};
