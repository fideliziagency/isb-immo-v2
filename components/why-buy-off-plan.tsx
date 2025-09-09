"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Home, Calendar, Shield, TrendingUp, Users, CheckCircle, Star, Award } from "lucide-react"

const advantages = [
  {
    icon: DollarSign,
    title: "Prix Préférentiels",
    description: "Profitez de conditions préférentielles dès la réservation.",
    highlight: "Tarifs Avantageux",
  },
  {
    icon: Home,
    title: "Choix Prioritaire",
    description: "Sélectionnez l'étage, l'orientation et la vue de votre choix parmi les meilleures options",
    highlight: "Premier servi",
  },
  {
    icon: Calendar,
    title: "Paiement Étalé",
    description: "Facilités de paiement adaptées à votre budget avec échéancier personnalisé",
    highlight: "Jusqu'à 36 mois",
  },
  {
    icon: Shield,
    title: "Garanties Légales",
    description: "Protection complète avec garanties décennale, biennale et de parfait achèvement",
    highlight: "100% sécurisé",
  },
  {
    icon: TrendingUp,
    title: "Plus-value Assurée",
    description: "Valorisation immédiate de votre investissement dès la livraison du projet",
    highlight: "ROI attractif",
  },
  {
    icon: Users,
    title: "Accompagnement Dédié",
    description: "Un suivi professionnel et une assistance tout au long de votre parcours d'achat.",
    highlight: "Sur mesure",
  },
]

const guarantees = [
  {
    icon: Award,
    title: "Garantie Décennale",
    description: "Protection de 10 ans sur la structure et les gros œuvres",
  },
  {
    icon: Shield,
    title: "Garantie Biennale",
    description: "Couverture de 2 ans sur les équipements et installations",
  },
  {
    icon: CheckCircle,
    title: "Parfait Achèvement",
    description: "Garantie d'1 an sur tous les défauts de conformité",
  },
  {
    icon: Star,
    title: "Assurance Dommages",
    description: "Protection contre les dommages pendant la construction",
  },
]

const timeline = [
  {
    phase: "Réservation",
    duration: "Immédiat",
    description: "Signature du contrat de réservation et versement de l'acompte",
    status: "active",
  },
  {
    phase: "Construction",
    duration: "24 mois",
    description: "Suivi régulier de l'avancement avec visites de chantier",
    status: "upcoming",
  },
  {
    phase: "Pré-livraison",
    duration: "1 mois",
    description: "Visite de réception et vérification de la conformité",
    status: "upcoming",
  },
  {
    phase: "Livraison",
    duration: "Fin 2027",
    description: "Remise des clés et début de la garantie parfait achèvement",
    status: "upcoming",
  },
]

export default function WhyBuyOffPlan() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-custom-beige text-gray-900 rounded-none">Achat sur Plan</Badge>
          <h2 className="text-6xl font-bold text-gray-900 mb-6">Pourquoi Acheter sur Plan ?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            L'achat sur plan vous offre des avantages exclusifs et des garanties solides pour sécuriser votre
            investissement immobilier.
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {advantages.map((advantage, index) => (
            <Card
              key={index}
              className="rounded-none border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group"
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <advantage.icon className="h-12 w-12 text-custom-beige mx-auto group-hover:scale-110 transition-transform duration-300" />
                </div>
                <Badge className="mb-4 bg-custom-beige text-gray-900 rounded-none">{advantage.highlight}</Badge>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{advantage.title}</h3>
                <p className="text-gray-600 leading-relaxed">{advantage.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Timeline Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Processus d'Achat sur Plan</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {timeline.map((step, index) => (
              <div key={index} className="relative">
                <Card
                  className={`rounded-none border-0 shadow-sm ${
                    step.status === "active" ? "ring-2 ring-custom-beige" : ""
                  }`}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-8 h-8 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold ${
                        step.status === "active" ? "bg-custom-beige" : "bg-gray-400"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{step.phase}</h4>
                    <Badge
                      className={`mb-3 rounded-none ${
                        step.status === "active" ? "bg-custom-beige text-white" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {step.duration}
                    </Badge>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>
                {index < timeline.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Guarantees Section */}
        <div className="bg-custom-beige-light p-8 mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Vos Garanties</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guarantees.map((guarantee, index) => (
              <div key={index} className="text-center">
                <guarantee.icon className="h-10 w-10 text-custom-beige mx-auto mb-4" />
                <h4 className="font-bold text-gray-900 mb-2">{guarantee.title}</h4>
                <p className="text-sm text-gray-600">{guarantee.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
