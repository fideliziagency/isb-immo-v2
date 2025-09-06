import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dumbbell, Car, Trees, Shield, Wifi, Droplets } from "lucide-react"

const facilities = [
  {
    icon: Dumbbell,
    title: "Salle de Sport Équipée",
    description:
      "Espace fitness moderne entièrement équipé avec matériel cardio et musculation pour maintenir votre forme au quotidien.",
    features: ["Équipements dernière génération", "Espace cardio et musculation", "Vestiaires privés", "Accès 24h/24"],
  },
  {
    icon: Car,
    title: "Garage Sécurisé Privé",
    description: "Parking souterrain privé et sécurisé avec places numérotées et système de surveillance permanent.",
    features: ["Accès sécurisé par badge", "Surveillance 24h/24", "Places numérotées", "Éclairage LED"],
  },
  {
    icon: Trees,
    title: "Jardin Privé & Espaces Verts",
    description:
      "Jardins privés et espaces verts paysagers soigneusement aménagés pour votre détente et celle de vos enfants.",
    features: ["Jardins privés selon unité", "Espaces verts paysagers", "Aires de jeux enfants", "Espaces détente"],
  },
  {
    icon: Shield,
    title: "Sécurité 24h/24",
    description: "Service de gardiennage permanent et système de vidéosurveillance pour votre tranquillité absolue.",
    features: ["Gardiennage permanent", "Vidéosurveillance", "Contrôle d'accès", "Système d'alarme"],
  },
  {
    icon: Wifi,
    title: "Connectivité Haut Débit",
    description: "Pré-installation fibre optique et Wi-Fi dans les espaces communs pour rester connecté en permanence.",
    features: ["Fibre optique", "Wi-Fi espaces communs", "Pré-câblage domotique", "Infrastructure moderne"],
  },
  {
    icon: Droplets,
    title: "Piscine & Spa",
    description: "Espace aquatique avec piscine et zone spa pour votre bien-être et relaxation quotidienne.",
    features: ["Piscine extérieure", "Espace spa", "Solarium aménagé", "Vestiaires équipés"],
  },
]

export default function FacilitiesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-custom-beige-light text-custom-beige rounded-none">Équipements</Badge>
          <h2 className="text-6xl font-bold text-gray-900 mb-6">Commodités & Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les équipements haut de gamme et services exclusifs qui font de The Life Residence un lieu de vie
            d'exception.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <Card
              key={index}
              className="rounded-none border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-custom-beige-light rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-custom-beige transition-colors duration-300">
                    <facility.icon className="h-8 w-8 text-custom-beige group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{facility.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{facility.description}</p>
                </div>

                <div className="space-y-2">
                  {facility.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-custom-beige rounded-full"></div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-custom-beige-light p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Services Conciergerie</h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Profitez également de nos services de conciergerie pour la réception de colis, l'entretien des espaces
            communs, et l'assistance quotidienne pour un confort de vie optimal.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-700">
            <div>
              <strong>Réception de colis</strong>
              <br />
              Service de réception et garde de vos livraisons
            </div>
            <div>
              <strong>Entretien quotidien</strong>
              <br />
              Maintenance des espaces communs et jardins
            </div>
            <div>
              <strong>Assistance résidents</strong>
              <br />
              Support et assistance pour vos besoins quotidiens
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
