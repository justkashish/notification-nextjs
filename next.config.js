/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
        config.output.chunkFilename = 'static/chunks/[name].[contenthash].js';
        return config;
    },
    headers: async() => {
        return [{
            source: "/sw.js",
            headers: [{
                    key: "Cache-Control",
                    value: "public, max-age=0, must-revalidate",
                },
                {
                    key: "Service-Worker-Allowed",
                    value: "/",
                },
            ],
        }, ];
    },
};

module.exports = nextConfig;