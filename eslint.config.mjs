import createConfig from "@oathompsonjones/eslint-config";

export default [
    ...createConfig("./tsconfig.json", "src/app/(pages)/"),
    {
        rules: {
            "require-unicode-regexp": "off"
        }
    }
];
