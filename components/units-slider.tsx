"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Home, Ruler, Bed, Bath, Trees, Waves } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const properties = [
  {
    id: "s1",
    type: "S+1",
    title: "Appartement S+1",
    description: "Idéal pour jeunes couples ou investissement locatif",
    image: "/s1-modern-living-space.jpeg",
    surface: "48 à 77 m²",
    chambres: "1 chambre",
    sallesBain: "1 salle de bain",
    surfaceExterieure: "Jardin privé 0-28 m²",
    disponibles: "30 unités",
    href: "/logements/s1",
    details: {
      salon: "Salon/séjour",
      cuisine: "Cuisine équipée",
      chambre: "Chambre principale",
      salleBain: "Salle de bain complète",
      jardin: "Jardin privé (disponible uniquement pour certains appartements)",
    },
  },
  {
    id: "s2",
    type: "S+2",
    title: "Appartement S+2",
    description: "Parfait pour les familles avec enfants",
    image: "/s2-modern-living-room-new.png",
    surface: "87-136 m²",
    chambres: "2 chambres",
    sallesBain: "1 salle de bain",
    surfaceExterieure: "Jardin privé 0 à 53 m²",
    disponibles: "30 unités",
    href: "/logements/s2",
    details: {
      salon: "Grand salon/séjour",
      cuisine: "Cuisine équipée",
      chambre1: "2 chambres",
      salleBain: "Salle de bain familiale",
      sdInvites: "S.D invités",
      jardin: "Jardin privé (disponible uniquement pour certains appartements)",
    },
  },
  {
    id: "s3",
    type: "S+3",
    title: "Appartement S+3",
    description: "Espace généreux pour grandes familles",
    image: "/s3-modern-living-dining-new.png",
    surface: "139-208 m²",
    chambres: "une Suite parentale",
    sallesBain: "2 chambres",
    surfaceExterieure: "Jardin privé 0-181 m²",
    disponibles: "22 unités",
    href: "/logements/s3",
    details: {
      salon: "Salon, salle à manger",
      cuisine: "Cuisine équipée",
      chambre1: "Suite parentale",
      chambre2: "2 chambres",
      salleBain1: "Salle de bain principale",
      salleBain2: "Salle d'eau",
      jardin: "Jardin privé (disponible uniquement pour certains appartements)",
    },
  },
  {
    id: "duplex",
    type: "Duplex",
    title: "Duplex de Prestige",
    description: "Le summum du luxe résidentiel sur 2 niveaux",
    image: "/duplex-modern-double-height.jpeg",
    surface: "221-254 m²",
    chambres: "3 Suites",
    sallesBain: "Piscine privée",
    surfaceExterieure: "Jardin privé 113-154 m²",
    disponibles: "2 unités",
    href: "/logements/duplex",
    details: {
      niveau1: "RDC: Salon, cuisine, S.D invités",
      niveau2: "Étage: 3 suites",
      salon: "Piscine privatif",
      cuisine: "Cuisine équipée",
      terrasse: "Terrasse",
    },
  },
  {
    id: "villa",
    type: "Villa",
    title: "Villa Individuelle",
    description: "Maison individuelle avec jardin privé",
    image: "/villa-h1.jpg",
    surface: "353-357 m²",
    chambres: "3 Suites",
    sallesBain: "Piscine privée",
    surfaceExterieure: "Jardin 60-219 m²",
    disponibles: "6 unités",
    href: "/logements/villa",
    details: {
      niveau1: "RDC: Salon, salle à manger, cuisine, séjour",
      niveau2: "Étage: 3 suites",
      jardin: "Jardin paysager privé",
      garage: "Garage privé sous-sol",
      terrasse: "Terrasse et balcons",
      piscine: "Piscine privée",
    },
  },
]

export default function UnitsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % properties.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + properties.length) % properties.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
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
          {/* Main Slider */}
          <div className="overflow-hidden rounded-none">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {properties.map((property, index) => (
                <div key={property.id} className="w-full flex-shrink-0">
                  <Card className="rounded-none border-0 shadow-lg mx-2">
                    <div className="grid lg:grid-cols-2 gap-0">
                      {/* Image */}
                      <div className="relative h-96 lg:h-auto">
                        <Image
                          src={property.image || "/placeholder.svg"}
                          alt={property.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-gray-900 text-white rounded-none">{property.type}</Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-white text-gray-900 rounded-none">{property.disponibles}</Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <CardContent className="p-8 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{property.title}</h3>
                        <p className="text-gray-600 mb-6">{property.description}</p>

                        {/* Specifications */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center space-x-2">
                            <Ruler className="h-4 w-4 text-custom-beige" />
                            <span className="text-sm text-gray-600">{property.surface}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Bed className="h-4 w-4 text-custom-beige" />
                            <span className="text-sm text-gray-600">{property.chambres}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {property.id === "villa" || property.id === "duplex" ? (
                              <Waves className="h-4 w-4 text-custom-beige" />
                            ) : property.id === "s3" ? (
                              <Bed className="h-4 w-4 text-custom-beige" />
                            ) : (
                              <Bath className="h-4 w-4 text-custom-beige" />
                            )}
                            <span className="text-sm text-gray-600">{property.sallesBain}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Trees className="h-4 w-4 text-custom-beige" />
                            <span className="text-sm text-gray-600">{property.surfaceExterieure}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Home className="h-4 w-4 text-custom-beige" />
                            <span className="text-sm text-gray-600">{property.disponibles}</span>
                          </div>
                        </div>

                        {/* Additional Details */}
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">Composition :</h4>
                          <div className="text-xs text-gray-600 space-y-1">
                            {Object.entries(property.details).map(([key, value]) => (
                              <div key={key} className="flex items-start">
                                <span className="w-2 h-2 bg-custom-beige rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                <span>{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* CTA Button */}
                        <Link href={property.href}>
                          <Button className="w-full rounded-none bg-custom-beige hover:bg-custom-beige text-white">
                            Découvrir ce logement
                          </Button>
                        </Link>
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
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 z-10"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 z-10"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>

          {/* Dots Navigation */}
          <div className="flex justify-center space-x-2 mt-8">
            {properties.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex ? "bg-custom-beige scale-110" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
