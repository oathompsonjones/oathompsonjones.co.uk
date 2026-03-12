// @ts-check
import { next } from "@million/lint";

/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        emotion: true,
        styledComponents: true,
    },
    images: { remotePatterns: [{ hostname: "www.gravatar.com", protocol: "https" }] },
    reactStrictMode: true,
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
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                "readline/promises": false,
            };
        }

        return config;
    },
};

export default next({ rsc: true })(nextConfig);
