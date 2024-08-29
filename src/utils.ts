/*! import type { SxProps } from "@mui/system";
import type { Theme } from "@mui/material"; */
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

/* eslint-disable
    @typescript-eslint/consistent-type-definitions,
    @typescript-eslint/no-namespace,
    @typescript-eslint/consistent-indexed-object-style */
declare global {
    namespace React {
        // Allows the use of the sx prop on any HTML element.
        /*! interface HTMLAttributes<T> {
            sx?: SxProps<Theme>;
        }

        interface SVGProps<T> {
            sx?: SxProps<Theme>;
        } */

        // Allows for the use of custom CSS variables.
        interface CSSProperties {
            [Var: `--${string}`]: string;
        }
    }
}
