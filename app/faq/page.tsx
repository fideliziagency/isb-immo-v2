import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  HelpCircle,
  Home,
  DollarSign,
  Shield,
  Building,
  Users,
  Phone,
  MessageCircle,
  Mail,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"

const faqCategories = [
  {
    id: "general",
    name: "Informations Générales",
    icon: Home,
    questions: [
      {
        question: "Qu'est-ce que The Life Residence ?",
        answer:
          "The Life Residence est un projet résidentiel haut de gamme situé à Chotrana 3, La Soukra. Il comprend 82 appartements, 2 duplex et 6 villas de très haut standing, développé par ISB Immobilière Sodaprim Bouaziz.",
      },
      {
        question: "Où se situe exactement le projet ?",
        answer:
          "Le projet est situé à Chotrana 3, La Soukra, sur la route principale face au restaurant El Firma. Cette localisation offre un accès facile aux commodités tout en préservant la tranquillité résidentielle.",
      },
      {
        question: "Quand aura lieu la livraison ?",
        answer:
          "La livraison de The Life Residence est prévue pour 2027. Le projet suit un calendrier précis avec des étapes de construction régulièrement communiquées aux acquéreurs.",
      },
    ],
  },
  {
    id: "logements",
    name: "Types de Logements",
    icon: Building,
    questions: [
      {
        question: "Quels types de logements sont disponibles ?",
        answer:
          "The Life Residence propose 5 types de logements : Appartements S+1 (65-75 m²), S+2 (85-95 m²), S+3 (139-208 m²), Duplex Premium (150-180 m²) et Villas Premium (200-250 m²).",
      },
      {
        question: "Combien d'unités sont disponibles par type ?",
        answer:
          "Nous proposons 28 appartements S+1, 32 appartements S+2, 22 appartements S+3, 2 duplex premium et 6 villas premium, soit un total de 90 logements.",
      },
      {
        question: "Les logements sont-ils livrés meublés ?",
        answer:
          "Les logements sont livrés avec des finitions haut de gamme et les équipements de base (cuisine équipée, climatisation, etc.) mais non meublés. Cela vous permet de personnaliser votre intérieur selon vos goûts.",
      },
    ],
  },
  {
    id: "achat",
    name: "Processus d'Achat",
    icon: DollarSign,
    questions: [
      {
        question: "Comment fonctionne l'achat sur plan ?",
        answer:
          "L'achat sur plan vous permet de réserver votre logement avant sa construction. Vous signez un contrat de réservation avec un acompte, puis bénéficiez d'un échéancier de paiement étalé jusqu'à la livraison.",
      },
      {
        question: "Quels sont les modes de paiement acceptés ?",
        answer:
          "Nous acceptons les paiements par virement bancaire, chèque certifié et facilités de paiement bancaire. Des solutions de financement personnalisées peuvent être étudiées selon votre profil.",
      },
      {
        question: "Peut-on visiter un appartement témoin ?",
        answer:
          "Un appartement témoin sera disponible à partir de juillet 2026. En attendant, nous proposons des visites 3D virtuelles et des rendez-vous dans notre showroom pour découvrir les finitions et matériaux.",
      },
    ],
  },
  {
    id: "garanties",
    name: "Garanties et Sécurité",
    icon: Shield,
    questions: [
      {
        question: "Quelles garanties sont offertes ?",
        answer:
          "Nous offrons toutes les garanties légales : garantie décennale (10 ans), garantie biennale (2 ans) et garantie de parfait achèvement (1 an). Une assurance dommages-ouvrage couvre également la construction.",
      },
      {
        question: "Le projet est-il sécurisé ?",
        answer:
          "Oui, The Life Residence dispose d'un système de sécurité complet : gardiennage 24h/24, vidéosurveillance HD, contrôle d'accès et parking sécurisé pour tous les résidents.",
      },
      {
        question: "Que se passe-t-il en cas de retard de livraison ?",
        answer:
          "En cas de retard de livraison imputable au promoteur, des pénalités sont prévues contractuellement. ISB Immobilière s'engage sur ses délais avec un historique de 100% de projets livrés à temps.",
      },
    ],
  },
  {
    id: "services",
    name: "Services et commodités",
    icon: Users,
    questions: [
      {
        question: "Quels services sont inclus dans la résidence ?",
        answer:
          "La résidence propose de nombreux services : sécurité 24h/24, parking sécurisé, espaces verts aménagés, salle de sport, piscine commune, aire de jeux pour enfants et espaces communautaires.",
      },
      {
        question: "Y a-t-il des frais de copropriété ?",
        answer:
          "Oui, des charges de copropriété couvrent l'entretien des espaces communs, la sécurité, l'éclairage et les services partagés. Le montant sera communiqué lors de la signature et reste compétitif pour ce niveau de prestations.",
      },
      {
        question: "La fibre optique est-elle disponible ?",
        answer:
          "Oui, tous les logements sont pré-câblés pour la fibre optique haut débit. Les résidents peuvent choisir leur fournisseur d'accès internet parmi les opérateurs disponibles dans la zone.",
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
              <div className="flex items-center space-x-2">
                <Home className="h-6 w-6 text-custom-beige" />
                <span className="text-lg font-bold text-gray-900">The Life Residence</span>
              </div>
            </Link>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="rounded-none border-custom-beige text-custom-beige hover:bg-custom-beige hover:text-white bg-transparent"
              >
                <Phone className="h-4 w-4 mr-2" />
                Nous Contacter
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-custom-beige-light text-custom-beige rounded-none">Support Client</Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Questions Fréquentes</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trouvez rapidement les réponses à vos questions sur The Life Residence. Notre équipe reste disponible pour
              tout complément d'information.
            </p>
          </div>

          {/* Quick Contact */}
          <div className="flex justify-center space-x-4 mb-12">
            <Button size="lg" className="rounded-none bg-custom-beige hover:bg-custom-beige-hover" asChild>
              <a href="tel:58666963">
                <Phone className="h-5 w-5 mr-2" />
                58 666 963
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-none border-custom-beige text-custom-beige hover:bg-custom-beige hover:text-white bg-transparent"
              asChild
            >
              <a href="https://wa.me/21658666963" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-none border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
              asChild
            >
              <a href="mailto:contact@theliferesidence.com">
                <Mail className="h-5 w-5 mr-2" />
                Email
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {faqCategories.map((category, categoryIndex) => (
              <div key={category.id} className="mb-12">
                <div className="flex items-center space-x-3 mb-8">
                  <category.icon className="h-8 w-8 text-custom-beige" />
                  <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
                </div>

                <div className="space-y-4">
                  {category.questions.map((faq, faqIndex) => (
                    <Card key={faqIndex} className="rounded-none border-0 shadow-sm">
                      <CardContent className="p-0">
                        <details className="group">
                          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                            <div className="flex items-start space-x-4">
                              <HelpCircle className="h-5 w-5 text-custom-beige mt-1 flex-shrink-0" />
                              <h3 className="font-semibold text-gray-900 text-left">{faq.question}</h3>
                            </div>
                            <ChevronDown className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                          </summary>
                          <div className="px-6 pb-6">
                            <div className="pl-9">
                              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                            </div>
                          </div>
                        </details>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Vous ne trouvez pas votre réponse ?</h2>
            <p className="text-gray-600 mb-8">
              Notre équipe d'experts est à votre disposition pour répondre à toutes vos questions spécifiques sur The
              Life Residence.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="rounded-none border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <Phone className="h-8 w-8 text-custom-beige mx-auto mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Par Téléphone</h4>
                  <p className="text-sm text-gray-600 mb-3">Lun-Ven : 8h-18h</p>
                  <Button size="sm" className="rounded-none bg-custom-beige hover:bg-custom-beige-hover" asChild>
                    <a href="tel:58666963">Appeler</a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="rounded-none border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="h-8 w-8 text-custom-beige mx-auto mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">WhatsApp</h4>
                  <p className="text-sm text-gray-600 mb-3">Réponse rapide</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-none border-custom-beige text-custom-beige hover:bg-custom-beige hover:text-white bg-transparent"
                    asChild
                  >
                    <a href="https://wa.me/21658666963" target="_blank" rel="noopener noreferrer">
                      Discuter
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="rounded-none border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <Mail className="h-8 w-8 text-custom-beige mx-auto mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Par Email</h4>
                  <p className="text-sm text-gray-600 mb-3">Réponse sous 24h</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-none border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                    asChild
                  >
                    <a href="mailto:contact@theliferesidence.com">Écrire</a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="bg-custom-beige-light p-6">
              <h3 className="font-bold text-gray-900 mb-2">Rendez-vous Personnalisé</h3>
              <p className="text-gray-600 mb-4">
                Planifiez une rencontre avec nos conseillers pour une présentation détaillée du projet.
              </p>
              <Button className="rounded-none bg-custom-beige hover:bg-custom-beige-hover">Prendre Rendez-vous</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
