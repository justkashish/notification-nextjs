
import "./styles.css"
export const metadata = {
  title: "DiGiLABS Notification App",
  description: "A notification app for DiGiLABS assignment",
}

export const viewport = {
  themeColor: "#1E0B41",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

