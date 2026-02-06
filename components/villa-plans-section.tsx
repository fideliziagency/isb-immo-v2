"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import Image from "next/image"
import PlanLightbox from "@/components/plan-lightbox"

interface VillaPlan {
  src: string
  alt: string
  title: string
}

interface Villa {
  id: number
  name: string
  plans: VillaPlan[]
}

export default function VillaPlanSection() {
  const [showPlanLightbox, setShowPlanLightbox] = useState(false)
  const [selectedVillaPlans, setSelectedVillaPlans] = useState<VillaPlan[]>([])
  const [lightboxStartIndex, setLightboxStartIndex] = useState(0)

  // Data for 6 villas, each with 2 plans
  const villas: Villa[] = [
    {
      id: 1,
      name: "Villa 1",
      plans: [
        {
          src: "/villa-1-upper-floor.png",
          alt: "Villa 1 - Rez-de-chaussée et étage",
          title: "Villa 1 - Rez-de-chaussée et étage",
        },
        {
          src: "/villa-1-ground-floor.png",
          alt: "Villa 1 - Sous-sol et garage",
          title: "Villa 1 - Sous-sol et garage",
        },
      ],
    },
    {
      id: 2,
      name: "Villa 2",
      plans: [
        {
          src: "/villa-2-ground-floor.png",
          alt: "Villa 2 - Rez-de-chaussée et étage",
          title: "Villa 2 - Rez-de-chaussée et étage",
        },
        {
          src: "/villa-2-upper-floor.png",
          alt: "Villa 2 - Sous-sol et garage",
          title: "Villa 2 - Sous-sol et garage",
        },
      ],
    },
    {
      id: 3,
      name: "Villa 3",
      plans: [
        {
          src: "/villa-3-ground-floor.png",
          alt: "Villa 3 - Rez-de-chaussée et étage",
          title: "Villa 3 - Rez-de-chaussée et étage",
        },
        {
          src: "/villa-3-upper-floor.png",
          alt: "Villa 3 - Sous-sol et garage",
          title: "Villa 3 - Sous-sol et garage",
        },
      ],
    },
    {
      id: 4,
      name: "Villa 4",
      plans: [
        {
          src: "/villa-4-ground-floor.png",
          alt: "Villa 4 - Rez-de-chaussée et étage",
          title: "Villa 4 - Rez-de-chaussée et étage",
        },
        {
          src: "/villa-4-upper-floor.png",
          alt: "Villa 4 - Sous-sol et garage",
          title: "Villa 4 - Sous-sol et garage",
        },
      ],
    },
    {
      id: 5,
      name: "Villa 5",
      plans: [
        {
          src: "/villa-5-ground-floor.png",
          alt: "Villa 5 - Rez-de-chaussée et étage",
          title: "Villa 5 - Rez-de-chaussée et étage",
        },
        {
          src: "/villa-5-upper-floor.png",
          alt: "Villa 5 - Sous-sol et garage",
          title: "Villa 5 - Sous-sol et garage",
        },
      ],
    },
    {
      id: 6,
      name: "Villa 6",
      plans: [
        {
          src: "/villa-6-ground-floor.png",
          alt: "Villa 6 - Rez-de-chaussée et étage",
          title: "Villa 6 - Rez-de-chaussée et étage",
        },
        {
          src: "/villa-6-upper-floor.png",
          alt: "Villa 6 - Sous-sol et garage",
          title: "Villa 6 - Sous-sol et garage",
        },
      ],
    },
  ]

  const openVillaLightbox = (villa: Villa, planIndex = 0) => {
    setSelectedVillaPlans(villa.plans)
    setLightboxStartIndex(planIndex)
    setShowPlanLightbox(true)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Plans et Architecture</h2>
          <p className="text-lg text-gray-600">Découvrez les plans détaillés de nos 6 villas exclusives</p>
        </div>

        {/* Villa Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {villas.map((villa) => (
            <Card
              key={villa.id}
              className="rounded-none border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1"
              onClick={() => openVillaLightbox(villa)}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={villa.plans[0].src || "/placeholder.svg"}
                  alt={villa.plans[0].alt}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <Button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-none bg-custom-beige hover:bg-custom-beige-700">
                    <Eye className="h-4 w-4 mr-2" />
                    Voir les plans
                  </Button>
                </div>
              </div>

              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{villa.name}</h3>
                <p className="text-gray-600 mb-4">2 plans disponibles</p>
                <div className="flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-custom-beige rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <div className="bg-white p-8 rounded-none shadow-lg max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Architecture sur Mesure</h3>
            <p className="text-gray-600 mb-6">
              Chaque villa dispose de plans uniques avec rez-de-chaussée et étage, conçus pour optimiser l'espace de vie
              et offrir un confort exceptionnel.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="font-bold text-custom-beige-600 text-2xl">6</div>
                <div className="text-gray-600">Villas Exclusives</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-custom-beige-600 text-2xl">2</div>
                <div className="text-gray-600">Niveaux par Villa</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Component */}
      <PlanLightbox
        isOpen={showPlanLightbox}
        onClose={() => setShowPlanLightbox(false)}
        plans={selectedVillaPlans}
        initialIndex={lightboxStartIndex}
      />
    </section>
  )
}
