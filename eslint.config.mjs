import createConfig from "@oathompsonjones/eslint-config";

export default [
    ...createConfig("./tsconfig.json"),
    {
        rules: {
            "require-unicode-regexp": "off",
            "@next/next/no-html-link-for-pages": ["error", "src/app/(pages)"]
        }
    }
];
