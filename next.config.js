/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    // PWA config
    headers: async() => {
        return [{
            source: "/sw.js",
            headers: [{
                key: "Cache-Control",
                value: "public, max-age=0, must-revalidate",
            }, ],
        }, ]
    },
}

module.exports = nextConfig