/** @type {import('next').NextConfig} */
export default {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });
        return config;
    },
    compiler: {
        emotion: true,
        styledComponents: true
    },
    experimental: { appDir: true }
};
