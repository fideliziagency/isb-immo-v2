"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Phone, MessageCircle, ChevronDown, ChevronUp, Building, HelpCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const faqData = [
  {
    category: "Le Projet",
    questions: [
      {
        question: "Où se situe exactement The Life Residence ?",
        answer:
          "The Life Residence est situé à Chotrana 3, La Soukra, sur la route principale face au restaurant El Firma. Cette localisation privilégiée offre un accès facile aux commodités tout en conservant un environnement résidentiel calme.",
      },
      {
        question: "Qui est le promoteur du projet ?",
        answer:
          "Sodaprim Immobilière est le promoteur de The Life Residence. Avec plus de 10 ans d'expérience dans l'immobilier résidentiel haut de gamme, Sodaprim a déjà réalisé des projets comme la Résidence Skander à Aïn Zaghouan Nord et la Résidence El Menzah.",
      },
      {
        question: "Quand aura lieu la livraison ?",
        answer:
          "La livraison de The Life Residence est prévue pour 2026. Les travaux ont officiellement commencé et l'appartement témoin sera disponible dès juillet 2026.",
      },
    ],
  },
  {
    category: "Les Logements",
    questions: [
      {
        question: "Combien de logements comprend le projet ?",
        answer:
          "The Life Residence comprend au total 92 logements : 15 appartements S+1, 45 appartements S+2, 24 appartements S+3, et 8 duplex de prestige.",
      },
      {
        question: "Quelles sont les surfaces disponibles ?",
        answer:
          "Les surfaces varient selon le type : S+1 (65-75 m²), S+2 (85-95 m²), S+3 (110-125 m²), et Duplex (150-180 m²). Chaque logement est conçu pour optimiser l'espace et le confort.",
      },
      {
        question: "Le parking est-il inclus ?",
        answer:
          "Oui, chaque appartement (S+1, S+2, S+3) inclut 1 place de parking couverte. Les duplex bénéficient de 2 places de parking incluses.",
      },
      {
        question: "Peut-on visiter un appartement témoin ?",
        answer:
          "L'appartement témoin sera disponible à partir de juillet 2026. En attendant, nous proposons des visites privées du chantier et des rendus 3D photoréalistes pour vous projeter dans votre futur logement.",
      },
    ],
  },
  {
    category: "Finitions et Équipements",
    questions: [
      {
        question: "Quelles sont les finitions incluses ?",
        answer:
          "Tous les logements incluent des finitions haut de gamme : cuisine équipée, climatisation réversible, carrelage premium, menuiserie aluminium, interphone vidéo, éclairage LED, et isolation renforcée.",
      },
      {
        question: "La climatisation est-elle incluse ?",
        answer:
          "Oui, tous les logements sont équipés de climatisation réversible. Les duplex bénéficient d'un système centralisé avec zones indépendantes.",
      },
      {
        question: "Y a-t-il des options de personnalisation ?",
        answer:
          "Pour les duplex de prestige, nous proposons des options de personnalisation des finitions. Les appartements standards offrent également quelques choix de finitions selon disponibilité.",
      },
    ],
  },
  {
    category: "Achat et Financement",
    questions: [
      {
        question: "Quels sont les modes de paiement acceptés ?",
        answer:
          "Nous acceptons plusieurs modes de paiement : paiement comptant avec remise, échelonnement sur la durée des travaux, et financement bancaire. Notre équipe vous accompagne dans vos démarches.",
      },
      {
        question: "Y a-t-il des facilités de paiement ?",
        answer:
          "Oui, nous proposons des facilités de paiement adaptées à votre situation. Un apport initial est demandé, suivi d'échéances mensuelles jusqu'à la livraison.",
      },
      {
        question: "Les prix sont-ils négociables ?",
        answer:
          "Les prix sont établis selon un barème officiel. Cependant, des remises peuvent être accordées pour les paiements comptants ou les achats multiples.",
      },
    ],
  },
  {
    category: "Services et Commodités",
    questions: [
      {
        question: "Y a-t-il une sécurité 24h/24 ?",
        answer:
          "Oui, The Life Residence dispose d'un service de gardiennage 24h/24 et d'un système de surveillance moderne pour assurer la sécurité des résidents.",
      },
      {
        question: "Quels sont les services inclus ?",
        answer:
          "Les services incluent : gardiennage 24h/24, maintenance des parties communes, gestion des espaces verts, et pour les duplex, un service de conciergerie premium.",
      },
      {
        question: "Y a-t-il des espaces communs ?",
        answer:
          "Le projet comprend des espaces verts aménagés, des aires de stationnement sécurisées, et des parties communes élégamment décorées.",
      },
    ],
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="rounded-none border-0 shadow-sm">
      <CardContent className="p-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <h3 className="text-lg font-semibold text-gray-900 pr-4">{question}</h3>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-custom-beige flex-shrink-0" />
          ) : (
            <ChevronDown className="h-5 w-5 text-custom-beige flex-shrink-0" />
          )}
        </button>
        {isOpen && (
          <div className="px-6 pb-6">
            <p className="text-gray-600 leading-relaxed">{answer}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

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
                <Building className="h-6 w-6 text-custom-beige" />
                <span className="text-lg font-bold text-gray-900">The Life Residence</span>
              </div>
            </Link>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="rounded-none border-custom-beige text-custom-beige hover:bg-custom-beige-light bg-transparent"
              >
                <Phone className="h-4 w-4 mr-2" />
                Appeler
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="rounded-none border-custom-beige bg-white text-custom-beige hover:bg-custom-beige hover:text-white"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <HelpCircle className="h-12 w-12 text-custom-beige mr-4" />
              <div>
                <Badge className="mb-4 bg-custom-beige-light text-custom-beige rounded-none">FAQ</Badge>
                <h1 className="text-4xl font-bold text-gray-900">Questions Fréquentes</h1>
              </div>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trouvez rapidement les réponses à vos questions sur The Life Residence. Si vous ne trouvez pas
              l'information recherchée, n'hésitez pas à nous contacter.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {faqData.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-1 h-8 bg-custom-beige mr-4"></div>
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((faq, faqIndex) => (
                    <FAQItem key={faqIndex} question={faq.question} answer={faq.answer} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Vous avez d'autres questions ?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Notre équipe commerciale est à votre disposition pour répondre à toutes vos questions spécifiques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-none bg-custom-beige bg-custom-beige-hover">
                <Phone className="h-5 w-5 mr-2" />
                Appeler : 22 322 468
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-none border-custom-beige bg-white text-custom-beige hover:bg-custom-beige hover:text-white"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp
              </Button>
            </div>
            <div className="mt-8">
              <Link href="/#contact" className="text-custom-beige hover:underline">
                Ou remplissez notre formulaire de contact →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Float Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button size="lg" className="rounded-full bg-custom-beige bg-custom-beige-hover shadow-lg">
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
