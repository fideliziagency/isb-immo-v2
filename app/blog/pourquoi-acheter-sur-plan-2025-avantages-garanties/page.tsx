import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  DollarSign,
  Shield,
  Home,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Target,
  Award,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function BlogPourquoiAcheterSurPlanPage() {
  const keyBenefits = [
    {
      icon: DollarSign,
      title: "Économies Substantielles",
      description: "Jusqu'à 15% d'économie par rapport aux prix du marché après livraison",
      highlight: "15% d'économie",
    },
    {
      icon: Home,
      title: "Choix Optimal",
      description: "Sélection prioritaire de l'étage, orientation et vue selon vos préférences",
      highlight: "Premier choix",
    },
    {
      icon: Calendar,
      title: "Flexibilité de Paiement",
      description: "Échéancier personnalisé étalé sur la durée de construction",
      highlight: "Paiement étalé",
    },
    {
      icon: TrendingUp,
      title: "Plus-value Immédiate",
      description: "Valorisation de votre bien dès la livraison du projet",
      highlight: "ROI attractif",
    },
  ]

  const risks = [
    {
      title: "Retard de Livraison",
      solution: "Pénalités contractuelles et garanties de délai",
      prevention: "Choisir un promoteur expérimenté avec un historique fiable",
    },
    {
      title: "Défaillance du Promoteur",
      solution: "Garantie financière d'achèvement obligatoire",
      prevention: "Vérifier les garanties et assurances du promoteur",
    },
    {
      title: "Non-conformité",
      solution: "Garantie de parfait achèvement pendant 1 an",
      prevention: "Visite de réception minutieuse avant signature",
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
            <Badge className="mb-4 bg-custom-beige-light text-custom-beige rounded-none">Guide Investissement</Badge>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Pourquoi Acheter sur Plan en 2025 : Le Guide Complet
            </h1>

            <div className="flex items-center space-x-6 text-gray-600 mb-8">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>8 Décembre 2024</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>8 min de lecture</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Experts ISB Immobilière</span>
              </div>
            </div>

            <div className="relative h-96 mb-8">
              <Image
                src="/modern-apartment-construction.png"
                alt="Guide complet achat sur plan 2025"
                fill
                className="object-cover rounded-none"
              />
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 mb-8">
                L'achat sur plan en 2025 présente des opportunités exceptionnelles pour les investisseurs avisés. Ce
                guide complet vous explique pourquoi cette formule reste l'une des meilleures stratégies
                d'investissement immobilier en Tunisie.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">Les Avantages Majeurs</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {keyBenefits.map((benefit, index) => (
                  <Card key={index} className="rounded-none border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <benefit.icon className="h-8 w-8 text-custom-beige" />
                        <Badge className="bg-custom-beige text-white rounded-none">{benefit.highlight}</Badge>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">Gestion des Risques</h2>

              <p className="text-gray-700 mb-6">
                Comme tout investissement, l'achat sur plan comporte des risques qu'il convient de connaître et de
                maîtriser. Voici les principaux risques et leurs solutions :
              </p>

              <div className="space-y-6 mb-8">
                {risks.map((risk, index) => (
                  <Card key={index} className="rounded-none border-0 shadow-sm border-l-4 border-orange-400">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <AlertTriangle className="h-6 w-6 text-orange-500 mt-1" />
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-2">{risk.title}</h3>
                          <div className="mb-3">
                            <span className="font-semibold text-gray-900">Solution : </span>
                            <span className="text-gray-600">{risk.solution}</span>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900">Prévention : </span>
                            <span className="text-gray-600">{risk.prevention}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">Comment Bien Choisir ?</h2>

              <div className="bg-custom-beige-light p-6 mb-8">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <Target className="h-5 w-5 text-custom-beige mr-2" />
                  Critères de Sélection Essentiels
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Réputation et expérience du promoteur</li>
                    <li>✓ Localisation et potentiel de valorisation</li>
                    <li>✓ Qualité des finitions et équipements</li>
                    <li>✓ Garanties et assurances proposées</li>
                  </ul>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Calendrier de construction réaliste</li>
                    <li>✓ Conditions de paiement flexibles</li>
                    <li>✓ Services et commodités inclus</li>
                    <li>✓ Potentiel de revente ou location</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">The Life Residence : L'Excellence en Exemple</h2>

              <p className="text-gray-700 mb-6">
                The Life Residence à La Soukra illustre parfaitement tous les avantages de l'achat sur plan réussi.
                Développé par ISB Immobilière Sodaprim Bouaziz, ce projet combine :
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-gray-50">
                  <Award className="h-8 w-8 text-custom-beige mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">20+ ans</div>
                  <div className="text-sm text-gray-600">d'expérience</div>
                </div>
                <div className="text-center p-4 bg-gray-50">
                  <CheckCircle className="h-8 w-8 text-custom-beige mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">100%</div>
                  <div className="text-sm text-gray-600">projets livrés</div>
                </div>
                <div className="text-center p-4 bg-gray-50">
                  <Shield className="h-8 w-8 text-custom-beige mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">Toutes</div>
                  <div className="text-sm text-gray-600">garanties incluses</div>
                </div>
              </div>

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
