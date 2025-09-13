"use client"
import { useForm } from "@formspree/react" // 👈 Ajoutez cette ligne
import { CardContent } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Badge } from "@/components/ui/badge"

import type React from "react"
import {
  ArrowLeft,
  Home,
  Ruler,
  Bed,
  Wifi,
  Shield,
  Thermometer,
  Zap,
  Droplets,
  Wind,
  Eye,
  ChevronLeft,
  ChevronRight,
  Camera,
  Tv,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import PlanLightbox from "@/components/plan-lightbox"
import { useState, useEffect } from "react"
import ContactForm from "@/components/contact-form"

export default function DuplexPage() {
  const [state, handleSubmit] = useForm("meoldjwl") // 👈 Utilisez votre ID Formspree
  const [showPlanLightbox, setShowPlanLightbox] = useState(false)
  const [currentPlanIndex, setCurrentPlanIndex] = useState(0)
  const [lightboxStartIndex, setLightboxStartIndex] = useState(0)
  const [currentCoverIndex, setCurrentCoverIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [planTouchStart, setPlanTouchStart] = useState(0)
  const [planTouchEnd, setPlanTouchEnd] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const coverImages = [
    {
      src: "/duplex-new-living-staircase.png",
      alt: "Salon Duplex - Vue d'ensemble avec escalier",
    },
    {
      src: "/duplex-new-open-living.png",
      alt: "Salon Duplex - Espace de vie ouvert",
    },
    {
      src: "/duplex-new-kitchen-dining.png",
      alt: "Cuisine Duplex - Espace cuisine et salle à manger",
    },
  ]

  const nextCoverImage = () => {
    setCurrentCoverIndex((prev) => (prev + 1) % coverImages.length)
  }

  const prevCoverImage = () => {
    setCurrentCoverIndex((prev) => (prev - 1 + coverImages.length) % coverImages.length)
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
      nextCoverImage()
    }
    if (isRightSwipe) {
      prevCoverImage()
    }
  }

  const specifications = [
    { icon: Ruler, label: "Surface", value: "221-254 m²" },
    { icon: Bed, label: "RDC", value: "Salon, salle à manger, cuisine" },
    { icon: Home, label: "Étage", value: "3 suites" },
    { icon: Droplets, label: "Salle d'eau", value: "1 salle d'eau" },
    { icon: Home, label: "Niveaux", value: "2 niveaux" },
    { icon: Droplets, label: "Piscine privée", value: "Incluse" },
  ]

  const equipments = [
    { icon: Home, text: "Cuisine équipée avec îlot central" },
    { icon: Thermometer, text: "Climatisation dans toutes les pièces" },
    { icon: null, text: "Revêtement premium dans toutes les pièces" },
    { icon: null, text: "Menuiserie aluminium à rupture thermique" },
    { icon: Camera, text: "Interphone vidéo couleur" },
    { icon: Tv, text: "Pré-installation satellite et internet fibre" },
    { icon: Shield, text: "Isolation thermique et phonique renforcée" },
  ]

  const features = [
    { icon: Wifi, label: "Pré-câblage internet fibre" },
    { icon: Shield, label: "Sécurité 24h/24" },
    { icon: Thermometer, label: "Climatisation multi-zones" },
    { icon: Zap, label: "Installation électrique premium" },
    { icon: Droplets, label: "Plomberie haut de gamme" },
    { icon: Wind, label: "VMC double flux" },
  ]

  const duplexPlans = [
    {
      src: "/duplex-plan-fd01.png",
      alt: "Plan Duplex - Appartement FD.01 (Duplex Bloc F)",
      title: "Plan Duplex - Appartement FD.01 (Duplex Bloc F) - 254 m²",
    },
    {
      src: "/duplex-plan-gd05.png",
      alt: "Plan Duplex - Appartement GD.05 (Duplex Bloc G)",
      title: "Plan Duplex - Appartement GD.05 (Duplex Bloc G) - 221 m²",
    },
  ]

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

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact-section")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handlePlanTouchStart = (e: React.TouchEvent) => {
    setPlanTouchStart(e.targetTouches[0].clientX)
  }

  const handlePlanTouchMove = (e: React.TouchEvent) => {
    setPlanTouchEnd(e.targetTouches[0].clientX)
  }

  const handlePlanTouchEnd = () => {
    if (!planTouchStart || !planTouchEnd) return
    const distance = planTouchStart - planTouchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextPlan()
    }
    if (isRightSwipe) {
      prevPlan()
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
            <div className="flex items-center space-x-3"></div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-12 py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 mb-6 md:mb-6 mb-4">
            <Link href="/" className="text-gray-500 hover:text-custom-beige">
              Accueil
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/#logements" className="text-gray-500 hover:text-custom-beige">
              Logements
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">Duplex de Prestige</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 md:gap-12 gap-8 items-start">
            <div>
              <Badge className="mb-4 bg-custom-beige text-white rounded-none">Duplex de Prestige</Badge>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">Duplex de Prestige</h1>

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
              <div
                className="relative h-96 overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="flex transition-transform duration-500 ease-in-out h-full"
                  style={{ transform: `translateX(-${currentCoverIndex * 100}%)` }}
                >
                  {coverImages.map((image, index) => (
                    <div key={index} className="w-full flex-shrink-0 relative">
                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        width={600}
                        height={400}
                        className="w-full h-96 object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevCoverImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-custom-beige/90 border-white text-white hover:bg-custom-beige z-10"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextCoverImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-custom-beige/90 border-white text-white hover:bg-custom-beige z-10"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>

                {/* Dots Navigation */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {coverImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentCoverIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentCoverIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="absolute top-4 right-4">
                <Badge className="bg-custom-beige text-white rounded-none">2 Unités Disponibles</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-16 md:py-16 py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-12 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Plans et Agencement</h2>
            <p className="text-lg text-gray-600">Un agencement exceptionnel sur 2 niveaux</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Duplex FD.01 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-80 cursor-pointer group" onClick={() => openLightbox(0)}>
                  <Image
                    src="/duplex-plan-fd01.png"
                    alt="Plan Duplex - Appartement FD.01 (Duplex Bloc F)"
                    fill
                    className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <Eye className="h-4 w-4 text-custom-beige opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <h3 className="text-lg font-bold text-gray-900 text-center">Duplex FD.01</h3>
                  <p className="text-sm text-gray-600 text-center">254 m² • Bloc F • 2 niveaux</p>
                </div>
              </div>

              {/* Duplex GD.05 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-80 cursor-pointer group" onClick={() => openLightbox(1)}>
                  <Image
                    src="/duplex-plan-gd05.png"
                    alt="Plan Duplex - Appartement GD.05 (Duplex Bloc G)"
                    fill
                    className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <Eye className="h-4 w-4 text-custom-beige opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <h3 className="text-lg font-bold text-gray-900 text-center">Duplex GD.05</h3>
                  <p className="text-sm text-gray-600 text-center">221 m² • Bloc G • 2 niveaux</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-16 py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-12 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Caractéristiques Techniques</h2>
            <p className="text-lg text-gray-600">Des équipements d'exception pour un confort absolu</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 md:mb-12 mb-8">
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
      <section className="py-16 md:py-16 py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-12 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Galerie Photos</h2>
            <p className="text-lg text-gray-600">Découvrez l'exception et le raffinement du duplex</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative group cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/duplex-new-living-staircase.png"
                  alt="Salon Duplex - Vue d'ensemble avec escalier"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/duplex-new-open-living.png"
                  alt="Salon Duplex - Espace de vie ouvert"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/duplex-new-kitchen-dining.png"
                  alt="Cuisine Duplex - Espace cuisine et salle à manger"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation to Other Types */}
      <section className="py-12 md:py-12 py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8 md:mb-8 mb-6">
            Découvrez Nos Autres Logements
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-6 gap-4">
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

            <Link href="/logements/s2">
              <Card className="rounded-none border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <div className="relative h-48">
                  <Image src="/s2-modern-living-room-hero.png" alt="Appartement S+2" fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Appartement S+2</h4>
                  <p className="text-gray-600 mb-3">3 pièces • 87-136 m² • 30 unités</p>
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
                  <p className="text-gray-600 mb-3">4 pièces • 139-208 m² • 22 unités</p>
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

      {/* Plan Lightbox */}
      <PlanLightbox
        isOpen={showPlanLightbox}
        onClose={() => setShowPlanLightbox(false)}
        plans={duplexPlans}
        initialIndex={lightboxStartIndex}
      />

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
                    <p className="text-gray-600">+216 71 234 567</p>
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
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
