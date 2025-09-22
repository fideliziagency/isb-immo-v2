"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"
import Image from "next/image"

const galleryItems = [
  {
    id: "s1-interior",
    title: "Appartement S+1 - Intérieur",
    type: "Appartement",
    surface: "68 m²",
    image: "/apartment-3d-view-s1.png",
    description: "Découvrez l'agencement optimisé et les finitions modernes",
    features: ["Salon lumineux", "Cuisine équipée", "Balcon vue dégagée"],
  },
  {
    id: "s2-interior",
    title: "Appartement S+2 - Intérieur",
    type: "Appartement",
    surface: "89 m²",
    image: "/apartment-3d-view-s2.png",
    description: "Espace familial avec 2 chambres et salon généreux",
    features: ["2 chambres", "Grand salon", "Cuisine avec îlot"],
  },
  {
    id: "s3-interior",
    title: "Appartement S+3 - Intérieur",
    type: "Appartement",
    surface: "118 m²",
    image: "/apartment-3d-view-s3.png",
    description: "Appartement premium avec suite parentale et terrasse",
    features: ["Suite parentale", "3 chambres", "Terrasse privative"],
  },
  {
    id: "duplex-interior",
    title: "Duplex Premium - Intérieur",
    type: "Duplex",
    surface: "165 m²",
    image: "/duplex-3d-architectural-view.png",
    description: "Luxe et prestige sur deux niveaux avec vue panoramique",
    features: ["2 niveaux", "Terrasse panoramique", "Finitions luxueuses"],
  },
]

export default function Gallery3D() {
  const [selectedItem, setSelectedItem] = useState(galleryItems[0])

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Main Viewer */}
      <div className="lg:col-span-2">
        <Card className="rounded-none border-0 shadow-lg overflow-hidden">
          <div className="relative aspect-video bg-gray-900">
            <Image
              src={selectedItem.image || "/placeholder.svg"}
              alt={selectedItem.title}
              fill
              className="object-cover"
            />
          </div>

          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedItem.title}</h3>
                <p className="text-gray-600 mb-3">{selectedItem.description}</p>
              </div>
              <Badge variant="outline" className="rounded-none border-custom-beige text-custom-beige">
                {selectedItem.surface}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {selectedItem.features.map((feature, index) => (
                <div key={index} className="text-center p-3 bg-gray-50">
                  <div className="text-sm font-medium text-gray-900">{feature}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">Explorez les finitions et l'aménagement</div>
              <Button size="sm" className="rounded-none bg-custom-beige hover:bg-custom-beige-hover">
                <Eye className="h-4 w-4 mr-2" />
                Voir Plus
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gallery Thumbnails */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-gray-900">Choisir un logement</h4>

        {galleryItems.map((item) => (
          <Card
            key={item.id}
            className={`rounded-none border-0 shadow-sm cursor-pointer transition-all duration-200 ${
              selectedItem.id === item.id ? "ring-2 ring-custom-beige shadow-md" : "hover:shadow-md"
            }`}
            onClick={() => setSelectedItem(item)}
          >
            <div className="flex">
              <div className="relative w-24 h-20 flex-shrink-0">
                <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
              </div>

              <CardContent className="flex-1 p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="font-semibold text-gray-900 text-sm mb-1">
                      {item.title.replace(" - Intérieur", "")}
                    </h5>
                    <div className="text-xs text-gray-600 mb-2">{item.surface}</div>
                    <Badge
                      size="sm"
                      variant="outline"
                      className="rounded-none border-custom-beige text-custom-beige text-xs"
                    >
                      {item.type}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}

        {/* Call to Action */}
        <Card className="rounded-none border-0 shadow-sm bg-custom-beige-light">
          <CardContent className="p-4 text-center">
            <h5 className="font-bold text-gray-900 mb-2">Visite Personnalisée</h5>
            <p className="text-sm text-gray-600 mb-3">Planifiez une visite personnalisée avec notre équipe</p>
            <Button size="sm" className="w-full rounded-none bg-custom-beige hover:bg-custom-beige-hover">
              Réserver une Visite
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
