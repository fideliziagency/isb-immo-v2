"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Shield, Award, Menu, X, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react"

import UnitsSlider from "@/components/units-slider"
import FacilitiesSection from "@/components/facilities-section"
import WhyBuyOffPlan from "@/components/why-buy-off-plan"
import ReservationModal from "@/components/reservation-modal"
import ContactForm from "@/components/contact-form"

export default function HomePage() {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentConceptImage, setCurrentConceptImage] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const conceptImages = [
    { src: "/isb-residence-1.jpg", alt: "Vue aérienne complète du projet architectural" },
    { src: "/isb-residence-2.jpg", alt: "Vue aérienne du plan masse montrant la disposition des bâtiments" },
    { src: "/isb-residence-3.jpg", alt: "Vue de face de l'entrée principale The Life Residence" },
    { src: "/isb-residence-4.jpg", alt: "Vue nocturne du complexe avec éclairage architectural" },
    { src: "/isb-residence-5.jpg", alt: "Vue des villas individuelles avec architecture contemporaine" },
    { src: "/isb-residence-6.jpg", alt: "Vue aérienne du complexe avec piscines et espaces verts" },
    { src: "/isb-residence-7.jpg", alt: "Intérieur salle de sport/fitness moderne avec équipements" },
    { src: "/isb-residence-8.jpg", alt: "Intérieur salle de jeux pour enfants avec vue sur les espaces extérieurs" },
  ]

  const nextConceptImage = () => setCurrentConceptImage((prev) => (prev + 1) % conceptImages.length)
  const prevConceptImage = () =>
    setCurrentConceptImage((prev) => (prev - 1 + conceptImages.length) % conceptImages.length)

  const openLightbox = (index: number) => {
    setLightboxImageIndex(index)
    setIsLightboxOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    document.body.style.overflow = "unset"
  }

  const nextLightboxImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setLightboxImageIndex((prev) => (prev + 1) % conceptImages.length)
  }

  const prevLightboxImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setLightboxImageIndex((prev) => (prev - 1 + conceptImages.length) % conceptImages.length)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isLightboxOpen) return
    if (e.key === "Escape") closeLightbox()
    if (e.key === "ArrowLeft") prevLightboxImage()
    if (e.key === "ArrowRight") nextLightboxImage()
  }

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX)
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX)
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > 50) nextConceptImage()
    if (distance < -50) prevConceptImage()
  }

  const handleLightboxTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation()
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleLightboxTouchMove = (e: React.TouchEvent) => {
    e.stopPropagation()
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleLightboxTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation()
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > 50) nextLightboxImage()
    if (distance < -50) prevLightboxImage()
  }

  return (
    <div className="min-h-screen bg-gray-50" onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
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

          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
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
            <a
              href="https://wa.me/21658666963"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-custom-beige hover:bg-custom-beige-hover text-white px-4 py-2 rounded-none flex items-center space-x-2 transition-colors duration-200 font-medium w-fit"
              aria-label="Contactez-nous sur WhatsApp"
            >
              <MessageCircle className="h-5 w-5" />
              <span>WhatsApp</span>
            </a>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4 pt-4 px-4">
              <Link
                href="#projet"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 hover:text-custom-beige font-medium text-lg px-2 py-1 rounded transition-colors"
              >
                Le Projet
              </Link>
              <Link
                href="#logements"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 hover:text-custom-beige font-medium text-lg px-2 py-1 rounded transition-colors"
              >
                Les Logements
              </Link>
              <Link
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 hover:text-custom-beige font-medium text-lg px-2 py-1 rounded transition-colors"
              >
                Contact
              </Link>
              <a
                href="https://wa.me/21658666963"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-custom-beige hover:bg-custom-beige-hover text-white px-4 py-2 rounded-none flex items-center space-x-2 transition-colors duration-200 font-medium w-fit"
                aria-label="Contactez-nous sur WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Contactez-nous sur WhatsApp</span>
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <Image
          src="/nouvelle-facade-residence.png"
          alt="The Life Residence - Vue frontale"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-10 container mx-auto px-4 pt-8 text-center">
          <div className="backdrop-blur-md bg-black/40 border border-white/20 px-8 py-6 max-w-4xl mx-auto shadow-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-2">The Life Residence</h1>
            <p className="text-lg md:text-xl text-white drop-shadow-lg font-light">
              L'art de vivre au cœur de la modernité
            </p>
          </div>
        </div>
      </section>

      {/* Le Projet Section */}
      <section id="projet" className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center mb-16">
          <Badge className="mb-4 bg-custom-beige-light text-custom-beige-800 rounded-none">Le Projet</Badge>
          <h2 className="text-6xl font-bold text-gray-900 mb-6">Un concept d'exception</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Situé sur la route principale face au restaurant El Firma, The Life Residence redéfinit l'art de vivre
            moderne à La Soukra.
          </p>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Colonne gauche - Informations */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Emplacement privilégié</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-6 w-6 text-custom-beige mt-1 flex-shrink-0" />
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
                  <Shield className="h-6 w-6 text-custom-beige mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Sécurité 24h/24</h4>
                    <p className="text-gray-600">Gardiennage permanent et système de surveillance</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Award className="h-6 w-6 text-custom-beige mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Finitions haut de gamme</h4>
                    <p className="text-gray-600">Matériaux premium et finitions très haut standing</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne droite - Slider d'images */}
            <div className="relative">
              {/* Container du slider avec effet de glissement */}
              <div
                className="relative h-96 rounded-lg overflow-hidden cursor-grab active:cursor-grabbing"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Images du slider */}
                <div
                  className="flex transition-transform duration-500 ease-in-out h-full"
                  style={{ transform: `translateX(-${currentConceptImage * 100}%)` }}
                >
                  {conceptImages.map((image, index) => (
                    <div key={index} className="w-full h-full flex-shrink-0 relative">
                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        fill
                        className="object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openLightbox(index)}
                      />
                    </div>
                  ))}
                </div>

                {/* Flèches de navigation */}
                <button
                  onClick={prevConceptImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 z-10"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                  onClick={nextConceptImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 z-10"
                  aria-label="Image suivante"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Indicateurs de pagination */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                  {conceptImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentConceptImage(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentConceptImage ? "bg-white scale-125" : "bg-white/60 hover:bg-white/80"
                      }`}
                      aria-label={`Aller à l'image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logements Section */}
      <section id="logements" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <UnitsSlider onReserveClick={() => setIsReservationModalOpen(true)} />
        </div>
      </section>

      {/* Facilities & Why Buy */}
      <FacilitiesSection />
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
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Informations de contact</h3>
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
                    <p className="text-gray-600">contact@isbimmobiliere.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-custom-beige mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Adresse</h4>
                    <p className="text-gray-600">Chotrana 3, La Soukra, Tunis</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="https://wa.me/21658666963"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-custom-beige hover:bg-custom-beige-hover text-white px-4 py-2 rounded-none flex items-center space-x-2 transition-colors duration-200 font-medium w-fit"
                  aria-label="Contactez-nous sur WhatsApp"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Contactez-nous sur WhatsApp</span>
                </a>
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Modal */}
      <ReservationModal isOpen={isReservationModalOpen} onClose={() => setIsReservationModalOpen(false)} />

      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={closeLightbox}>
          <div className="relative w-full h-full max-w-6xl max-h-full flex items-center justify-center">
            {/* Image principale */}
            <div
              className="relative w-full h-full max-w-5xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleLightboxTouchStart}
              onTouchMove={handleLightboxTouchMove}
              onTouchEnd={handleLightboxTouchEnd}
            >
              <Image
                src={conceptImages[lightboxImageIndex].src || "/placeholder.svg"}
                alt={conceptImages[lightboxImageIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {/* Bouton fermer */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                closeLightbox()
              }}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-all duration-200 backdrop-blur-sm z-10"
              aria-label="Fermer la lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            <button
              onClick={prevLightboxImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-all duration-200 backdrop-blur-sm z-10"
              aria-label="Image précédente"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            <button
              onClick={nextLightboxImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-all duration-200 backdrop-blur-sm z-10"
              aria-label="Image suivante"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            {/* Indicateurs de pagination */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
              {conceptImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    setLightboxImageIndex(index)
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === lightboxImageIndex ? "bg-white scale-125" : "bg-white/60 hover:bg-white/80"
                  }`}
                  aria-label={`Aller à l'image ${index + 1}`}
                />
              ))}
            </div>

            {/* Compteur d'images (mobile) */}
            <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm md:hidden">
              {lightboxImageIndex + 1} / {conceptImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
