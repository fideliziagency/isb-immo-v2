"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import PlanLightbox from "@/components/plan-lightbox"
import CoverLightbox from "@/components/cover-lightbox"
import GalleryLightbox from "@/components/gallery-lightbox"
import { useState, useEffect } from "react"
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
  MessageCircle,
  Eye,
  Trees,
  Camera,
  Tv,
  Car,
  Phone,
  Mail,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ContactForm from "@/components/contact-form"

export default function VillaPage() {
  const [showPlanLightbox, setShowPlanLightbox] = useState(false)
  const [currentPlanIndex, setCurrentPlanIndex] = useState(0)
  const [lightboxStartIndex, setLightboxStartIndex] = useState(0)
  const [currentHeroImageIndex, setCurrentHeroImageIndex] = useState(0)
  const [showCoverLightbox, setShowCoverLightbox] = useState(false)
  const [coverLightboxIndex, setCoverLightboxIndex] = useState(0)
  const [showGalleryLightbox, setShowGalleryLightbox] = useState(false)
  const [galleryLightboxIndex, setGalleryLightboxIndex] = useState(0)
  const [villaSpecificPlans, setVillaSpecificPlans] = useState<typeof villaPlans>([])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const heroGalleryImages = [
    {
      src: "/villa-h1-exterior.jpg",
      alt: "Extérieur Villa - Façade moderne avec jardin paysager",
    },
    {
      src: "/villa-h5.jpg",
      alt: "Salon Villa - Salon moderne avec grandes baies vitrées",
    },
    {
      src: "/villa-h3.jpg",
      alt: "Salon Villa - Salon contemporain avec TV murale et lustre design",
    },
    {
      src: "/villa-h2.jpg",
      alt: "Cuisine Villa - Cuisine moderne avec îlot central en marbre",
    },
    {
      src: "/villa-h6.jpg",
      alt: "Suite Villa - Chambre moderne avec design contemporain",
    },
    {
      src: "/villa-h4.jpg",
      alt: "Piscine Villa - Terrasse avec piscine et salon extérieur",
    },
  ]

  const galleryImages = [
    {
      src: "/villa-h1-exterior.jpg",
      alt: "Extérieur Villa - Façade moderne avec jardin paysager",
    },
    {
      src: "/villa-h5.jpg",
      alt: "Salon Villa - Salon moderne avec grandes baies vitrées",
    },
    {
      src: "/villa-h3.jpg",
      alt: "Salon Villa - Salon contemporain avec TV murale et lustre design",
    },
    {
      src: "/villa-h2.jpg",
      alt: "Cuisine Villa - Cuisine moderne avec îlot central en marbre",
    },
    {
      src: "/villa-h6.jpg",
      alt: "Suite Villa - Chambre moderne avec design contemporain",
    },
    {
      src: "/villa-h4.jpg",
      alt: "Piscine Villa - Terrasse avec piscine et salon extérieur",
    },
  ]

  const nextHeroImage = () => {
    setCurrentHeroImageIndex((prev) => (prev + 1) % heroGalleryImages.length)
  }

  const prevHeroImage = () => {
    setCurrentHeroImageIndex((prev) => (prev - 1 + heroGalleryImages.length) % heroGalleryImages.length)
  }

  const openCoverLightbox = (index: number) => {
    setCoverLightboxIndex(index)
    setShowCoverLightbox(true)
  }

  const openGalleryLightbox = (index: number) => {
    setGalleryLightboxIndex(index)
    setShowGalleryLightbox(true)
  }

  const openVillaLightbox = (villaNumber: number, planIndex: number) => {
    const villaStartIndex = (villaNumber - 1) * 2
    let villaPlansOnly
    if (villaNumber === 1) {
      // Pour Villa 1, inverser l'ordre : sous-sol en premier, rez-de-chaussée en second
      villaPlansOnly = [villaPlans[villaStartIndex + 1], villaPlans[villaStartIndex]]
    } else {
      // Pour toutes les autres villas, garder l'ordre normal
      villaPlansOnly = [villaPlans[villaStartIndex], villaPlans[villaStartIndex + 1]]
    }
    setCurrentPlanIndex(planIndex)
    setLightboxStartIndex(planIndex)
    setShowPlanLightbox(true)
    setVillaSpecificPlans(villaPlansOnly)
  }

  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

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
      nextHeroImage()
    }
    if (isRightSwipe) {
      prevHeroImage()
    }
  }

  const specifications = [
    { icon: Ruler, label: "Surface", value: "353-357 m²" },
    { icon: Bed, label: "RDC", value: "Salon, salle à manger, cuisine" },
    { icon: Bath, label: "Étage", value: "3 suites" },
    { icon: Trees, label: "Jardin", value: "60-219 m²" },
    { icon: Home, label: "Niveaux", value: "2 niveaux + sous-sol" },
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
    { icon: Droplets, text: "Piscine privée incluse" },
    { icon: Car, text: "Garage privé sous-sol" },
  ]

  const features = [
    { icon: Wifi, label: "Pré-câblage internet fibre" },
    { icon: Shield, label: "Sécurité 24h/24" },
    { icon: Thermometer, label: "Climatisation multi-zones" },
    { icon: Zap, label: "Installation électrique premium" },
    { icon: Droplets, label: "Plomberie haut de gamme" },
    { icon: Wind, label: "VMC double flux" },
  ]

  const villaPlans = [
    {
      src: "/villa-1-ground-floor.png",
      alt: "Plan Villa 1 - Rez-de-chaussée",
      title: "Plan Villa 1 - sous-sol - 357 m²",
    },
    {
      src: "/villa-1-upper-floor.png",
      alt: "Plan Villa 1 - Sous-sol",
      title: "Plan Villa 1 - Rez-de-chaussée - 357 m²",
    },
    {
      src: "/villa-2-ground-floor.png",
      alt: "Plan Villa 2 - Rez-de-chaussée",
      title: "Plan Villa 2 - Rez-de-chaussée - 355 m²",
    },
    {
      src: "/villa-2-upper-floor.png",
      alt: "Plan Villa 2 - Sous-sol",
      title: "Plan Villa 2 - Sous-sol - 355 m²",
    },
    {
      src: "/villa-3-ground-floor.png",
      alt: "Plan Villa 3 - Rez-de-chaussée",
      title: "Plan Villa 3 - Rez-de-chaussée - 354 m²",
    },
    {
      src: "/villa-3-upper-floor.png",
      alt: "Plan Villa 3 - Sous-sol",
      title: "Plan Villa 3 - Sous-sol - 354 m²",
    },
    {
      src: "/villa-4-ground-floor.png",
      alt: "Plan Villa 4 - Rez-de-chaussée",
      title: "Plan Villa 4 - Rez-de-chaussée - 353 m²",
    },
    {
      src: "/villa-4-upper-floor.png",
      alt: "Plan Villa 4 - Sous-sol",
      title: "Plan Villa 4 - Sous-sol - 353 m²",
    },
    {
      src: "/villa-5-ground-floor.png",
      alt: "Plan Villa 5 - Rez-de-chaussée",
      title: "Plan Villa 5 - Rez-de-chaussée - 356 m²",
    },
    {
      src: "/villa-5-upper-floor.png",
      alt: "Plan Villa 5 - Sous-sol",
      title: "Plan Villa 5 - Sous-sol - 356 m²",
    },
    {
      src: "/villa-6-ground-floor.png",
      alt: "Plan Villa 6 - Rez-de-chaussée",
      title: "Plan Villa 6 - Rez-de-chaussée - 355 m²",
    },
    {
      src: "/villa-6-upper-floor.png",
      alt: "Plan Villa 6 - Sous-sol",
      title: "Plan Villa 6 - Sous-sol - 355 m²",
    },
  ]

  const nextPlan = () => {
    setCurrentPlanIndex((prev) => (prev + 1) % villaSpecificPlans.length)
  }

  const prevPlan = () => {
    setCurrentPlanIndex((prev) => (prev - 1 + villaSpecificPlans.length) % villaSpecificPlans.length)
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
            <div className="flex items-center space-x-3"></div>
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
            <span className="text-gray-900">Villa Individuelle</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <Badge className="mb-4 bg-custom-beige text-white rounded-none">Villa Individuelle</Badge>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">Villa individuelle</h1>

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
            </div>

            <div className="relative">
              <div
                className="relative h-96 overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <Image
                  src={heroGalleryImages[currentHeroImageIndex].src || "/placeholder.svg"}
                  alt={heroGalleryImages[currentHeroImageIndex].alt}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-opacity duration-300 cursor-pointer"
                  onClick={() => openCoverLightbox(currentHeroImageIndex)}
                />

                <button
                  onClick={prevHeroImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200 z-10"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  onClick={nextHeroImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200 z-10"
                  aria-label="Image suivante"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {heroGalleryImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentHeroImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                        index === currentHeroImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                      aria-label={`Aller à l'image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="absolute top-4 right-4">
                <Badge className="bg-custom-beige text-white rounded-none">6 Unités disponibles</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Plans et agencement</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Villa 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="grid grid-cols-2 gap-2 p-4">
                <div className="relative h-48 cursor-pointer group" onClick={() => openVillaLightbox(1, 0)}>
                  <Image
                    src="/villa-1-ground-floor.png"
                    alt="Plan Villa 1 - RDC"
                    fill
                    className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <Eye className="h-4 w-4 text-custom-beige opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="relative h-48 cursor-pointer group" onClick={() => openVillaLightbox(1, 1)}>
                  <Image
                    src="/villa-1-upper-floor.png"
                    alt="Plan Villa 1 - Sous-sol"
                    fill
                    className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <Eye className="h-4 w-4 text-custom-beige opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </div>
              <div className="px-4 pb-4">
                <h3 className="text-lg font-bold text-gray-900 text-center">Villa 1</h3>
                <p className="text-sm text-gray-600 text-center">357 m² • RDC + Étage</p>
              </div>
            </div>

            {/* Villa 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="grid grid-cols-2 gap-2 p-4">
                <div className="relative h-48 cursor-pointer group" onClick={() => openVillaLightbox(2, 0)}>
                  <Image
                    src="/villa-2-ground-floor.png"
                    alt="Plan Villa 2 - RDC"
                    fill
                    className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <Eye className="h-4 w-4 text-custom-beige opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="relative h-48 cursor-pointer group" onClick={() => openVillaLightbox(2, 1)}>
                  <Image
                    src="/villa-2-upper-floor.png"
                    alt="Plan Villa 2 - Sous-sol"
                    fill
                    className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <Eye className="h-4 w-4 text-custom-beige opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </div>
              <div className="px-4 pb-4">
                <h3 className="text-lg font-bold text-gray-900 text-center">Villa 2</h3>
                <p className="text-sm text-gray-600 text-center">355 m² • RDC + Étage</p>
              </div>
            </div>

            {/* Villa 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="grid grid-cols-2 gap-2 p-4">
                <div className="relative h-48 cursor-pointer group" onClick={() => openVillaLightbox(3, 0)}>
                  <Image
                    src="/villa-3-ground-floor.png"
                    alt="Plan Villa 3 - RDC"
                    fill
                    className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <Eye className="h-4 w-4 text-custom-beige opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="relative h-48 cursor-pointer group" onClick={() => openVillaLightbox(3, 1)}>
                  <Image
                    src="/villa-3-upper-floor.png"
                    alt="Plan Villa 3 - Sous-sol"
                    fill
                    className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <Eye className="h-4 w-4 text-custom-beige opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </div>
              <div className="px-4 pb-4">
                <h3 className="text-lg font-bold text-gray-900 text-center">Villa 3</h3>
                <p className="text-sm text-gray-600 text-center">354 m² • RDC + Étage</p>
              </div>
            </div>

            {/* Villa 4 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="grid grid-cols-2 gap-2 p-4">
                <div className="relative h-48 cursor-pointer group" onClick={() => openVillaLightbox(4, 0)}>
                  <Image
                    src="/villa-4-ground-floor.png"
                    alt="Plan Villa 4 - RDC"
                    fill
                    className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <Eye className="h-4 w-4 text-custom-beige opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="relative h-48 cursor-pointer group" onClick={() => openVillaLightbox(4, 1)}>
                  <Image
                    src="/villa-4-upper-floor.png"
                    alt="Plan Villa 4 - Sous-sol"
                    fill
                    className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <Eye className="h-4 w-4 text-custom-beige opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </div>
              <div className="px-4 pb-4">
                <h3 className="text-lg font-bold text-gray-900 text-center">Villa 4</h3>
                <p className="text-sm text-gray-600 text-center">353 m² • RDC + Étage</p>
              </div>
            </div>

            {/* Villa 5 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="grid grid-cols-2 gap-2 p-4">
                <div className="relative h-48 cursor-pointer group" onClick={() => openVillaLightbox(5, 0)}>
                  <Image
                    src="/villa-5-ground-floor.png"
                    alt="Plan Villa 5 - RDC"
                    fill
                    className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <Eye className="h-4 w-4 text-custom-beige opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="relative h-48 cursor-pointer group" onClick={() => openVillaLightbox(5, 1)}>
                  <Image
                    src="/villa-5-upper-floor.png"
                    alt="Plan Villa 5 - Sous-sol"
                    fill
                    className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <Eye className="h-4 w-4 text-custom-beige opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </div>
              <div className="px-4 pb-4">
                <h3 className="text-lg font-bold text-gray-900 text-center">Villa 5</h3>
                <p className="text-sm text-gray-600 text-center">356 m² • RDC + Étage</p>
              </div>
            </div>

            {/* Villa 6 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="grid grid-cols-2 gap-2 p-4">
                <div className="relative h-48 cursor-pointer group" onClick={() => openVillaLightbox(6, 0)}>
                  <Image
                    src="/villa-6-ground-floor.png"
                    alt="Plan Villa 6 - Rez-de-chaussée"
                    fill
                    className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <Eye className="h-4 w-4 text-custom-beige opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="relative h-48 cursor-pointer group" onClick={() => openVillaLightbox(6, 1)}>
                  <Image
                    src="/villa-6-upper-floor.png"
                    alt="Plan Villa 6 - Sous-sol"
                    fill
                    className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <Eye className="h-4 w-4 text-custom-beige opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </div>
              <div className="px-4 pb-4">
                <h3 className="text-lg font-bold text-gray-900 text-center">Villa 6</h3>
                <p className="text-sm text-gray-600 text-center">355 m² • RDC + Étage</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Caractéristiques techniques</h2>
            <p className="text-lg text-gray-600">Des équipements d'exception pour un confort absolu</p>
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
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Équipements inclus</h3>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Galerie photos</h2>
            <p className="text-lg text-gray-600">Découvrez l'art de vivre en villa</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative group cursor-pointer" onClick={() => openGalleryLightbox(0)}>
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/villa-h1-exterior.jpg"
                  alt="Extérieur Villa - Façade moderne avec jardin paysager"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            </div>

            <div className="relative group cursor-pointer" onClick={() => openGalleryLightbox(1)}>
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/villa-h5.jpg"
                  alt="Salon Villa - Salon moderne avec grandes baies vitrées"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            </div>

            <div className="relative group cursor-pointer" onClick={() => openGalleryLightbox(2)}>
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/villa-h3.jpg"
                  alt="Salon Villa - Salon contemporain avec TV murale et lustre design"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            </div>

            <div className="relative group cursor-pointer" onClick={() => openGalleryLightbox(3)}>
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/villa-h2.jpg"
                  alt="Cuisine Villa - Cuisine moderne avec îlot central en marbre"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            </div>

            <div className="relative group cursor-pointer" onClick={() => openGalleryLightbox(4)}>
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/villa-h6.jpg"
                  alt="Suite Villa - Chambre moderne avec design contemporain"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            </div>

            <div className="relative group cursor-pointer" onClick={() => openGalleryLightbox(5)}>
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/villa-h4.jpg"
                  alt="Piscine Villa - Terrasse avec piscine et salon extérieur"
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
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Découvrez nos autres logements</h3>
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

            <Link href="/logements/duplex">
              <Card className="rounded-none border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <div className="relative h-48">
                  <Image src="/duplex-1.png" alt="Duplex" fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Duplex</h4>
                  <p className="text-gray-600 mb-3">2 niveaux • 221-254 m² • 2 unités</p>
                  <Button className="w-full rounded-none bg-custom-beige hover:bg-custom-beige">Découvrir</Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-custom-beige-light text-custom-beige-800 rounded-none">Contact</Badge>
            <h2 className="text-6xl font-bold text-gray-900 mb-6">Contactez-nous</h2>
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

              {/* WhatsApp Button */}
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

      {/* Plan Lightbox */}
      <PlanLightbox
        isOpen={showPlanLightbox}
        plans={villaSpecificPlans}
        startIndex={lightboxStartIndex}
        onClose={() => setShowPlanLightbox(false)}
      />

      {/* Cover Lightbox */}
      <CoverLightbox
        isOpen={showCoverLightbox}
        onClose={() => setShowCoverLightbox(false)}
        images={heroGalleryImages}
        initialIndex={coverLightboxIndex}
      />

      {/* Gallery Lightbox */}
      <GalleryLightbox
        isOpen={showGalleryLightbox}
        onClose={() => setShowGalleryLightbox(false)}
        images={galleryImages}
        initialIndex={galleryLightboxIndex}
      />
    </div>
  )
}
