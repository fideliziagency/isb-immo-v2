import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  TrendingUp,
  Home,
  Users,
  Building,
  Sparkles,
  Target,
  BarChart3,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function BlogTendancesImmobilier2025Page() {
  const trends = [
    {
      icon: Sparkles,
      title: "Finitions Premium",
      description: "Matériaux nobles et finitions haut de gamme deviennent la norme",
      growth: "+25%",
    },
    {
      icon: Home,
      title: "Espaces Modulables",
      description: "Appartements conçus pour s'adapter aux nouveaux modes de vie",
      growth: "+18%",
    },
    {
      icon: Building,
      title: "Résidences Sécurisées",
      description: "Sécurité 24h/24 et services de conciergerie intégrés",
      growth: "+30%",
    },
    {
      icon: Target,
      title: "Localisation Premium",
      description: "Proximité des commodités et accessibilité privilégiée",
      growth: "+22%",
    },
  ]

  const marketData = [
    {
      metric: "Prix moyen m²",
      value: "2,800 DT",
      evolution: "+8%",
      trend: "up",
    },
    {
      metric: "Délai de vente",
      value: "12 mois",
      evolution: "-15%",
      trend: "down",
    },
    {
      metric: "Demande haut de gamme",
      value: "65%",
      evolution: "+12%",
      trend: "up",
    },
    {
      metric: "Taux d'occupation",
      value: "92%",
      evolution: "+5%",
      trend: "up",
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
            <Badge className="mb-4 bg-custom-beige-light text-custom-beige rounded-none">Analyse Marché</Badge>
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
                alt="Tendances immobilier haut de gamme Tunisie 2025"
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
                      <div className="flex items-start justify-between mb-4">
                        <trend.icon className="h-8 w-8 text-custom-beige" />
                        <Badge className="bg-green-100 text-green-800 rounded-none">{trend.growth}</Badge>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">{trend.title}</h3>
                      <p className="text-gray-600">{trend.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <BarChart3 className="h-6 w-6 text-custom-beige mr-3" />
                Données du Marché 2024-2025
              </h2>

              <div className="grid md:grid-cols-4 gap-4 mb-8">
                {marketData.map((data, index) => (
                  <Card key={index} className="rounded-none border-0 shadow-sm text-center">
                    <CardContent className="p-6">
                      <div className="text-2xl font-bold text-custom-beige mb-1">{data.value}</div>
                      <div className="text-sm text-gray-600 mb-2">{data.metric}</div>
                      <Badge
                        className={`rounded-none text-xs ${
                          data.trend === "up" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {data.evolution}
                      </Badge>
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
                    <div className="text-sm text-gray-600">Part du haut de gamme</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-custom-beige">12 mois</div>
                    <div className="text-sm text-gray-600">Délai moyen de vente</div>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">Profil des Acquéreurs</h2>

              <p className="text-gray-700 mb-6">
                Les acquéreurs du haut de gamme en 2025 recherchent avant tout la qualité, la sécurité et les services.
                Ils privilégient les résidences offrant un art de vivre complet avec des prestations haut de gamme.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="rounded-none border-0 shadow-sm">
                  <CardContent className="p-6">
                    <Users className="h-8 w-8 text-custom-beige mb-4" />
                    <h3 className="font-bold text-gray-900 mb-2">Profil Démographique</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 35-55 ans (68% des acquéreurs)</li>
                      <li>• Cadres supérieurs et professions libérales</li>
                      <li>• Revenus supérieurs à 8,000 DT/mois</li>
                      <li>• Familles avec enfants (72%)</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="rounded-none border-0 shadow-sm">
                  <CardContent className="p-6">
                    <Target className="h-8 w-8 text-custom-beige mb-4" />
                    <h3 className="font-bold text-gray-900 mb-2">Critères de Choix</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Sécurité et tranquillité (89%)</li>
                      <li>• Qualité des finitions (85%)</li>
                      <li>• Localisation privilégiée (82%)</li>
                      <li>• Services et commodités (78%)</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">Perspectives 2025</h2>

              <p className="text-gray-700 mb-6">
                L'année 2025 s'annonce prometteuse pour l'immobilier haut de gamme tunisien. Les projets comme The Life
                Residence, qui anticipent ces tendances, sont particulièrement bien positionnés pour répondre aux
                attentes du marché.
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
