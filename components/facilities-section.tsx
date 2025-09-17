"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Car, Wifi, Droplets, Camera, Dumbbell, Baby, Sun } from "lucide-react"

const facilities = [
  {
    icon: Shield,
    title: "Sécurité 24h/24",
    description: "Gardiennage permanent et système de surveillance moderne",
    category: "Sécurité",
  },
  {
    icon: Car,
    title: "Parking Sécurisé",
    description: "Places de parking couvertes et surveillées pour tous les résidents",
    category: "Commodités",
  },
  {
    icon: Wifi,
    title: "Fibre Optique",
    description: "Connexion internet haut débit dans tous les logements",
    category: "Technologie",
  },
  {
    icon: Droplets,
    title: "Bassin intérieur",
    description: "Bassin décoratif dans la cour intérieure",
    category: "Loisirs",
  },
  {
    icon: Dumbbell,
    title: "Salle de Sport",
    description: "Équipements fitness modernes accessibles aux résidents",
    category: "Bien-être",
  },
  {
    icon: Baby,
    title: "Aire de Jeux",
    description: "Espace de jeux sécurisé et équipé pour les enfants",
    category: "Famille",
  },
  {
    icon: Camera,
    title: "Vidéosurveillance",
    description: "Système de caméras HD couvrant tous les espaces communs",
    category: "Sécurité",
  },
  {
    icon: Sun,
    title: "Panneaux Photovoltaïques",
    description: "Alimentation électrique de secours pour les parties communes",
    category: "Technique",
  },
]

const categories = [
  { name: "Sécurité", color: "bg-red-100 text-red-800" },
  { name: "Commodités", color: "bg-blue-100 text-blue-800" },
  { name: "Technologie", color: "bg-purple-100 text-purple-800" },
  { name: "Loisirs", color: "bg-green-100 text-green-800" },
  { name: "Environnement", color: "bg-emerald-100 text-emerald-800" },
  { name: "Bien-être", color: "bg-orange-100 text-orange-800" },
  { name: "Social", color: "bg-pink-100 text-pink-800" },
  { name: "Famille", color: "bg-yellow-100 text-yellow-800" },
  { name: "Technique", color: "bg-gray-100 text-gray-800" },
  { name: "Confort", color: "bg-indigo-100 text-indigo-800" },
]

export default function FacilitiesSection() {
  const getCategoryColor = (category: string) => {
    const cat = categories.find((c) => c.name === category)
    return cat ? cat.color : "bg-gray-100 text-gray-800"
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-custom-beige-light text-custom-beige-800 rounded-none">Équipements</Badge>
          <h2 className="text-6xl font-bold text-gray-900 mb-6">Services et commodités</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un ensemble complet de services et d'équipements pensés pour votre confort et votre bien-être au quotidien.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {facilities.map((facility, index) => (
            <Card
              key={index}
              className="rounded-none border-0 shadow-sm hover:shadow-md transition-shadow duration-300 group"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <facility.icon className="h-12 w-12 text-custom-beige mx-auto group-hover:scale-110 transition-transform duration-300" />
                </div>
                <Badge className={`mb-3 rounded-none text-xs ${getCategoryColor(facility.category)}`}>
                  {facility.category}
                </Badge>
                <h3 className="font-bold text-gray-900 mb-2">{facility.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{facility.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-custom-beige-light p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Un art de vivre complet</h3>
            <p className="text-gray-700 mb-6">
              The Life Residence ne se contente pas d'offrir des logements d'exception. C'est un véritable écosystème de
              vie qui combine confort moderne, sécurité optimale et services haut de gamme pour créer une expérience
              résidentielle unique à La Soukra.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-custom-beige-800 mb-2">8</div>
                <div className="text-sm text-gray-600">Services Premium</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-custom-beige-800 mb-2">24/7</div>
                <div className="text-sm text-gray-600">Sécurité & Surveillance</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-custom-beige-800 mb-2">100%</div>
                <div className="text-sm text-gray-600">Satisfaction Résidents</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
