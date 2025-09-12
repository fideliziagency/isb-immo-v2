"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Shield,
  Award,
  ArrowRight,
  Facebook,
  Instagram,
  Building,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import UnitsSlider from "@/components/units-slider"
import FacilitiesSection from "@/components/facilities-section"
import WhyBuyOffPlan from "@/components/why-buy-off-plan"
import ReservationModal from "@/components/reservation-modal"

export default function HomePage() {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentConceptImage, setCurrentConceptImage] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const conceptImages = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ISB%20residence%201.jpg-ygqUJRW8r4tx6f0FQ66wP523IxcGJH.jpeg",
      alt: "Vue aérienne du complexe résidentiel avec piscines",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ISB%20residence%202.jpg-T3tWpiEpYKGTfKQXUnWkmW0tNNoYmD.jpeg",
      alt: "Vue aérienne montrant les piscines et l'aménagement",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ISB%20residence%203.jpg-pBMr6LAm7VYMuTNfMiECR1iPB9M663.jpeg",
      alt: "Vue de face de l'entrée principale en journée",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ISB%20residence%204.jpg-3WvYsDTghgZMOHFbhMZ4R4M14zYJgN.jpeg",
      alt: "Vue nocturne de l'entrée principale The Life Residence",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ISB%20residence%205.jpg-Oq0DllZRBO2GXkEPgRB4MCN7FGh90L.jpeg",
      alt: "Vue extérieure des maisons individuelles avec jardins privés",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ISB%20residence%206.jpg-TCnamuw5qZ41NYSip5nQjnERPAxQuE.jpeg",
      alt: "Vue intérieure du complexe avec piscines et jardins",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ISB%20residence%207.jpg-y70hesgPmzM6diPbkkIDuYBvcpR6y3.jpeg",
      alt: "Salle de sport/fitness moderne avec équipements",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ISB%20residence%208.jpg-8sAq1eMHp72Ww8jqWPxkKGb6rWuSbW.jpeg",
      alt: "Espace enfants/jeux coloré avec mobilier adapté",
    },
  ]

  const nextConceptImage = () => {
    setCurrentConceptImage((prev) => (prev + 1) % conceptImages.length)
  }

  const prevConceptImage = () => {
    setCurrentConceptImage((prev) => (prev - 1 + conceptImages.length) % conceptImages.length)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextConceptImage()
    }
    if (isRightSwipe) {
      prevConceptImage()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo-isb-immobiliere.png"
                alt="ISB Immobilière Sodaprim Bouaziz"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">The Life Residence</h1>
                <p className="text-xs text-gray-600">ISB immobilière</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#projet" className="text-gray-700 hover:text-custom-beige font-medium text-xl">
                Le Projet
              </Link>
              <Link href="#logements" className="text-gray-700 hover:text-custom-beige font-medium text-xl">
                Les Logements
              </Link>
              <Link href="#contact" className="text-gray-700 hover:text-custom-beige font-medium text-xl">
                Contact
              </Link>
            </nav>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
            </button>
          </div>
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-4 pt-4">
                <Link
                  href="#projet"
                  className="text-gray-700 hover:text-custom-beige font-medium text-lg px-2 py-1 rounded transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Le Projet
                </Link>
                <Link
                  href="#logements"
                  className="text-gray-700 hover:text-custom-beige font-medium text-lg px-2 py-1 rounded transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Les Logements
                </Link>
                <Link
                  href="#contact"
                  className="text-gray-700 hover:text-custom-beige font-medium text-lg px-2 py-1 rounded transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/nouvelle-facade-residence.png"
            alt="The Life Residence - Vue frontale du complexe résidentiel moderne avec entrée principale"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            quality={90}
          />
        </div>

        {/* Top Thin Horizontal Glassmorphism Rectangle */}
        <div className="relative z-10 container mx-auto px-4 pt-8">
          <div className="backdrop-blur-md bg-black/40 border border-white/20 rounded-2xl px-4 sm:px-8 py-4 sm:py-6 shadow-xl max-w-4xl mx-auto">
            <div className="text-center">
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg tracking-wide mb-2 leading-tight">
                The Life Residence
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white drop-shadow-lg font-light leading-relaxed">
                L'art de vivre au cœur de la modernité
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Stats - Clean and Minimal */}
        <div className="absolute bottom-16 left-0 right-0 z-10">
          <div className="container mx-auto px-4">
            <div className="backdrop-blur-sm bg-black/50 rounded-xl px-4 sm:px-8 py-4 sm:py-6 max-w-4xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 text-center">
                <div>
                  <div className="text-xl sm:text-3xl font-bold text-white drop-shadow-md">82</div>
                  <div className="text-xs text-white uppercase tracking-wide font-light drop-shadow-md">
                    Appartements
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-3xl font-bold text-white drop-shadow-md">02</div>
                  <div className="text-xs text-white uppercase tracking-wide font-light drop-shadow-md">Duplex</div>
                </div>
                <div>
                  <div className="text-xl sm:text-3xl font-bold text-white drop-shadow-md">06</div>
                  <div className="text-xs text-white uppercase tracking-wide font-light drop-shadow-md">Villas</div>
                </div>
                <div>
                  <div className="text-lg sm:text-2xl font-bold text-white drop-shadow-md">Fin 2027</div>
                  <div className="text-xs text-white uppercase tracking-wide font-light drop-shadow-md">Livraison</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <ArrowRight className="h-6 w-6 text-white rotate-90 drop-shadow-lg" />
          </div>
        </div>
      </section>

      {/* Le Projet Section */}
      <section id="projet" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-custom-beige-light text-custom-beige-800 rounded-none">Le Projet</Badge>
            <h2 className="text-6xl font-bold text-gray-900 mb-6">Un Concept d'Exception</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Situé sur la route principale face au restaurant El Firma, The Life Residence redéfinit l'art de vivre
              moderne à La Soukra.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Emplacement Privilégié</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-6 w-6 text-custom-beige mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Chotrana 3, La Soukra</h4>
                    <p className="text-gray-600">Rue des fruits</p>
                    <a
                      href="https://maps.app.goo.gl/KTdZAkeXNtD2qfbQ6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-2 text-sm text-custom-beige hover:text-custom-beige/80 font-medium transition-colors duration-200"
                    >
                      <MapPin className="h-4 w-4 mr-1" />
                      Voir sur Google Maps
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="h-6 w-6 text-custom-beige mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Sécurité 24h/24</h4>
                    <p className="text-gray-600">Gardiennage permanent et système de surveillance</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Award className="h-6 w-6 text-custom-beige mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Finitions Haut de Gamme</h4>
                    <p className="text-gray-600">Matériaux premium et finitions très haut standing</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-96 group">
              <div
                className="relative h-full overflow-hidden rounded-lg"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <Image
                  src={conceptImages[currentConceptImage].src || "/placeholder.svg"}
                  alt={conceptImages[currentConceptImage].alt}
                  fill
                  className="object-cover transition-all duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Flèches de navigation */}
              <button
                onClick={prevConceptImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                aria-label="Image précédente"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextConceptImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                aria-label="Image suivante"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Indicateurs de points */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {conceptImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentConceptImage(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentConceptImage ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                    }`}
                    aria-label={`Aller à l'image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Developer Info */}
          <div className="bg-gray-50 p-8 mb-16">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">ISB Immobilière Sodaprim Bouaziz</h3>
              <p className="text-gray-600 mb-6">
                Fondée par des experts avec plus de 20 ans d'expérience dans la promotion immobilière, ISB Immobilière
                Sodaprim Bouaziz a développé une expertise reconnue dans la création de projets d'exception.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Les Logements Section with Slider */}
      <section id="logements" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Units Slider */}
          <UnitsSlider onReserveClick={() => setIsReservationModalOpen(true)} />
        </div>
      </section>

      {/* Facilities Section */}
      <FacilitiesSection />

      {/* Why Buy Off-Plan Section */}
      <WhyBuyOffPlan />

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-custom-beige-light text-custom-beige-800 rounded-none">Contact</Badge>
            <h2 className="text-6xl font-bold text-gray-900 mb-6">Contactez-Nous</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre équipe est à votre disposition pour répondre à toutes vos questions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Informations de Contact</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-custom-beige mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Téléphone</h4>
                    <p className="text-gray-600">+216 58 666 963</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-custom-beige mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">Isbimmobiliere@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-custom-beige mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Adresse</h4>
                    <p className="text-gray-600">Chotrana 3, La Soukra, Tunisie</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-custom-beige mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Localisation</h4>
                    <a
                      href="https://maps.app.goo.gl/KTdZAkeXNtD2qfbQ6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-custom-beige transition-colors"
                    >
                      Voir sur Google Maps
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button size="lg" className="w-full rounded-none bg-custom-beige bg-custom-beige-hover" asChild>
                  <a href="https://wa.me/21658666963" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Discuter sur WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            <Card className="rounded-none border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Demande d'Information</h3>
                <form action="https://formspree.io/f/meoldjwl" method="POST" className="space-y-6">
                  <input type="hidden" name="formType" value="contact" />
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
                        placeholder="prénom"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
                        placeholder="nom"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
                      placeholder="Isbimmobiliere@gmail.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
                      placeholder="+216 58 666 963"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type de logement souhaité</label>
                    <select
                      name="unitType"
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
                    >
                      <option>Sélectionnez un type</option>
                      <option>Appartement S+1</option>
                      <option>Appartement S+2</option>
                      <option>Appartement S+3</option>
                      <option>Duplex</option>
                      <option>Villa</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      rows={4}
                      name="message"
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
                      placeholder="message..."
                    ></textarea>
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full rounded-none bg-transparent text-custom-beige border-2 border-custom-beige hover:bg-custom-beige hover:text-white transition-colors duration-300"
                  >
                    Envoyer la Demande
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building className="h-6 w-6 text-custom-beige-light" />
                <span className="text-xl font-bold">The Life Residence</span>
              </div>
              <p className="text-gray-400 mb-4">
                Un projet résidentiel d'exception par ISB Immobilière Sodaprim Bouaziz.
              </p>
              <div className="flex space-x-4">
                <Button size="sm" className="rounded-none bg-custom-beige bg-custom-beige-hover" asChild>
                  <a href="https://wa.me/21658666963" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-none border-gray-600 text-gray-400 hover:bg-blue-600 hover:text-white bg-transparent"
                  asChild
                >
                  <a href="https://www.facebook.com/isbimmobiliere" target="_blank" rel="noopener noreferrer">
                    <Facebook className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-none border-gray-600 text-gray-400 hover:bg-pink-600 hover:text-white bg-transparent"
                  asChild
                >
                  <a href="https://www.instagram.com/isbimmobiliere/" target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Le Projet</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-custom-beige-light">
                    Concept
                  </Link>
                </li>
                <li>
                  <a
                    href="https://maps.app.goo.gl/KTdZAkeXNtD2qfbQ6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-custom-beige-light"
                  >
                    Localisation
                  </a>
                </li>
                <li>
                  <Link href="#" className="hover:text-custom-beige-light">
                    Avantages
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-custom-beige-light">
                    Promoteur
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Logements</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/logements/s1" className="hover:text-custom-beige-light">
                    Appartements S+1
                  </Link>
                </li>
                <li>
                  <Link href="/logements/s2" className="hover:text-custom-beige-light">
                    Appartements S+2
                  </Link>
                </li>
                <li>
                  <Link href="/logements/s3" className="hover:text-custom-beige-light">
                    Appartements S+3
                  </Link>
                </li>
                <li>
                  <Link href="/logements/duplex" className="hover:text-custom-beige-light">
                    Duplex
                  </Link>
                </li>
                <li>
                  <Link href="/logements/villa" className="hover:text-custom-beige-light">
                    Villas
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Informations</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/faq" className="text-custom-beige-light hover:text-custom-beige transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>Chotrana 3, La Soukra</li>
                <li>+216 58 666 963</li>
                <li>Isbimmobiliere@gmail.com</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              {"© 2025 ISB Immobilière Sodaprim Bouaziz. All rights reserved. Created by "}
              <a
                href="https://fideliziagency.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-custom-beige-light hover:text-custom-beige transition-colors"
              >
                Fidelizi Agency
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Reservation Modal */}
      <ReservationModal isOpen={isReservationModalOpen} onClose={() => setIsReservationModalOpen(false)} />
    </div>
  )
}
