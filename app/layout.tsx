import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "The Life Residence - Résidence de Luxe à La Soukra | Sodaprim Immobilière",
  description:
    "Découvrez The Life Residence, un projet résidentiel d'exception à Chotrana 3, La Soukra. 84 appartements et 8 duplex de très haut standing par Sodaprim Immobilière.",
  keywords: "immobilier, résidence, La Soukra, Chotrana 3, appartements, duplex, Sodaprim, Tunisie, haut standing",
  openGraph: {
    title: "The Life Residence - Résidence de Luxe à La Soukra",
    description: "Un art de vivre exceptionnel à Chotrana 3. 84 appartements et 8 duplex de très haut standing.",
    type: "website",
    locale: "fr_FR",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
