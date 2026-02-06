"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"

const API_BASE_URL =
  (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_API_BASE_URL) ||
  (typeof window !== "undefined" && window.location.hostname === "localhost" ? "http://localhost:3000" : "https://isb-immo-backend-latest.onrender.com")

function resolveImageUrl(src?: string): string {
  if (!src) return ""
  if (/^https?:\/\//i.test(src)) return src
  if (src.startsWith("/uploads")) return `${API_BASE_URL}${src}`
  return src
}

type Property = {
  id: number
  code: string
  type: string
  title: string
  sold?: boolean
}

type CarouselImage = {
  id: number
  filename: string
  path: string
  title?: string
}

type House = {
  id: number
  code: string
  name: string
  description: string
  mainImage?: string
  salesStatus: "available" | "sold" | "reserved"
  address?: string
  totalSurface?: string
  price?: string
  details?: Record<string, string>
  properties?: Property[]
  carouselImages?: CarouselImage[]
}

const statusLabel: Record<string, { label: string; color: string }> = {
  available: { label: "Disponible", color: "bg-green-100 text-green-800 border-green-300" },
  sold: { label: "Vendue", color: "bg-red-100 text-red-800 border-red-300" },
  reserved: { label: "Réservée", color: "bg-amber-100 text-amber-800 border-amber-300" },
}

export default function HouseDetailPage() {
  const params = useParams()
  const houseCode = params?.houseCode as string

  const [house, setHouse] = useState<House | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (!houseCode) return

    const fetchHouse = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(`${API_BASE_URL}/houses/code/${houseCode}`)
        if (!res.ok) throw new Error("Maison non trouvée")
        const data = (await res.json()) as House
        setHouse(data)
      } catch (e: any) {
        setError(e.message || "Erreur lors du chargement")
      } finally {
        setLoading(false)
      }
    }

    fetchHouse()
  }, [houseCode])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Chargement...</p>
      </div>
    )
  }

  if (error || !house) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error || "Maison non trouvée"}</p>
      </div>
    )
  }

  const images =
    house.carouselImages && house.carouselImages.length > 0
      ? house.carouselImages
      : house.mainImage
        ? [{ id: -1, filename: "main", path: house.mainImage, title: house.name }]
        : []
  const currentImage = images[currentSlide]
  const status = statusLabel[house.salesStatus] || statusLabel.available

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, images.length))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.max(1, images.length)) % Math.max(1, images.length))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Carousel */}
      <div className="relative w-full bg-white">
        {images.length > 0 ? (
          <>
            <div className="relative h-96 md:h-[500px] bg-gray-200 overflow-hidden">
              {currentImage ? (
                <img
                  src={resolveImageUrl(currentImage.path)}
                  alt={currentImage.title || "Carousel image"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-300">
                  <span className="text-gray-600">Image non disponible</span>
                </div>
              )}

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                    aria-label="Image précédente"
                  >
                    ❮
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                    aria-label="Image suivante"
                  >
                    ❯
                  </button>
                </>
              )}

              {/* Slide Indicators */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2 rounded-full transition ${
                        idx === currentSlide ? "bg-white w-8" : "bg-white/50 w-2"
                      }`}
                      aria-label={`Aller à l'image ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="bg-white px-6 py-2 text-center text-sm text-gray-600 border-b">
                {currentSlide + 1} / {images.length}
              </div>
            )}
          </>
        ) : (
          <div className="h-96 md:h-[500px] bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Pas d'images disponibles</span>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{house.name}</h1>
              <p className="text-lg text-gray-600 mb-4">{house.address}</p>
            </div>
            <div className={`px-4 py-2 border rounded-lg ${status.color}`}>
              <span className="font-semibold">{status.label}</span>
            </div>
          </div>

          {/* Key Details */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-6 border-y border-gray-200">
            {house.totalSurface && (
              <div>
                <p className="text-sm text-gray-600">Surface</p>
                <p className="text-2xl font-bold text-gray-900">{house.totalSurface}</p>
              </div>
            )}
            {house.price && (
              <div>
                <p className="text-sm text-gray-600">Prix</p>
                <p className="text-2xl font-bold text-gray-900">{house.price}</p>
              </div>
            )}
            {house.properties && house.properties.length > 0 && (
              <div>
                <p className="text-sm text-gray-600">Biens inclus</p>
                <p className="text-2xl font-bold text-gray-900">{house.properties.length}</p>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {house.description && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">À propos</h2>
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
              {house.description}
            </p>
          </div>
        )}

        {/* Details */}
        {house.details && Object.keys(house.details).length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Caractéristiques</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(house.details).map(([key, value]) => (
                <div key={key} className="flex items-start gap-4 p-4 bg-white border rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 font-semibold capitalize">{key.replace(/_/g, " ")}</p>
                    <p className="text-gray-900">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Properties Included */}
        {house.properties && house.properties.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Biens inclus</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {house.properties.map((prop) => (
                <div key={prop.id} className="p-4 bg-white border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">{prop.title}</p>
                      <p className="text-sm text-gray-600">{prop.type} · {prop.code}</p>
                    </div>
                    {prop.sold && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 border border-red-300 rounded text-xs font-semibold">
                        Vendu
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-custom-beige text-white p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">Intéressé par cette propriété ?</h3>
          <p className="text-lg mb-6 opacity-95">Contactez-nous pour plus d'informations ou pour fixer une visite.</p>
          <a
            href="/#contact"
            className="inline-block px-8 py-3 bg-white text-custom-beige font-bold rounded-lg hover:bg-gray-100 transition"
          >
            Nous Contacter
          </a>
        </div>
      </div>
    </div>
  )
}
