"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Bed, Bath, Car, Home } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const units = [
  {
    id: "s1",
    title: "Appartement S+1",
    subtitle: "2 Pièces - Complexe R+2",
    builtUpArea: "40 - 63 m²",
    commonAreas: "9 - 10 m²",
    sellableArea: "46 - 76 m²",
    privateGarden: "12 - 26 m²",
    bedrooms: "1 chambre",
    bathrooms: "1 salle de bain",
    parking: "1 place",
    available: "15 unités",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/S%2B1%201-oF9pksbuCNn1rjYgeASHAnMIECGBr8.jpeg",
    features: [
      "Cuisine équipée haut de gamme",
      "Climatisation réversible",
      "Jardin privé (RDC uniquement)",
      "Interphone vidéo",
      "Éclairage LED",
    ],
    link: "/logements/s1",
    color: "bg-blue-50 border-blue-200",
    hasGarden: true,
    gardenNote: "RDC uniquement",
  },
  {
    id: "s2",
    title: "Appartement S+2",
    subtitle: "3 Pièces",
    builtUpArea: "77 - 122 m²",
    commonAreas: "13 - 20 m²",
    sellableArea: "46 - 142 m²",
    privateGarden: "12 - 58 m²",
    coveredTerrace: "5 - 12 m²",
    bedrooms: "2 chambres",
    bathrooms: "1 salle de bain",
    parking: "1 place",
    available: "45 unités",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bf31d901-e50e-474a-acd3-9216dead7c74.jpg-Xtf6g5lHI0RoVHzDN398EvGV7gIT9D.jpeg",
    features: [
      "Cuisine avec îlot central",
      "Climatisation multi-zones",
      "Jardin privé (selon unité)",
      "Terrasse couverte (selon unité)",
      "Dressing intégré",
    ],
    link: "/logements/s2",
    color: "bg-green-50 border-green-200",
    hasGarden: true,
    gardenNote: "Selon unité",
    hasTerrace: true,
    terraceNote: "Selon unité",
  },
  {
    id: "s3",
    title: "Appartement S+3",
    subtitle: "4 Pièces",
    builtUpArea: "117 - 171 m²",
    commonAreas: "19 - 29 m²",
    sellableArea: "157 - 204 m²",
    privateGarden: "12 - 175 m²",
    coveredTerrace: "4 - 18 m²",
    bedrooms: "3 chambres",
    bathrooms: "2 salles de bain",
    parking: "1 place",
    available: "24 unités",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/S%2B3%202-roOpfdzL8E9DedHBBhZtuEH78EkaFL.jpeg",
    features: [
      "Suite parentale avec dressing",
      "Grand jardin privé (selon unité)",
      "Terrasse couverte (selon unité)",
      "Cuisine avec îlot central",
      "Buanderie équipée",
    ],
    link: "/logements/s3",
    color: "bg-purple-50 border-purple-200",
    hasGarden: true,
    gardenNote: "Selon unité",
    hasTerrace: true,
    terraceNote: "Selon unité",
  },
  {
    id: "duplex",
    title: "Duplex",
    subtitle: "Prestige 2 Niveaux",
    builtUpArea: "296 - 300 m²",
    commonAreas: "50 - 51 m²",
    sellableArea: "346 - 351 m²",
    privateGarden: "58 - 163 m²",
    privateBasement: "58 - 196 m²",
    bedrooms: "3-4 chambres",
    bathrooms: "2-3 salles de bain",
    parking: "2 places",
    available: "8 unités",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/821b40bc-9d0e-4fcd-b7c6-00076f962d7c.jpg-HKdZzp548p9gTFBft72EHd93T7d1Hc.jpeg",
    features: [
      "Cheminée design",
      "Jardin privé inclus",
      "Sous-sol privé",
      "Domotique intégrée",
      "Services conciergerie",
    ],
    link: "/logements/duplex",
    color: "bg-custom-beige-light border-custom-beige",
    hasGarden: true,
    hasBasement: true,
  },
]

interface UnitsSliderProps {
  onReserveClick?: () => void
}

