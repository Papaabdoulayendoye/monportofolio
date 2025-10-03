import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Papa Abdoulaye Ndoye | Développeur Full-Stack",
  description:
    "Développeur Full-Stack Junior recherchant un stage de 6 mois (mars 2026). Spécialisé en Next.js, React, TypeScript et Spring Boot.",
  generator: "v0.app",
  keywords: ["Développeur Full-Stack", "Next.js", "React", "TypeScript", "Spring Boot", "Stage", "Valenciennes"],
  authors: [{ name: "Papa Abdoulaye Ndoye" }],
  openGraph: {
    title: "Papa Abdoulaye Ndoye | Développeur Full-Stack",
    description: "Développeur Full-Stack Junior recherchant un stage de 6 mois (mars 2026)",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Papa Abdoulaye Ndoye | Développeur Full-Stack",
    description: "Développeur Full-Stack Junior recherchant un stage de 6 mois (mars 2026)",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
