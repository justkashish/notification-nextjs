export default function manifest() {
    return {
        name: "DiGiLABS Notification App",
        short_name: "DiGiLABS",
        description: "A notification app for DiGiLABS assignment",
        start_url: "/",
        display: "standalone",
        background_color: "#1E0B41",
        theme_color: "#1E0B41",
        icons: [{
                src: "/notification-icon.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "any maskable",
            },
            {
                src: "/notification-icon.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any maskable",
            },
        ],
    }
}