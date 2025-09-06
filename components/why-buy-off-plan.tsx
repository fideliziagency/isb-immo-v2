import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingDown, Palette, Shield, CheckCircle, Award } from "lucide-react"

const advantages = [
  {
    icon: TrendingDown,
    title: "Avantages Prix",
    description: "Économisez jusqu'à 15% par rapport aux prix de livraison",
    features: [
      "Prix préférentiels garantis",
      "Facilités de paiement étalées",
      "Pas de frais d'agence",
      "Remises pour paiement comptant",
    ],
    color: "bg-green-50 border-green-200",
  },
  {
    icon: Palette,
    title: "Personnalisation",
    description: "Adaptez votre appartement selon vos goûts et besoins",
    features: ["Choix des finitions", "Aménagement sur mesure", "Couleurs et matériaux", "Options d'équipements"],
    color: "bg-purple-50 border-purple-200",
  },
  {
    icon: Shield,
    title: "Sécurité & Garanties",
    description: "Protection juridique complète et garanties constructeur",
    features: [
      "Garantie décennale",
      "Assurance dommages-ouvrage",
      "Contrat notarié sécurisé",
      "Suivi de chantier transparent",
    ],
    color: "bg-blue-50 border-blue-200",
  },
]

export default function WhyBuyOffPlan() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-custom-beige-light text-custom-beige rounded-none">Achat sur Plan</Badge>
          <h2 className="text-6xl font-bold text-gray-900 mb-6">Pourquoi Acheter sur Plan ?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les avantages exclusifs de l'achat sur plan avec Sodaprim Immobilière et maximisez votre
            investissement.
          </p>
        </div>

        {/* Advantages */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {advantages.map((advantage, index) => (
            <Card key={index} className={`rounded-none border-2 shadow-lg ${advantage.color}`}>
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-custom-beige rounded-full flex items-center justify-center mx-auto mb-4">
                    <advantage.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{advantage.title}</h3>
                  <p className="text-gray-600">{advantage.description}</p>
                </div>

                <div className="space-y-3">
                  {advantage.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statistics */}
        <div className="bg-custom-beige p-8 mb-20">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">15%</div>
              <div className="text-custom-beige-light">Économies moyennes</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-custom-beige-light">Projets livrés à temps</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-custom-beige-light">Familles satisfaites</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10+</div>
              <div className="text-custom-beige-light">Années d'expérience</div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-0 bg-white p-8 text-center">
          <h4 className="text-xl font-bold text-gray-900 mb-6">Nos Garanties</h4>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center space-x-3">
              <Shield className="h-6 w-6 text-green-600" />
              <span className="text-gray-700">Garantie Décennale</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Award className="h-6 w-6 text-blue-600" />
              <span className="text-gray-700">Certification Qualité</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <CheckCircle className="h-6 w-6 text-custom-beige" />
              <span className="text-gray-700">Suivi Transparent</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
