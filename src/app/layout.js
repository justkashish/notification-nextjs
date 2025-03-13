import "../styles/main.css"

export const metadata = {
  title: "DiGiLABS Notification App",
  description: "A notification app for DiGiLABS assignment",
  manifest: "/manifest.json",
  themeColor: "#1E0B41",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "DiGiLABS App",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  )
}


