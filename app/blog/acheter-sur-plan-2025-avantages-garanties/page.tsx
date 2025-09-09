import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, User, Share2, DollarSign, Shield, Home, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function BlogAcheterSurPlanPage() {
  const advantages = [
    {
      icon: DollarSign,
      title: "Prix Avantageux",
      description: "Tarifs préférentiels avant la montée des prix du marché immobilier",
    },
    {
      icon: Home,
      title: "Choix Prioritaire",
      description: "Sélection de l'étage, orientation et vue selon vos préférences",
    },
    {
      icon: Calendar,
      title: "Paiement Étalé",
      description: "Facilités de paiement adaptées avec échéancier personnalisé",
    },
    {
      icon: Shield,
      title: "Garanties Complètes",
      description: "Protection légale avec garanties décennale, biennale et parfait achèvement",
    },
  ]

  const guarantees = [
    {
      title: "Garantie Décennale",
      duration: "10 ans",
      coverage: "Structure et gros œuvres",
      description: "Protection complète contre les vices affectant la solidité de l'ouvrage",
    },
    {
      title: "Garantie Biennale",
      duration: "2 ans",
      coverage: "Équipements et installations",
      description: "Couverture des équipements dissociables du bâtiment",
    },
    {
      title: "Parfait Achèvement",
      duration: "1 an",
      coverage: "Défauts de conformité",
      description: "Réparation de tous les désordres signalés lors de la réception",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/blog" className="flex items-center space-x-3">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
              <span className="text-lg font-bold text-gray-900">Retour au Blog</span>
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="rounded-none border-custom-beige text-custom-beige hover:bg-custom-beige hover:text-white bg-transparent"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Partager
            </Button>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-custom-beige-light text-custom-beige rounded-none">Investissement</Badge>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Pourquoi Acheter sur Plan en 2025 : Avantages et Garanties
            </h1>

            <div className="flex items-center space-x-6 text-gray-600 mb-8">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>10 Décembre 2024</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>6 min de lecture</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Équipe ISB Immobilière</span>
              </div>
            </div>

            <div className="relative h-96 mb-8">
              <Image
                src="/modern-apartment-construction.png"
                alt="Construction d'appartements modernes - Achat sur plan"
                fill
                className="object-cover rounded-none"
              />
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 mb-8">
                L'achat sur plan représente une opportunité unique d'acquérir un logement neuf à des conditions
                avantageuses. En 2025, cette formule d'investissement immobilier offre des garanties renforcées et des
                avantages exclusifs pour les acquéreurs avisés.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">Les Avantages de l'Achat sur Plan</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {advantages.map((advantage, index) => (
                  <Card key={index} className="rounded-none border-0 shadow-sm">
                    <CardContent className="p-6">
                      <advantage.icon className="h-8 w-8 text-custom-beige mb-4" />
                      <h3 className="font-bold text-gray-900 mb-2">{advantage.title}</h3>
                      <p className="text-gray-600">{advantage.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">Vos Garanties Légales</h2>

              <div className="space-y-6 mb-8">
                {guarantees.map((guarantee, index) => (
                  <Card key={index} className="rounded-none border-0 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">{guarantee.title}</h3>
                          <Badge className="bg-custom-beige text-white rounded-none">{guarantee.duration}</Badge>
                        </div>
                        <Shield className="h-6 w-6 text-custom-beige" />
                      </div>
                      <div className="mb-3">
                        <span className="font-semibold text-gray-900">Couverture : </span>
                        <span className="text-gray-600">{guarantee.coverage}</span>
                      </div>
                      <p className="text-gray-600">{guarantee.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-custom-beige-light p-6 mb-8">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  Points clés à retenir
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• L'achat sur plan offre des prix préférentiels significatifs</li>
                  <li>• Les garanties légales protègent intégralement votre investissement</li>
                  <li>• Le paiement étalé facilite l'accès à la propriété</li>
                  <li>• La personnalisation est possible selon les projets</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">The Life Residence : Un Exemple d'Excellence</h2>

              <p className="text-gray-700 mb-6">
                The Life Residence illustre parfaitement les avantages de l'achat sur plan. Avec ses 90 logements de
                très haut standing à La Soukra, ce projet offre toutes les garanties et avantages mentionnés, avec en
                plus l'expertise reconnue d'ISB Immobilière Sodaprim Bouaziz.
              </p>

              <div className="text-center">
                <Button size="lg" className="rounded-none bg-custom-beige hover:bg-custom-beige-hover" asChild>
                  <Link href="/">Découvrir The Life Residence</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
