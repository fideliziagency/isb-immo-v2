import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "The Life Residence - Projet Résidentiel Haut de Gamme à La Soukra",
  description:
    "Découvrez The Life Residence, un projet résidentiel d'exception à Chotrana 3, La Soukra. 82 appartements, 2 duplex et 6 villas de très haut standing par ISB Immobilière Sodaprim Bouaziz. Livraison 2027.",
  keywords: [
    "The Life Residence",
    "appartements La Soukra",
    "immobilier haut de gamme Tunisie",
    "ISB Immobilière",
    "Sodaprim Bouaziz",
    "Chotrana 3",
    "appartements neufs Tunisie",
    "duplex La Soukra",
    "villas La Soukra",
    "investissement immobilier Tunisie",
  ].join(", "),
  authors: [{ name: "ISB Immobilière Sodaprim Bouaziz" }],
  creator: "ISB Immobilière Sodaprim Bouaziz",
  publisher: "ISB Immobilière Sodaprim Bouaziz",
  robots: "index, follow",
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    'geo.region': 'TN-11',
    'geo.placename': 'La Soukra, Tunisie',
    'geo.position': '36.8667;10.2167',
    'ICBM': '36.8667, 10.2167',
  },
  openGraph: {
    type: "website",
    locale: "fr_TN",
    url: "https://theliferesidence.com",
    siteName: "The Life Residence",
    title: "The Life Residence - Projet Résidentiel Haut de Gamme à La Soukra",
    description:
      "Découvrez The Life Residence, un projet résidentiel d'exception à La Soukra. 82 appartements, 2 duplex et 6 villas de très haut standing.",
    images: [
      {
        url: "/luxury-residential-exterior.png",
        width: 1200,
        height: 630,
        alt: "The Life Residence - Vue extérieure du complexe résidentiel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Life Residence - Projet Résidentiel Haut de Gamme",
    description: "82 appartements, 2 duplex et 6 villas de très haut standing à La Soukra",
    images: ["/luxury-residential-exterior.png"],
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#B6B09F",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
        <Footer />
      </body>
    </html>
  )
}
