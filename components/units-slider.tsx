"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Home, Ruler, Bed, Trees, Waves } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type PropertyRecord = {
  id: string | number
  code: string
  type: string
  title: string
  description?: string
  image?: string
  surface?: string
  chambres?: string
  sallesBain?: string
  surfaceExterieure?: string
  disponibles?: string
  href?: string
  details?: Record<string, string> | string | null
  status?: string
  sold?: boolean
}

export default function UnitsSlider() {
  const [categories, setCategories] = useState<PropertyRecord[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const minSwipeDistance = 50

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || (typeof window !== "undefined" && window.location.hostname === "localhost" ? "http://localhost:3000" : "https://isb-immo-backend-latest.onrender.com")

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(`${API_BASE_URL}/properties`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
          signal: controller.signal,
        })
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`)
        }
        const data = await res.json()
        if (!isMounted) return
        const arr: PropertyRecord[] = Array.isArray(data) ? data : Array.isArray(data?.items) ? data.items : []
        setCategories(arr)
        setCurrentIndex(0)
      } catch (e: any) {
        if (e?.name === "AbortError") return
        setError("Impossible de charger les logements.")
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    load()
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [API_BASE_URL])

  useEffect(() => {
    if (currentIndex >= categories.length) setCurrentIndex(0)
  }, [categories.length, currentIndex])

  const resolveImageUrl = (src?: string) => {
    if (!src) return "/placeholder.jpg"
    if (src.startsWith("/uploads")) return `${API_BASE_URL}${src}`
    return src
  }
  const nextSlide = () => {
    const len = categories.length
    if (!len) return
    setCurrentIndex((prev) => (prev + 1) % len)
  }

  const prevSlide = () => {
    const len = categories.length
    if (!len) return
    setCurrentIndex((prev) => (prev - 1 + len) % len)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }
  }

  return (
    <section id="logements" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Votre futur chez-vous</h2>
          <p className="text-lg text-gray-600">
            Découvrez nos différents types de logements, du studio familial au duplex de prestige
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {loading && (
            <div className="text-center py-12 text-gray-500">Chargement des logements…</div>
          )}
          {!loading && error && (
            <div className="text-center py-12 text-red-600">{error}</div>
          )}
          {!loading && !error && categories.length === 0 && (
            <div className="text-center py-12 text-gray-500">Aucun logement disponible pour le moment.</div>
          )}
          {/* Main Slider */}
          {categories.length > 0 && (
          <div
            className="overflow-hidden rounded-none"
            ref={sliderRef}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {categories.map((category: PropertyRecord, index: number) => (
                <div key={category.id} className="w-full flex-shrink-0">
                  <Card className="rounded-none border-0 shadow-lg mx-2">
                    <div className="grid lg:grid-cols-2 gap-0">
                      {/* Image */}
                      <div className="relative h-96 lg:h-auto">
                        <div className="block w-full h-full">
                          <Image
                            src={resolveImageUrl(category.image)}
                            alt={category.title || "Catégorie"}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-custom-beige text-black rounded-none font-semibold shadow-sm">
                            {category.type}
                          </Badge>
                        </div>

                        {index === currentIndex && (
                          <>
                            <button
                              onClick={(e) => {
                                e.preventDefault()
                                prevSlide()
                              }}
                              className="absolute left-4 top-1/2 -translate-y-1/2 bg-custom-beige/90 hover:bg-custom-beige p-2 rounded-full shadow-lg transition-all duration-200 z-20 border border-white"
                            >
                              <ChevronLeft className="h-5 w-5 text-white" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.preventDefault()
                                nextSlide()
                              }}
                              className="absolute right-4 top-1/2 -translate-y-1/2 bg-custom-beige/90 hover:bg-custom-beige p-2 rounded-full shadow-lg transition-all duration-200 z-20 border border-white"
                            >
                              <ChevronRight className="h-5 w-5 text-white" />
                            </button>
                          </>
                        )}
                      </div>

                      {/* Content */}
                      <CardContent className="p-8 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                          {category.title}
                        </h3>
                        <p className="text-gray-600 mb-6">{category.description}</p>

                        {/* Specifications */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          {category.surface && (
                            <div className="flex items-center space-x-2">
                              <Ruler className="h-4 w-4 text-custom-beige" />
                              <span className="text-sm text-gray-600">{category.surface}</span>
                            </div>
                          )}
                          {category.chambres && (
                            <div className="flex items-center space-x-2">
                              <Bed className="h-4 w-4 text-custom-beige" />
                              <span className="text-sm text-gray-600">{category.chambres} chambres</span>
                            </div>
                          )}
                          {category.sallesBain && (
                            <div className="flex items-center space-x-2">
                              <Waves className="h-4 w-4 text-custom-beige" />
                              <span className="text-sm text-gray-600">{category.sallesBain} salles de bain</span>
                            </div>
                          )}
                          {category.surfaceExterieure && (
                            <div className="flex items-center space-x-2">
                              <Trees className="h-4 w-4 text-custom-beige" />
                              <span className="text-sm text-gray-600">{category.surfaceExterieure}</span>
                            </div>
                          )}
                          {category.disponibles && (
                            <div className="flex items-center space-x-2">
                              <Home className="h-4 w-4 text-custom-beige" />
                              <span className="text-sm text-gray-600">{category.disponibles} disponibles</span>
                            </div>
                          )}
                        </div>

                        {/* CTA Button */}
                        <Link href={`/logements/${category.code}`}>
                          <Button className="w-full rounded-none bg-custom-beige hover:bg-custom-beige text-white">
                            Découvrir les maisons
                          </Button>
                        </Link>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          )}

          {/* Dots Navigation */}
          {categories.length > 0 && (
            <div className="flex justify-center space-x-2 mt-8">
              {categories.map((_: PropertyRecord, index: number) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex ? "bg-custom-beige scale-110" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