export default function UnitsSlider({ onReserveClick }: UnitsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % units.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + units.length) % units.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="relative w-full">
      {/* Slider Container */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {units.map((unit, index) => (
            <div key={unit.id} className="w-full flex-shrink-0 px-4">
              <Card className={`rounded-none border-2 shadow-lg overflow-hidden ${unit.color}`}>
                <div className="grid lg:grid-cols-2 gap-0 min-h-[600px] lg:min-h-[700px]">
                  {/* Floor Plan */}
                  <div className="relative h-full min-h-[600px] lg:min-h-[700px]">
                    <Image
                      src={unit.image || "/placeholder.svg"}
                      alt={`Vue ${unit.title}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-custom-beige text-white rounded-none">{unit.available} Disponibles</Badge>
                    </div>
                  </div>

                  {/* Unit Details */}
                  <CardContent className="p-8 flex flex-col justify-between h-full">
                    <div>
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{unit.title}</h3>
                        <p className="text-lg text-gray-600 mb-4">{unit.subtitle}</p>
                      </div>

                      {/* Specifications */}
                      <div className="grid grid-cols-1 gap-4 mb-6">
                        <div className="bg-white/50 p-4 rounded-none">
                          <h5 className="font-semibold text-gray-900 mb-3">Surfaces Détaillées</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Surface construite:</span>
                              <span className="font-semibold text-gray-900">{unit.builtUpArea}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Parties communes:</span>
                              <span className="font-semibold text-gray-900">{unit.commonAreas}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Surface vendable:</span>
                              <span className="font-semibold text-custom-beige">{unit.sellableArea}</span>
                            </div>
                            {unit.hasGarden && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Jardin privé:</span>
                                <span className="font-semibold text-green-600">
                                  {unit.privateGarden}
                                  {unit.gardenNote && (
                                    <span className="text-xs text-gray-500 ml-1">({unit.gardenNote})</span>
                                  )}
                                </span>
                              </div>
                            )}
                            {unit.hasTerrace && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Terrasse couverte:</span>
                                <span className="font-semibold text-blue-600">
                                  {unit.coveredTerrace}
                                  {unit.terraceNote && (
                                    <span className="text-xs text-gray-500 ml-1">({unit.terraceNote})</span>
                                  )}
                                </span>
                              </div>
                            )}
                            {unit.hasBasement && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Sous-sol privé:</span>
                                <span className="font-semibold text-purple-600">{unit.privateBasement}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2">
                            <Bed className="h-5 w-5 text-custom-beige" />
                            <div>
                              <div className="text-sm text-gray-600">Chambres</div>
                              <div className="font-semibold text-gray-900">{unit.bedrooms}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Bath className="h-5 w-5 text-custom-beige" />
                            <div>
                              <div className="text-sm text-gray-600">Salle de bain</div>
                              <div className="font-semibold text-gray-900">{unit.bathrooms}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Car className="h-5 w-5 text-custom-beige" />
                            <div>
                              <div className="text-sm text-gray-600">Parking</div>
                              <div className="font-semibold text-gray-900">{unit.parking}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Home className="h-5 w-5 text-custom-beige" />
                            <div>
                              <div className="text-sm text-gray-600">Disponibles</div>
                              <div className="font-semibold text-gray-900">{unit.available}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Caractéristiques principales</h4>
                        <ul className="space-y-2">
                          {unit.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-custom-beige rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700 text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="space-y-3">
                      <Button
                        className="w-full rounded-none bg-white text-custom-beige border-2 border-custom-beige hover:bg-custom-beige hover:text-white transition-colors duration-300"
                        onClick={onReserveClick}
                      >
                        <Home className="h-4 w-4 mr-2" />
                        Réserver sur Plan
                      </Button>
                      <Link href={unit.link}>
                        <Button
                          variant="outline"
                          className="w-full rounded-none border-custom-beige text-custom-beige hover:bg-custom-beige hover:text-white bg-transparent"
                        >
                          Voir les Détails
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 z-10"
        aria-label="Unité précédente"
      >
        <ChevronLeft className="h-6 w-6 text-gray-700" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 z-10"
        aria-label="Unité suivante"
      >
        <ChevronRight className="h-6 w-6 text-gray-700" />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-2 mt-6">
        {units.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex ? "bg-custom-beige scale-110" : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Aller à l'unité ${index + 1}`}
          />
        ))}
      </div>

      {/* Unit Names Below Dots */}
      <div className="flex justify-center mt-4">
        <div className="text-center">
          <h4 className="text-lg font-semibold text-gray-900">{units[currentIndex].title}</h4>
          <p className="text-sm text-gray-600">
            {units[currentIndex].surface} • {units[currentIndex].available}
          </p>
        </div>
      </div>
    </div>
  )
}
