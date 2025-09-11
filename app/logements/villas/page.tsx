"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import PlanLightbox from "@/components/plan-lightbox"
import { useState } from "react"
import {
  ArrowLeft,
  Home,
  Ruler,
  Bed,
  Bath,
  Car,
  Wifi,
  Shield,
  Thermometer,
  Zap,
  MessageCircle,
  Download,
  Eye,
  CheckCircle,
  Crown,
  Star,
  Stars as Stairs,
  Trees,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function VillasPage() {
  const [showPlanLightbox, setShowPlanLightbox] = useState(false)
  const [currentPlanIndex, setCurrentPlanIndex] = useState(0)
  const [lightboxStartIndex, setLightboxStartIndex] = useState(0)

  const specifications = [
    { icon: Ruler, label: "Surface", value: "150 - 180 m²" },
    { icon: Stairs, label: "Niveaux", value: "2 niveaux" },
    { icon: Bed, label: "Chambres", value: "3-4 chambres" },
    { icon: Bath, label: "Salles de bain", value: "2-3 salles de bain" },
    { icon: Car, label: "Parking", value: "2 places incluses" },
  ]

  const equipments = [
    "Cuisine équipée haut de gamme avec îlot central et coin petit-déjeuner",
    "Climatisation réversible centralisée avec zones indépendantes",
    "Carrelage premium grand format et parquet dans les chambres",
    "Menuiserie aluminium à rupture thermique avec triple vitrage",
    "Interphone vidéo couleur haute définition avec application mobile",
    "Pré-installation domotique complète et système audio intégré",
    "Éclairage LED avec variateurs, détecteurs et programmation",
    "Prises USB, chargeurs sans fil et bornes de recharge voiture",
    "Isolation thermique et phonique renforcée premium",
    "Terrasse privative de 30-40 m² avec vue panoramique",
    "Suite parentale avec dressing walk-in et salle de bain spa",
    "Mezzanine aménageable en bureau ou espace détente",
    "Buanderie équipée et cave de rangement 15 m²",
    "Système de sécurité individuel avec caméras",
    "Cheminée design dans le salon principal",
    "Jacuzzi privatif sur terrasse (en option)",
  ]

  const features = [
    { icon: Crown, label: "Finitions luxueuses" },
    { icon: Wifi, label: "Domotique intégrée" },
    { icon: Shield, label: "Sécurité renforcée" },
    { icon: Thermometer, label: "Climatisation centralisée" },
    { icon: Zap, label: "Installation électrique premium" },
    { icon: Star, label: "Services conciergerie" },
  ]

  // Generate 2 duplex unit plans
  const duplexPlans = Array.from({ length: 2 }, (_, index) => ({
    src: "/duplex-floor-plan-level1.png",
    alt: `Plan Duplex - Unité ${index + 1}`,
    title: `Plan Duplex - Unité ${index + 1}`,
  }))

  const nextPlan = () => {
    setCurrentPlanIndex((prev) => (prev + 1) % duplexPlans.length)
  }

  const prevPlan = () => {
    setCurrentPlanIndex((prev) => (prev - 1 + duplexPlans.length) % duplexPlans.length)
  }

  const openLightbox = (index: number) => {
    setLightboxStartIndex(index)
    setShowPlanLightbox(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
              <div className="flex items-center space-x-2">
                <Home className="h-6 w-6 text-custom-beige-600" />
                <span className="text-lg font-bold text-gray-900">The Life Residence</span>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 mb-6">
            <Link href="/" className="text-gray-500 hover:text-custom-beige-600">
              Accueil
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/#logements" className="text-gray-500 hover:text-custom-beige-600">
              Logements
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">Duplex</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Badge className="bg-custom-beige-100 text-custom-beige-800 rounded-none">Duplex</Badge>
                <Badge className="bg-purple-100 text-purple-800 rounded-none">
                  <Crown className="h-3 w-3 mr-1" />
                  Prestige
                </Badge>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">Duplex de Prestige</h1>
              <p className="text-xl text-gray-600 mb-8">
                Le summum du luxe résidentiel. Duplex sur 2 niveaux avec terrasse privative, finitions exceptionnelles
                et services haut de gamme. Un art de vivre unique pour les plus exigeants.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {specifications.map((spec, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <spec.icon className="h-5 w-5 text-custom-beige-600" />
                    <div>
                      <div className="text-sm text-gray-600">{spec.label}</div>
                      <div className="font-semibold text-gray-900">{spec.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-none border-custom-beige-600 text-custom-beige-600 hover:bg-custom-beige-600 hover:text-white bg-transparent"
                >
                  <Eye className="h-5 w-5 mr-2" />
                  Visite Privée VIP
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-none border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Dossier Complet
                </Button>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/luxury-duplex-interior.png"
                alt="Duplex - Salon principal"
                width={600}
                height={400}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge className="bg-purple-600 text-white rounded-none">2 Unités Exclusives</Badge>
              </div>
              <div className="absolute bottom-4 left-4">
                <Badge className="bg-custom-beige-600 text-white rounded-none">Collection Limitée</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Plans et Architecture</h2>
            <p className="text-lg text-gray-600">Une architecture d'exception sur deux niveaux</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="rounded-none border-0 shadow-lg overflow-hidden">
              <div className="relative">
                {/* Plan Slider */}
                <div className="relative h-96 overflow-hidden">
                  <div
                    className="flex transition-transform duration-500 ease-in-out h-full"
                    style={{ transform: `translateX(-${currentPlanIndex * 100}%)` }}
                  >
                    {duplexPlans.map((plan, index) => (
                      <div
                        key={index}
                        className="w-full flex-shrink-0 relative cursor-pointer group"
                        onClick={() => openLightbox(index)}
                      >
                        <Image
                          src={plan.src || "/placeholder.svg"}
                          alt={plan.alt}
                          fill
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                          <Button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-none bg-custom-beige hover:bg-custom-beige">
                            <Eye className="h-4 w-4 mr-2" />
                            Voir en grand
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Navigation Arrows */}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevPlan}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 border-gray-300 hover:bg-white z-10"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextPlan}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 border-gray-300 hover:bg-white z-10"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Plan Info */}
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Plan Duplex - Unité {currentPlanIndex + 1} sur 2
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Architecture d'exception sur deux niveaux avec espaces de vie au rez-de-chaussée et espaces privés à
                    l'étage.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button
                      onClick={() => openLightbox(currentPlanIndex)}
                      variant="outline"
                      className="rounded-none border-custom-beige text-custom-beige hover:bg-custom-beige hover:text-white"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Voir en grand
                    </Button>
                  </div>
                </CardContent>

                {/* Dots Navigation */}
                <div className="flex justify-center space-x-2 pb-4">
                  {duplexPlans.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPlanIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentPlanIndex ? "bg-custom-beige" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Prestations de Luxe</h2>
            <p className="text-lg text-gray-600">Des équipements et services d'exception</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <Card key={index} className="rounded-none border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <feature.icon className="h-8 w-8 text-custom-beige-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900">{feature.label}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Équipements de Prestige</h3>
              <div className="space-y-3">
                {equipments.map((equipment, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">{equipment}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Surfaces Détaillées</h3>
              <div className="space-y-4">
                <div className="bg-custom-beige-50 p-4 mb-4">
                  <h4 className="font-bold text-gray-900 mb-2">Niveau 1 (Jour)</h4>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-700">Grand salon + cheminée</span>
                  <span className="font-semibold text-gray-900">40 - 45 m²</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-700">Cuisine + salle à manger</span>
                  <span className="font-semibold text-gray-900">35 - 40 m²</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-700">Chambre d'invités</span>
                  <span className="font-semibold text-gray-900">15 - 18 m²</span>
                </div>

                <div className="bg-purple-50 p-4 mb-4 mt-6">
                  <h4 className="font-bold text-gray-900 mb-2">Niveau 2 (Nuit)</h4>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-700">Suite parentale complète</span>
                  <span className="font-semibold text-gray-900">35 - 40 m²</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-700">Chambres enfants (x2)</span>
                  <span className="font-semibold text-gray-900">15 - 18 m² chacune</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-700">Mezzanine</span>
                  <span className="font-semibold text-gray-900">12 - 15 m²</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-700">Terrasse privative</span>
                  <span className="font-semibold text-gray-900">30 - 40 m²</span>
                </div>
                <div className="flex justify-between items-center py-3 font-bold text-lg">
                  <span className="text-gray-900">Surface Totale</span>
                  <span className="text-custom-beige-600">150 - 180 m²</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Galerie Prestige</h2>
            <p className="text-lg text-gray-600">Découvrez l'art de vivre du duplex de prestige</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative group cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/duplex-grand-salon-fireplace.png"
                  alt="Grand salon avec cheminée"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/duplex-master-suite-luxury.png"
                  alt="Suite parentale de luxe"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/duplex-gourmet-kitchen.png"
                  alt="Cuisine gastronomique"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/duplex-private-terrace-jacuzzi.png"
                  alt="Terrasse privative avec jacuzzi"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/duplex-spa-bathroom.png"
                  alt="Salle de bain spa"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/duplex-mezzanine-office.png"
                  alt="Mezzanine bureau"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Intéressé par ce Duplex de Prestige ?</h2>
              <p className="text-lg text-gray-600">Collection limitée à 2 unités exclusives. Réservation conseillée.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <Card className="rounded-none border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Demande d'Information - Duplex Prestige</h3>
                  <form action="/api/send-email" method="POST" className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
                          placeholder="prénom"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
                          placeholder="nom"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
                        placeholder="contact@thelife.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
                        placeholder="+216 58 666 963"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Surface souhaitée</label>
                      <select className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent">
                        <option>150 m² - 165 m²</option>
                        <option>165 m² - 180 m²</option>
                        <option>Indifférent</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Options souhaitées</label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-gray-700">Jacuzzi privatif sur terrasse</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-gray-700">Système domotique avancé</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-gray-700">Services conciergerie</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
                        placeholder="Questions spécifiques sur le duplex de prestige..."
                      ></textarea>
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full rounded-none bg-custom-beige-600 hover:bg-custom-beige-700"
                    >
                      Envoyer la Demande VIP
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Informations Exclusives</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Crown className="h-5 w-5 text-custom-beige-600 mt-1" />
                      <div>
                        <div className="font-semibold text-gray-900">Collection Limitée</div>
                        <div className="text-gray-600">Seulement 2 duplex de prestige disponibles</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Ruler className="h-5 w-5 text-custom-beige-600 mt-1" />
                      <div>
                        <div className="font-semibold text-gray-900">Surfaces Exceptionnelles</div>
                        <div className="text-gray-600">De 150 m² à 180 m² sur 2 niveaux</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Trees className="h-5 w-5 text-custom-beige-600 mt-1" />
                      <div>
                        <div className="font-semibold text-gray-900">Surface jardin privé</div>
                        <div className="text-gray-600">Terrasse de 30-40 m²</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Car className="h-5 w-5 text-custom-beige-600 mt-1" />
                      <div>
                        <div className="font-semibold text-gray-900">Parking Premium</div>
                        <div className="text-gray-600">2 places de parking couvertes incluses</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-custom-beige-50 to-purple-50 p-6">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                    <Crown className="h-5 w-5 text-custom-beige-600 mr-2" />
                    Services VIP Inclus
                  </h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Visite privée avec architecte</li>
                    <li>• Personnalisation des finitions</li>
                    <li>• Service conciergerie 24h/24</li>
                    <li>• Maintenance premium incluse</li>
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full mt-4 rounded-none border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white bg-transparent"
                  >
                    Réserver une Visite VIP
                  </Button>
                </div>

                <div>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full rounded-none border-custom-beige-600 text-custom-beige-600 hover:bg-custom-beige-600 hover:text-white bg-transparent"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Conseiller Duplex WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation to Other Types */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Découvrez Nos Autres Logements</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/logements/s1">
              <Card className="rounded-none border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <div className="relative h-48">
                  <Image
                    src="/modern-apartment-living-room-s1.png"
                    alt="Appartement S+1"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Appartement S+1</h4>
                  <p className="text-gray-600 mb-3">2 pièces • 65-75 m² • 28 unités</p>
                  <Button className="w-full rounded-none bg-custom-beige-600 hover:bg-custom-beige-700">
                    Découvrir
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/logements/s2">
              <Card className="rounded-none border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <div className="relative h-48">
                  <Image
                    src="/modern-apartment-living-room-s2.png"
                    alt="Appartement S+2"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Appartement S+2</h4>
                  <p className="text-gray-600 mb-3">3 pièces • 85-95 m² • 32 unités</p>
                  <Button className="w-full rounded-none bg-custom-beige-600 hover:bg-custom-beige-700">
                    Découvrir
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/logements/s3">
              <Card className="rounded-none border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <div className="relative h-48">
                  <Image
                    src="/modern-apartment-living-room-s3.png"
                    alt="Appartement S+3"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Appartement S+3</h4>
                  <p className="text-gray-600 mb-3">4 pièces • 110-125 m² • 22 unités</p>
                  <Button className="w-full rounded-none bg-custom-beige-600 hover:bg-custom-beige-700">
                    Découvrir
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* WhatsApp Float Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          variant="outline"
          className="rounded-full border-custom-beige text-custom-beige hover:bg-custom-beige hover:text-black bg-white shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>

      {/* Lightbox Component */}
      <PlanLightbox
        isOpen={showPlanLightbox}
        onClose={() => setShowPlanLightbox(false)}
        plans={duplexPlans}
        initialIndex={lightboxStartIndex}
      />
    </div>
  )
}
