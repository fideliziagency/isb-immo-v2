"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Home, Ruler, MapPin, ArrowLeft } from "lucide-react"

const API_BASE_URL =
  (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_API_BASE_URL) ||
  (typeof window !== "undefined" && window.location.hostname === "localhost" ? "http://localhost:3000" : "https://isb-immo-backend-latest.onrender.com")

function resolveImageUrl(src?: string): string {
  if (!src) return "/placeholder.jpg"
  if (/^https?:\/\//i.test(src)) return src
  if (src.startsWith("/uploads")) return `${API_BASE_URL}${src}`
  return src
}

type Category = {
  id: number
  code: string
  type: string
  title: string
  description: string
  image?: string
}

type House = {
  id: number
  code: string
  name: string
  description: string
  mainImage?: string
  salesStatus: "available" | "sold" | "reserved"
  location?: string
  price?: string
  surfaceTotalDup?: string
  category?: Category
}

const statusLabel: Record<string, { label: string; color: string }> = {
  available: { label: "Disponible", color: "bg-green-100 text-green-800 border-green-300" },
  sold: { label: "Vendue", color: "bg-red-100 text-red-800 border-red-300" },
  reserved: { label: "Réservée", color: "bg-amber-100 text-amber-800 border-amber-300" },
}

export default function CategoryHousesPage() {
  const params = useParams()
  const categoryCode = params?.categoryCode as string

  const [category, setCategory] = useState<Category | null>(null)
  const [houses, setHouses] = useState<House[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!categoryCode) return

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch category details
        const categoryRes = await fetch(`${API_BASE_URL}/properties`)
        if (!categoryRes.ok) throw new Error("Erreur lors du chargement")
        const categoriesData = await categoryRes.json()
        const categoryItem = Array.isArray(categoriesData) 
          ? categoriesData.find((c: Category) => c.code === categoryCode)
          : null
        
        if (!categoryItem) throw new Error("Catégorie non trouvée")
        setCategory(categoryItem)

        // Fetch all houses and filter by category
        const housesRes = await fetch(`${API_BASE_URL}/houses`)
        if (!housesRes.ok) throw new Error("Erreur lors du chargement")
        const housesData = await housesRes.json()
        const allHouses = Array.isArray(housesData) ? housesData : []
        
        // Filter houses by category ID
        const filteredHouses = allHouses.filter((h: House) => h.category?.code === categoryCode)
        setHouses(filteredHouses)
      } catch (e: any) {
        setError(e.message || "Erreur lors du chargement")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [categoryCode])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Chargement...</p>
      </div>
    )
  }

  if (error || !category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "Catégorie non trouvée"}</p>
          <Link href="/">
            <Button className="rounded-none bg-custom-beige hover:bg-custom-beige text-white">
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-700 hover:text-custom-beige">
            <ArrowLeft className="h-5 w-5" />
            <span>Retour à l'accueil</span>
          </Link>
        </div>
      </header>

      {/* Category Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {category.image && (
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                  src={resolveImageUrl(category.image)}
                  alt={category.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <Badge className="bg-custom-beige text-black rounded-none mb-4">{category.type}</Badge>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{category.title}</h1>
              <p className="text-lg text-gray-600">{category.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Houses Grid */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Maisons disponibles ({houses.length})
        </h2>

        {houses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Aucune maison disponible dans cette catégorie pour le moment.</p>
            <Link href="/">
              <Button className="rounded-none bg-custom-beige hover:bg-custom-beige text-white">
                Découvrir d'autres catégories
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {houses.map((house) => (
              <Link key={house.id} href={`/logements/${house.code}`}>
                <div className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                  {/* House Image */}
                  <div className="relative h-48 sm:h-52 md:h-56">
                    <Image
                      src={resolveImageUrl(house.mainImage)}
                      alt={house.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className={`rounded-none font-semibold shadow-sm border ${statusLabel[house.salesStatus]?.color || ""}`}>
                        {statusLabel[house.salesStatus]?.label || "N/A"}
                      </Badge>
                    </div>
                  </div>

                  {/* House Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Home className="h-4 w-4 text-custom-beige" />
                      <span className="text-sm text-gray-500">{house.code}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-custom-beige transition-colors">
                      {house.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{house.description}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      {house.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-custom-beige" />
                          <span>{house.location}</span>
                        </div>
                      )}
                      {house.surfaceTotalDup && (
                        <div className="flex items-center gap-1">
                          <Ruler className="h-4 w-4 text-custom-beige" />
                          <span>{house.surfaceTotalDup}</span>
                        </div>
                      )}
                    </div>

                    {house.price && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-lg font-bold text-custom-beige">{house.price}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
