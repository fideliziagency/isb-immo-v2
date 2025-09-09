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
  Wifi,
  Shield,
  Thermometer,
  Zap,
  Droplets,
  Wind,
  Phone,
  MessageCircle,
  Eye,
  Trees,
  ChevronLeft,
  ChevronRight,
  Camera,
  Tv,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AppartementS2Page() {
  const [showPlanLightbox, setShowPlanLightbox] = useState(false)
  const [currentPlanIndex, setCurrentPlanIndex] = useState(0)
  const [lightboxStartIndex, setLightboxStartIndex] = useState(0)

  const specifications = [
    { icon: Ruler, label: "Surface", value: "87-136 m²" },
    { icon: Bed, label: "Chambres", value: "2 chambres" },
    { icon: Bath, label: "Salle de bain", value: "1 salle de bain" },
    { icon: Droplets, label: "Salle d'eau", value: "1 salle d'eau" },
    { icon: Home, label: "Salon", value: "Salon spacieux + cuisine" },
  ]

  const equipments = [
    { icon: Home, text: "Cuisine équipée" },
    { icon: Thermometer, text: "Climatisation dans toutes les pièces" },
    { icon: null, text: "Revêtement premium" },
    { icon: null, text: "Menuiserie aluminium à rupture thermique" },
    { icon: Camera, text: "Interphone vidéo couleur" },
    { icon: Tv, text: "Pré-installation satellite et internet" },
    { icon: Shield, text: "Isolation thermique et phonique" },
  ]

  const features = [
    { icon: Wifi, label: "Pré-câblage internet fibre" },
    { icon: Shield, label: "Sécurité 24h/24" },
    { icon: Thermometer, label: "Climatisation multi-zones" },
    { icon: Zap, label: "Installation électrique premium" },
    { icon: Droplets, label: "Plomberie haut de gamme" },
    { icon: Wind, label: "VMC double flux" },
  ]

  // Generate 30 S+2 unit plans - all with new architectural plans
  const s2Plans = [
    // New architectural plans (1-10)
    {
      src: "/s2-plan-b03.png",
      alt: "Plan S+2 - Appartement B.03 (RDC Bloc B)",
      title: "Plan S+2 - Appartement B.03 (RDC Bloc B) - 116 m²",
    },
    {
      src: "/s2-plan-b23.png",
      alt: "Plan S+2 - Appartement B.23 (2ème étage Bloc B)",
      title: "Plan S+2 - Appartement B.23 (2ème étage Bloc B) - 133 m²",
    },
    {
      src: "/s2-plan-c16.png",
      alt: "Plan S+2 - Appartement C.16 (1er étage Bloc C)",
      title: "Plan S+2 - Appartement C.16 (1er étage Bloc C) - 128 m²",
    },
    {
      src: "/s2-plan-b13.png",
      alt: "Plan S+2 - Appartement B.13 (1er étage Bloc B)",
      title: "Plan S+2 - Appartement B.13 (1er étage Bloc B) - 136 m²",
    },
    {
      src: "/s2-plan-c11.png",
      alt: "Plan S+2 - Appartement C.11 (1er étage Bloc C)",
      title: "Plan S+2 - Appartement C.11 (1er étage Bloc C) - 107 m²",
    },
    {
      src: "/s2-plan-a24.png",
      alt: "Plan S+2 - Appartement A.24 (2ème étage Bloc A)",
      title: "Plan S+2 - Appartement A.24 (2ème étage Bloc A) - 97 m²",
    },
    {
      src: "/s2-plan-a04.png",
      alt: "Plan S+2 - Appartement A.04 (RDC Bloc A)",
      title: "Plan S+2 - Appartement A.04 (RDC Bloc A) - 91 m²",
    },
    {
      src: "/s2-plan-c15.png",
      alt: "Plan S+2 - Appartement C.15 (1er étage Bloc C)",
      title: "Plan S+2 - Appartement C.15 (1er étage Bloc C) - 97 m²",
    },
    {
      src: "/s2-plan-a14.png",
      alt: "Plan S+2 - Appartement A.14 (1er étage Bloc A)",
      title: "Plan S+2 - Appartement A.14 (1er étage Bloc A) - 97 m²",
    },
    {
      src: "/s2-plan-c21.png",
      alt: "Plan S+2 - Appartement C.21 (2ème étage Bloc C)",
      title: "Plan S+2 - Appartement C.21 (2ème étage Bloc C) - 107 m²",
    },
    // New architectural plans (11-20)
    {
      src: "/s2-plan-e11.png",
      alt: "Plan S+2 - Appartement E.11 (1er étage Bloc E)",
      title: "Plan S+2 - Appartement E.11 (1er étage Bloc E) - 108 m²",
    },
    {
      src: "/s2-plan-c25.png",
      alt: "Plan S+2 - Appartement C.25 (2ème étage Bloc C)",
      title: "Plan S+2 - Appartement C.25 (2ème étage Bloc C) - 97 m²",
    },
    {
      src: "/s2-plan-d21.png",
      alt: "Plan S+2 - Appartement D.21 (2ème étage Bloc D)",
      title: "Plan S+2 - Appartement D.21 (2ème étage Bloc D) - 128 m²",
    },
    {
      src: "/s2-plan-c26.png",
      alt: "Plan S+2 - Appartement C.26 (2ème étage Bloc C)",
      title: "Plan S+2 - Appartement C.26 (2ème étage Bloc C) - 128 m²",
    },
    {
      src: "/s2-plan-d11.png",
      alt: "Plan S+2 - Appartement D.11 (1er étage Bloc D)",
      title: "Plan S+2 - Appartement D.11 (1er étage Bloc D) - 128 m²",
    },
    {
      src: "/s2-plan-c01.png",
      alt: "Plan S+2 - Appartement C.01 (RDC Bloc C)",
      title: "Plan S+2 - Appartement C.01 (RDC Bloc C) - 102 m²",
    },
    {
      src: "/s2-plan-e15.png",
      alt: "Plan S+2 - Appartement E.15 (1er étage Bloc E)",
      title: "Plan S+2 - Appartement E.15 (1er étage Bloc E) - 102 m²",
    },
    {
      src: "/s2-plan-e04.png",
      alt: "Plan S+2 - Appartement E.04 (RDC Bloc E)",
      title: "Plan S+2 - Appartement E.04 (RDC Bloc E) - 91 m²",
    },
    {
      src: "/s2-plan-e16.png",
      alt: "Plan S+2 - Appartement E.16 (1er étage Bloc E)",
      title: "Plan S+2 - Appartement E.16 (1er étage Bloc E) - 128 m²",
    },
    {
      src: "/s2-plan-c05.png",
      alt: "Plan S+2 - Appartement C.05 (RDC Bloc C)",
      title: "Plan S+2 - Appartement C.05 (RDC Bloc C) - 93 m²",
    },
    // New architectural plans (21-30)
    {
      src: "/s2-plan-g15.png",
      alt: "Plan S+2 - Appartement G.15 (1er étage Bloc G)",
      title: "Plan S+2 - Appartement G.15 (1er étage Bloc G) - 103 m²",
    },
    {
      src: "/s2-plan-g12.png",
      alt: "Plan S+2 - Appartement G.12 (1er étage Bloc G)",
      title: "Plan S+2 - Appartement G.12 (1er étage Bloc G) - 100 m²",
    },
    {
      src: "/s2-plan-f11.png",
      alt: "Plan S+2 - Appartement F.11 (1er étage Bloc F)",
      title: "Plan S+2 - Appartement F.11 (1er étage Bloc F) - 127 m²",
    },
    {
      src: "/s2-plan-g22.png",
      alt: "Plan S+2 - Appartement G.22 (2ème étage Bloc G)",
      title: "Plan S+2 - Appartement G.22 (2ème étage Bloc G) - 100 m²",
    },
    {
      src: "/s2-plan-e26.png",
      alt: "Plan S+2 - Appartement E.26 (2ème étage Bloc E)",
      title: "Plan S+2 - Appartement E.26 (2ème étage Bloc E) - 128 m²",
    },
    {
      src: "/s2-plan-e25.png",
      alt: "Plan S+2 - Appartement E.25 (2ème étage Bloc E)",
      title: "Plan S+2 - Appartement E.25 (2ème étage Bloc E) - 102 m²",
    },
    {
      src: "/s2-plan-e21.png",
      alt: "Plan S+2 - Appartement E.21 (2ème étage Bloc E)",
      title: "Plan S+2 - Appartement E.21 (2ème étage Bloc E) - 108 m²",
    },
    {
      src: "/s2-plan-g02.png",
      alt: "Plan S+2 - Appartement G.02 (RDC Bloc G)",
      title: "Plan S+2 - Appartement G.02 (RDC Bloc G) - 100 m²",
    },
    {
      src: "/s2-plan-f22.png",
      alt: "Plan S+2 - Appartement F.22 (2ème étage Bloc F)",
      title: "Plan S+2 - Appartement F.22 (2ème étage Bloc F) - 87 m²",
    },
    {
      src: "/s2-plan-f21.png",
      alt: "Plan S+2 - Appartement F.21 (2ème étage Bloc F)",
      title: "Plan S+2 - Appartement F.21 (2ème étage Bloc F) - 127 m²",
    },
  ]

  const nextPlan = () => {
    setCurrentPlanIndex((prev) => (prev + 1) % s2Plans.length)
  }

  const prevPlan = () => {
    setCurrentPlanIndex((prev) => (prev - 1 + s2Plans.length) % s2Plans.length)
  }

  const openLightbox = (index: number) => {
    setLightboxStartIndex(index)
    setShowPlanLightbox(true)
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact-section")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
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
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 mb-6">
            <Link href="/" className="text-gray-500 hover:text-custom-beige">
              Accueil
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/#logements" className="text-gray-500 hover:text-custom-beige">
              Logements
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">Appartement S+2</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <Badge className="mb-4 bg-custom-beige text-custom-beige rounded-none">Appartement S+2</Badge>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">Appartement S+2</h1>
              <p className="text-xl text-gray-600 mb-8">
                Parfait pour les familles. Espace généreux avec 2 chambres, salon spacieux et finitions exceptionnelles.
                Le choix idéal pour un confort familial optimal.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {specifications.map((spec, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    {spec.icon && <spec.icon className="h-5 w-5 text-custom-beige" />}
                    <div>
                      <div className="text-sm text-gray-600">{spec.label}</div>
                      <div className="font-semibold text-gray-900">{spec.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Removed the "Demander une Visite" button */}
            </div>

            <div className="relative">
              <Image
                src="/s2-modern-living-room-hero.png"
                alt="Appartement S+2 - Salon moderne avec cheminée et TV murale"
                width={600}
                height={400}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge className="bg-custom-beige text-white rounded-none">30 Unités Disponibles</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Plans et Agencement</h2>
            <p className="text-lg text-gray-600">Un agencement pensé pour le confort familial</p>
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
                    {s2Plans.map((plan, index) => (
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
                    Plan S+2 - Unité {currentPlanIndex + 1} sur 30
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Agencement familial avec salon généreux, cuisine ouverte avec îlot, 2 chambres confortables et salle
                    de bain moderne.
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
                <div className="flex justify-center space-x-1 pb-4 overflow-x-auto">
                  {s2Plans.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPlanIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors flex-shrink-0 ${
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Caractéristiques Techniques</h2>
            <p className="text-lg text-gray-600">Des équipements haut de gamme pour votre famille</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <Card key={index} className="rounded-none border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  {feature.icon && <feature.icon className="h-8 w-8 text-custom-beige mx-auto mb-3" />}
                  <h3 className="font-semibold text-gray-900">{feature.label}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Équipements Inclus</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {equipments.map((equipment, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="px-4 py-2 text-sm bg-custom-beige-50 border-custom-beige-200 text-custom-beige-800 hover:bg-custom-beige-100 transition-colors"
                >
                  {equipment.icon && <equipment.icon className="h-4 w-4 mr-2" />}
                  {equipment.text}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Galerie Photos</h2>
            <p className="text-lg text-gray-600">Découvrez l'espace et le confort de l'appartement S+2</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative group cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/s2-new-living-room-gallery.png"
                  alt="Salon moderne S+2 avec cheminée et TV"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/s2-new-kitchen-gallery.jpeg"
                  alt="Cuisine moderne S+2 avec îlot"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/s2-new-bedroom-gallery.png"
                  alt="Chambre principale S+2 avec coin salon"
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
      <section id="contact-section" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Intéressé par cet Appartement ?</h2>
              <p className="text-lg text-gray-600">
                L'appartement S+2 représente 33% de notre offre et convient parfaitement aux familles avec enfants.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <Card className="rounded-none border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Demande d'Information - S+2</h3>
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
                          placeholder="Votre prénom"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
                          placeholder="Votre nom"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
                        placeholder="Isbimmobiliere@gmail.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
                        placeholder="58 666 963"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Surface souhaitée</label>
                      <select className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent">
                        <option>87 m² - 95 m²</option>
                        <option>95 m² - 105 m²</option>
                        <option>105 m² - 115 m²</option>
                        <option>115 m² - 125 m²</option>
                        <option>125 m² - 136 m²</option>
                        <option>Indifférent</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
                        placeholder="Questions spécifiques sur l'appartement S+2..."
                      ></textarea>
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full rounded-none bg-custom-beige hover:bg-custom-beige"
                    >
                      Envoyer la Demande
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Informations Pratiques</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Home className="h-5 w-5 text-custom-beige mt-1" />
                      <div>
                        <div className="font-semibold text-gray-900">Disponibilité</div>
                        <div className="text-gray-600">30 appartements S+2 disponibles</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Ruler className="h-5 w-5 text-custom-beige mt-1" />
                      <div>
                        <div className="font-semibold text-gray-900">Surfaces</div>
                        <div className="text-gray-600">De 87 m² à 136 m²</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Trees className="h-5 w-5 text-custom-beige mt-1" />
                      <div>
                        <div className="font-semibold text-gray-900">Jardin privé</div>
                        <div className="text-gray-600">
                          0 à 53 m² (disponible uniquement pour certains appartements)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full rounded-none border-custom-beige text-custom-beige hover:bg-custom-beige hover:text-white bg-transparent"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Discuter sur WhatsApp
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/logements/s1">
              <Card className="rounded-none border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <div className="relative h-48">
                  <Image src="/s1-modern-living-room-new.png" alt="Appartement S+1" fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Appartement S+1</h4>
                  <p className="text-gray-600 mb-3">2 pièces • 48 à 77 m² • 30 unités</p>
                  <Button className="w-full rounded-none bg-custom-beige hover:bg-custom-beige">Découvrir</Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/logements/s3">
              <Card className="rounded-none border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <div className="relative h-48">
                  <Image
                    src="/s3-modern-living-dining-interior.jpeg"
                    alt="Appartement S+3"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Appartement S+3</h4>
                  <p className="text-gray-600 mb-3">4 pièces • 110-125 m² • 22 unités</p>
                  <Button className="w-full rounded-none bg-custom-beige hover:bg-custom-beige">Découvrir</Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/logements/duplex">
              <Card className="rounded-none border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <div className="relative h-48">
                  <Image src="/luxury-duplex-interior.png" alt="Duplex" fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Duplex</h4>
                  <p className="text-gray-600 mb-3">2 niveaux • 221-254 m² • 2 unités</p>
                  <Button className="w-full rounded-none bg-custom-beige hover:bg-custom-beige">Découvrir</Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/logements/villa">
              <Card className="rounded-none border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <div className="relative h-48">
                  <Image src="/villa-luxury-interior-modern.jpeg" alt="Villa" fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Villa</h4>
                  <p className="text-gray-600 mb-3">2 niveaux • 353-357 m² • 6 unités</p>
                  <Button className="w-full rounded-none bg-custom-beige hover:bg-custom-beige">Découvrir</Button>
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
          className="rounded-full border-custom-beige text-custom-beige hover:bg-custom-beige hover:text-white bg-white shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>

      {/* Plan Lightbox */}
      <PlanLightbox
        isOpen={showPlanLightbox}
        onClose={() => setShowPlanLightbox(false)}
        plans={s2Plans}
        initialIndex={lightboxStartIndex}
      />
    </div>
  )
}
