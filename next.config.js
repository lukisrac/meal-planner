/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "picsum.photos" },
            { protocol: "https", hostname: "lh3.googleusercontent.com" },
            { protocol: "https", hostname: "www.gravatar.com" },
            { protocol: "https", hostname: "storage.lukis.dev" },
        ],
    },
};

export default config;
