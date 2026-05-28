import type { Metadata } from "next"
import { Inter, Syne } from "next/font/google"
import "./globals.css"
import { SessionProvider } from "@/components/providers/session-provider"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "HomeX — Find Properties Across Ghana",
  description:
    "Browse verified properties for rent and sale across Accra, Kumasi, Tema, and beyond.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${syne.variable}`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}