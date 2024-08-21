// @ts-check
import createConfig from "@oathompsonjones/eslint-config";

export default createConfig({
    useNextJS: true,
    pagesDirectory: "src/app/(pages)",
    configs: [
        { ignores: ["next-env.d.ts"] },
        { rules: { "require-unicode-regexp": "off" } },
    ],
});
