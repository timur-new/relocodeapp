import type { Metadata } from "next"
import "../styles/globals.css"

export const metadata: Metadata = {
  title: "Immigration Self-Petitioning",
  description: "Self-petitioning dashboard and application builder",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}