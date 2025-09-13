"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
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

import UnitsSlider from "@/components/units-slider"
import FacilitiesSection from "@/components/facilities-section"
import WhyBuyOffPlan from "@/components/why-buy-off-plan"
import ReservationModal from "@/components/reservation-modal"
import ContactForm from "@/components/contact-form"

export default function HomePage() {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentConceptImage, setCurrentConceptImage] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const conceptImages = [
    { src: "/residence1.jpg", alt: "Vue aérienne du complexe résidentiel avec piscines" },
    { src: "/residence2.jpg", alt: "Vue aérienne montrant les piscines et l'aménagement" },
    { src: "/residence3.jpg", alt: "Vue de face de l'entrée principale en journée" },
    { src: "/residence4.jpg", alt: "Vue nocturne de l'entrée principale The Life Residence" },
    { src: "/residence5.jpg", alt: "Vue extérieure des maisons individuelles avec jardins privés" },
    { src: "/residence6.jpg", alt: "Vue intérieure du complexe avec piscines et jardins" },
    { src: "/residence7.jpg", alt: "Salle de sport/fitness moderne avec équipements" },
    { src: "/residence8.jpg", alt: "Espace enfants/jeux coloré avec mobilier adapté" },
  ]

  const nextConceptImage = () => setCurrentConceptImage((prev) => (prev + 1) % conceptImages.length)
  const prevConceptImage = () => setCurrentConceptImage((prev) => (prev - 1 + conceptImages.length) % conceptImages.length)
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX)
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX)
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > 50) nextConceptImage()
    if (distance < -50) prevConceptImage()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image src="/logo-isb-immobiliere.png" alt="ISB Immobilière Sodaprim Bouaziz" width={32} height={32} className="h-8 w-8 object-contain"/>
            <div>
              <h1 className="text-xl font-bold text-gray-900">The Life Residence</h1>
              <p className="text-xs text-gray-600">ISB immobilière</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#projet" className="text-gray-700 hover:text-custom-beige font-medium text-xl">Le Projet</Link>
            <Link href="#logements" className="text-gray-700 hover:text-custom-beige font-medium text-xl">Les Logements</Link>
            <Link href="#contact" className="text-gray-700 hover:text-custom-beige font-medium text-xl">Contact</Link>
          </nav>
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6 text-gray-700"/> : <Menu className="h-6 w-6 text-gray-700"/>}
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4 pt-4">
              <Link href="#projet" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 hover:text-custom-beige font-medium text-lg px-2 py-1 rounded transition-colors">Le Projet</Link>
              <Link href="#logements" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 hover:text-custom-beige font-medium text-lg px-2 py-1 rounded transition-colors">Les Logements</Link>
              <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 hover:text-custom-beige font-medium text-lg px-2 py-1 rounded transition-colors">Contact</Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <Image src="/nouvelle-facade-residence.png" alt="The Life Residence - Vue frontale" fill className="object-cover" priority/>
        <div className="relative z-10 container mx-auto px-4 pt-8 text-center">
          <div className="backdrop-blur-md bg-black/40 border border-white/20 rounded-2xl px-8 py-6 max-w-4xl mx-auto shadow-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-2">The Life Residence</h1>
            <p className="text-lg md:text-xl text-white drop-shadow-lg font-light">L'art de vivre au cœur de la modernité</p>
          </div>
        </div>
      </section>

      {/* Le Projet Section */}
      <section id="projet" className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center mb-16">
          <Badge className="mb-4 bg-custom-beige-light text-custom-beige-800 rounded-none">Le Projet</Badge>
          <h2 className="text-6xl font-bold text-gray-900 mb-6">Un Concept d'Exception</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Situé sur la route principale face au restaurant El Firma, The Life Residence redéfinit l'art de vivre moderne à La Soukra.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Emplacement Privilégié</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-6 w-6 text-custom-beige mt-1"/>
                <div>
                  <h4 className="font-semibold text-gray-900">Chotrana 3, La Soukra</h4>
                  <p className="text-gray-600">Rue des fruits</p>
                  <a href="https://maps.app.goo.gl/KTdZAkeXNtD2qfbQ6" target="_blank" rel="noopener noreferrer" className="inline-flex items-center mt-2 text-sm text-custom-beige hover:text-custom-beige/80 font-medium transition-colors duration-200">
                    <MapPin className="h-4 w-4 mr-1"/>Voir sur Google Maps
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3"><Shield className="h-6 w-6 text-custom-beige mt-1"/><div><h4 className="font-semibold text-gray-900">Sécurité 24h/24</h4><p className="text-gray-600">Gardiennage permanent et système de surveillance</p></div></div>
              <div className="flex items-start space-x-3"><Award className="h-6 w-6 text-custom-beige mt-1"/><div><h4 className="font-semibold text-gray-900">Finitions Haut de Gamme</h4><p className="text-gray-600">Matériaux premium et finitions très haut standing</p></div></div>
            </div>
          </div>

          {/* Slider Concept Images */}
          <div className="relative h-96 group" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
            <Image src={conceptImages[currentConceptImage].src} alt={conceptImages[currentConceptImage].alt} fill className="object-cover transition-all duration-500"/>
            <button onClick={prevConceptImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" aria-label="Image précédente"><ChevronLeft className="h-5 w-5"/></button>
            <button onClick={nextConceptImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" aria-label="Image suivante"><ChevronRight className="h-5 w-5"/></button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
              {conceptImages.map((_, index) => (
                <button key={index} onClick={() => setCurrentConceptImage(index)} className={`w-2 h-2 rounded-full transition-all duration-300 ${index===currentConceptImage ? "bg-white scale-125":"bg-white/50 hover:bg-white/75"}`} aria-label={`Aller à l'image ${index+1}`} />
              ))}
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
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Notre équipe est à votre disposition pour répondre à toutes vos questions.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Informations de Contact</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-custom-beige mt-1"/>
                  <div>
                    <h4 className="font-semibold text-gray-900">Téléphone</h4>
                    <p className="text-gray-600">+216 71 234 567</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-custom-beige mt-1"/>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">contact@isbimmobiliere.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-custom-beige mt-1"/>
                  <div>
                    <h4 className="font-semibold text-gray-900">Adresse</h4>
                    <p className="text-gray-600">Chotrana 3, La Soukra, Tunis</p>
                  </div>
                </div>
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
    </div>
  )
}
