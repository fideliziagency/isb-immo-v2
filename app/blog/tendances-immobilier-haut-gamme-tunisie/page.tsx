import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, User, Share2, TrendingUp, Home, Building, Sparkles, Target } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function BlogTendancesImmobilierPage() {
  const trends = [
    {
      icon: Sparkles,
      title: "Finitions Premium",
      description: "Matériaux nobles et finitions haut de gamme deviennent la norme",
    },
    {
      icon: Home,
      title: "Espaces Modulables",
      description: "Appartements conçus pour s'adapter aux nouveaux modes de vie",
    },
    {
      icon: Building,
      title: "Résidences Sécurisées",
      description: "Sécurité 24h/24 et services de conciergerie intégrés",
    },
    {
      icon: Target,
      title: "Localisation Premium",
      description: "Proximité des commodités et accessibilité privilégiée",
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
            <Badge className="mb-4 bg-custom-beige-light text-custom-beige rounded-none">Marché Immobilier</Badge>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Tendances de l'Immobilier Haut de Gamme en Tunisie 2025
            </h1>

            <div className="flex items-center space-x-6 text-gray-600 mb-8">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>15 Décembre 2024</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>7 min de lecture</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Équipe ISB Immobilière</span>
              </div>
            </div>

            <div className="relative h-96 mb-8">
              <Image
                src="/tunisian-luxury-residence.png"
                alt="Résidence de luxe moderne en Tunisie"
                fill
                className="object-cover rounded-none"
              />
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 mb-8">
                Le marché immobilier haut de gamme tunisien connaît une transformation remarquable en 2025. Entre
                innovations architecturales et nouvelles attentes des acquéreurs, découvrez les tendances qui
                redéfinissent le secteur.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 text-custom-beige mr-3" />
                Les Grandes Tendances 2025
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {trends.map((trend, index) => (
                  <Card key={index} className="rounded-none border-0 shadow-sm">
                    <CardContent className="p-6">
                      <trend.icon className="h-8 w-8 text-custom-beige mb-4" />
                      <h3 className="font-bold text-gray-900 mb-2">{trend.title}</h3>
                      <p className="text-gray-600">{trend.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">Évolution des Prix et du Marché</h2>

              <p className="text-gray-700 mb-6">
                Le segment haut de gamme affiche une croissance soutenue avec une hausse moyenne de 8% des prix sur
                l'année 2024. Cette progression s'explique par une demande croissante et une offre limitée de projets de
                qualité.
              </p>

              <div className="bg-custom-beige-light p-6 mb-8">
                <h3 className="font-bold text-gray-900 mb-4">Chiffres clés du marché 2024-2025 :</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-custom-beige">+8%</div>
                    <div className="text-sm text-gray-600">Hausse des prix</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-custom-beige">65%</div>
                    <div className="text-sm text-gray-600">Taux d'occupation</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-custom-beige">12 mois</div>
                    <div className="text-sm text-gray-600">Délai moyen de vente</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
