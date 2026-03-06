import type { AriaAttributes, DOMAttributes } from "react";

/* eslint-disable
    @typescript-eslint/consistent-type-definitions,
    @typescript-eslint/consistent-indexed-object-style,
    @typescript-eslint/ban-types */
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

        type ClassName =
            | "breakout-left"
            | "breakout-right"
            | "breakout"
            | "edge"
            | "full-width"
            | "wrapper"
            | (string & {});

        // Allows for autocompletion of the className prop with the defined layout classes.
        interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
            className?: ClassName;
        }
    }

    namespace NodeJS {
        interface ProcessEnv {
            INSTAGRAM_ACCESS_TOKEN: string;
            INSTAGRAM_ACCESS_TOKEN_REFRESH_AT: string;
            INSTAGRAM_CLIENT_ID: string;
            INSTAGRAM_CLIENT_SECRET: string;
            INSTAGRAM_REDIRECT_URI: string;
            INSTAGRAM_USER_ID: string;
            GITHUB_TOKEN: string;
            EMAIL_SERVICE: string;
            EMAIL_AUTH_USER: string;
            EMAIL_AUTH_PASS: string;
            NEXT_PUBLIC_RECAPTCHA_KEY: string;
            RECAPTCHA_SECRET: string;
        }
    }
}
