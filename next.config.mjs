/** @type {import('next').NextConfig} */
export default {
    compiler: {
        emotion: true,
        styledComponents: true,
    },
    redirects() {
        return Object.entries({
            discord: "https://discord.com/users/310145094684639235",
            email: "mailto:oathompsonjones@gmail.com",
            facebook: "https://facebook.com/oathompsonjones",
            github: "https://github.com/oathompsonjones",
            instagram: "https://instagram.com/oathompsonjones",
            linkedin: "https://linkedin.com/in/oathompsonjones",
            stackoverflow: "https://stackoverflow.com/users/11840092/oathompsonjones",
            twitter: "https://twitter.com/oathompsonjones",
            x: "https://x.com/oathompsonjones",
        }).map(([source, destination]) => ({
            destination,
            permanent: true,
            source: `/${source}`,
        }));
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/u,
            use: ["@svgr/webpack"],
        });

        return config;
    },
};
