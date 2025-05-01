// @ts-check
import { createTheme, responsiveFontSizes } from "@mui/material";
import { next } from "@million/lint";
import { withPigment } from "@pigment-css/nextjs-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        emotion: true,
        styledComponents: true,
    },
    // eslint-disable-next-line require-await
    async redirects() {
        return Object.entries({
            discord: "https://discord.com/users/310145094684639235",
            email: "mailto:oathompsonjones@gmail.com",
            facebook: "https://facebook.com/oathompsonjones",
            github: "https://github.com/oathompsonjones",
            instagram: "https://instagram.com/oathompsonjones",
            linkedin: "https://linkedin.com/in/oathompsonjones",
            stackoverflow: "https://stackoverflow.com/users/11840092/oathompsonjones",
            twitter: "https://x.com/oathompsonjones",
            x: "https://x.com/oathompsonjones",
        }).map(([source, destination]) => ({
            destination,
            permanent: true,
            source: `/${source}`,
        }));
    },
    typescript: { ignoreBuildErrors: true },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/u,
            use: ["@svgr/webpack"],
        });

        return config;
    },
};

const basePalette = {
    common: { black: "#121212", white: "#efefef" },
    primary: { main: "#1c7eea" },
    secondary: { main: "#ea881c" },
};

/** @type {import('@pigment-css/nextjs-plugin').PigmentOptions} */
const pigmentConfig = {
    theme: responsiveFontSizes(
        createTheme({
            colorSchemes: {
                dark: { palette: { background: { default: basePalette.common.black }, ...basePalette } },
                light: { palette: { background: { default: basePalette.common.white }, ...basePalette } },
            },
            components: {
                MuiDivider: { styleOverrides: { root: { margin: "1.25% 0" } } },
                MuiPaper: { styleOverrides: { root: { transition: "background-color 0.25s linear" } } },
            },
            cssVariables: { colorSchemeSelector: "class" },
            defaultColorScheme: "dark",
            typography: (palette) => ({
                ...Object.fromEntries(["h1", "h2", "h3", "h4", "h5", "h6"]
                    .map((key) => [key, { color: palette.primary.main }])),
                ...Object.fromEntries(["caption", "subtitle1", "subtitle2"]
                    .map((key) => [key, { color: palette.secondary.main }])),
            }),
            zIndex: { appBar: 10, fab: 10 },
        }),
        { breakpoints: ["xs", "sm", "md", "lg", "xl"] },
    ),
    transformLibraries: ["@mui/material"],
};

void next({ rsc: true })(withPigment(nextConfig, pigmentConfig));
export default next({ rsc: true })(nextConfig);
