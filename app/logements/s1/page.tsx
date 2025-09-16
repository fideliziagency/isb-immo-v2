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
  Eye,
  ChevronLeft,
  ChevronRight,
  Camera,
  Tv,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ContactForm from "@/components/contact-form"

export default function AppartementS1Page() {
  const [showPlanLightbox, setShowPlanLightbox] = useState(false)
  const [currentPlanIndex, setCurrentPlanIndex] = useState(0)
  const [lightboxStartIndex, setLightboxStartIndex] = useState(0)
  const [currentCoverIndex, setCurrentCoverIndex] = useState(0)
  const [showCoverLightbox, setShowCoverLightbox] = useState(false)
  const [coverLightboxIndex, setCoverLightboxIndex] = useState(0)
  const [showGalleryLightbox, setShowGalleryLightbox] = useState(false)
  const [galleryLightboxIndex, setGalleryLightboxIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const coverImages = [
    {
      src: "/s1-salon-moderne-luxe.jpeg",
      alt: "Salon S+1 - Espace de vie moderne avec canapé beige, coin bar et TV murale",
    },
    {
      src: "/s1-new-open-living-dining.jpeg",
      alt: "Salon-salle à manger S+1 - Espace ouvert avec cuisine et îlot central",
    },
    {
      src: "/s1-new-kitchen-modern.jpeg",
      alt: "Cuisine S+1 - Cuisine moderne équipée avec plan de travail en marbre",
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
    { icon: Ruler, label: "Surface", value: "48 à 77 m²" },
    { icon: Bed, label: "Chambres", value: "1 chambre" },
    { icon: Bath, label: "Salle de bain", value: "1 salle de bain" },
    { icon: Home, label: "Salon", value: "Salon avec cuisine" },
  ]

  const equipments = [
    { icon: Home, text: "Cuisine équipée" },
    { icon: Thermometer, text: "Climatisation dans toutes les chambres" },
    { icon: null, text: "Revêtement premium" },
    { icon: null, text: "Menuiserie aluminium à rupture thermique" },
    { icon: Camera, text: "Interphone vidéo" },
    { icon: Tv, text: "Pré-installation satellite" },
    { icon: Shield, text: "Isolation thermique renforcée" },
  ]

  const features = [
    { icon: Wifi, label: "Pré-câblage internet" },
    { icon: Shield, label: "Sécurité 24h/24" },
    { icon: Thermometer, label: "Climatisation" },
    { icon: Zap, label: "Installation électrique premium" },
    { icon: Droplets, label: "Plomberie haut de gamme" },
    { icon: Wind, label: "Ventilation optimisée" },
  ]

  const s1Plans = [
    {
      src: "/s1-plan-c12.png",
      alt: "Plan S+1 - Appartement C.12 - 1er étage Bloc C",
      title: "Plan S+1 - Appartement C.12 - 1er étage Bloc C",
    },
    {
      src: "/s1-plan-a13.png",
      alt: "Plan S+1 - Appartement A.13 - 1er étage Bloc A",
      title: "Plan S+1 - Appartement A.13 - 1er étage Bloc A",
    },
    {
      src: "/s1-plan-c02.png",
      alt: "Plan S+1 - Appartement C.02 - RDC Bloc C",
      title: "Plan S+1 - Appartement C.02 - RDC Bloc C",
    },
    {
      src: "/s1-plan-c03.png",
      alt: "Plan S+1 - Appartement C.03 - RDC Bloc C",
      title: "Plan S+1 - Appartement C.03 - RDC Bloc C",
    },
    {
      src: "/s1-plan-a22.png",
      alt: "Plan S+1 - Appartement A.22 - 2ème étage Bloc A",
      title: "Plan S+1 - Appartement A.22 - 2ème étage Bloc A",
    },
    {
      src: "/s1-plan-a12.png",
      alt: "Plan S+1 - Appartement A.12 - 1er étage Bloc A",
      title: "Plan S+1 - Appartement A.12 - 1er étage Bloc A",
    },
    {
      src: "/s1-plan-c04.png",
      alt: "Plan S+1 - Appartement C.04 - RDC Bloc C",
      title: "Plan S+1 - Appartement C.04 - RDC Bloc C",
    },
    {
      src: "/s1-plan-a03.png",
      alt: "Plan S+1 - Appartement A.03 - RDC Bloc A",
      title: "Plan S+1 - Appartement A.03 - RDC Bloc A",
    },
    {
      src: "/s1-plan-a02.png",
      alt: "Plan S+1 - Appartement A.02 - RDC Bloc A",
      title: "Plan S+1 - Appartement A.02 - RDC Bloc A",
    },
    {
      src: "/s1-plan-a23.png",
      alt: "Plan S+1 - Appartement A.23 - 2ème étage Bloc A",
      title: "Plan S+1 - Appartement A.23 - 2ème étage Bloc A",
    },
    {
      src: "/s1-plan-c14.png",
      alt: "Plan S+1 - Appartement C.14 - 1er étage Bloc C",
      title: "Plan S+1 - Appartement C.14 - 1er étage Bloc C",
    },
    {
      src: "/s1-plan-e01.png",
      alt: "Plan S+1 - Appartement E.01 - RDC Bloc E",
      title: "Plan S+1 - Appartement E.01 - RDC Bloc E",
    },
    {
      src: "/s1-plan-e02.png",
      alt: "Plan S+1 - Appartement E.02 - RDC Bloc E",
      title: "Plan S+1 - Appartement E.02 - RDC Bloc E",
    },
    {
      src: "/s1-plan-c22.png",
      alt: "Plan S+1 - Appartement C.22 - 2ème étage Bloc C",
      title: "Plan S+1 - Appartement C.22 - 2ème étage Bloc C",
    },
    {
      src: "/s1-plan-e13.png",
      alt: "Plan S+1 - Appartement E.13 - 1er étage Bloc E",
      title: "Plan S+1 - Appartement E.13 - 1er étage Bloc E",
    },
    {
      src: "/s1-plan-c13.png",
      alt: "Plan S+1 - Appartement C.13 - 1er étage Bloc C",
      title: "Plan S+1 - Appartement C.13 - 1er étage Bloc C",
    },
    {
      src: "/s1-plan-e03.png",
      alt: "Plan S+1 - Appartement E.03 - RDC Bloc E",
      title: "Plan S+1 - Appartement E.03 - RDC Bloc E",
    },
    {
      src: "/s1-plan-e12.png",
      alt: "Plan S+1 - Appartement E.12 - 1er étage Bloc E",
      title: "Plan S+1 - Appartement E.12 - 1er étage Bloc E",
    },
    {
      src: "/s1-plan-c23.png",
      alt: "Plan S+1 - Appartement C.23 - 2ème étage Bloc C",
      title: "Plan S+1 - Appartement C.23 - 2ème étage Bloc C",
    },
    {
      src: "/s1-plan-c24.png",
      alt: "Plan S+1 - Appartement C.24 - 2ème étage Bloc C",
      title: "Plan S+1 - Appartement C.24 - 2ème étage Bloc C",
    },
    {
      src: "/s1-plan-e24.png",
      alt: "Plan S+1 - Appartement E.24 - 2ème étage Bloc E",
      title: "Plan S+1 - Appartement E.24 - 2ème étage Bloc E",
    },
    {
      src: "/s1-plan-g24.png",
      alt: "Plan S+1 - Appartement G.24 - 2ème étage Bloc G",
      title: "Plan S+1 - Appartement G.24 - 2ème étage Bloc G",
    },
    {
      src: "/s1-plan-g04.png",
      alt: "Plan S+1 - Appartement G.04 - RDC Bloc G",
      title: "Plan S+1 - Appartement G.04 - RDC Bloc G",
    },
    {
      src: "/s1-plan-g11.png",
      alt: "Plan S+1 - Appartement G.11 - 1er étage Bloc G",
      title: "Plan S+1 - Appartement G.11 - 1er étage Bloc G",
    },
    {
      src: "/s1-plan-e22.png",
      alt: "Plan S+1 - Appartement E.22 - 2ème étage Bloc E",
      title: "Plan S+1 - Appartement E.22 - 2ème étage Bloc E",
    },
    {
      src: "/s1-plan-e14.png",
      alt: "Plan S+1 - Appartement E.14 - 1er étage Bloc E",
      title: "Plan S+1 - Appartement E.14 - 1er étage Bloc E",
    },
    {
      src: "/s1-plan-g01.png",
      alt: "Plan S+1 - Appartement G.01 - RDC Bloc G",
      title: "Plan S+1 - Appartement G.01 - RDC Bloc G",
    },
    {
      src: "/s1-plan-e23.png",
      alt: "Plan S+1 - Appartement E.23 - 2ème étage Bloc E",
      title: "Plan S+1 - Appartement E.23 - 2ème étage Bloc E",
    },
    {
      src: "/s1-plan-g14.png",
      alt: "Plan S+1 - Appartement G.14 - 1er étage Bloc G",
      title: "Plan S+1 - Appartement G.14 - 1er étage Bloc G",
    },
    {
      src: "/s1-plan-g21.png",
      alt: "Plan S+1 - Appartement G.21 - 2ème étage Bloc G",
      title: "Plan S+1 - Appartement G.21 - 2ème étage Bloc G",
    },
  ]

  const nextPlan = () => {
    setCurrentPlanIndex((prev) => (prev + 1) % s1Plans.length)
  }

  const prevPlan = () => {
    setCurrentPlanIndex((prev) => (prev - 1 + s1Plans.length) % s1Plans.length)
  }

  const openLightbox = (index: number) => {
    setLightboxStartIndex(index)
    setShowPlanLightbox(true)
  }

  const openCoverLightbox = (index: number) => {
    setCoverLightboxIndex(index)
    setShowCoverLightbox(true)
  }

  const openGalleryLightbox = (index: number) => {
    setGalleryLightboxIndex(index)
    setShowGalleryLightbox(true)
  }

  const galleryImages = [
    {
      src: "/s1-salon-moderne-luxe.jpeg",
      alt: "Salon S+1 - Espace de vie moderne avec canapé beige, coin bar et TV murale",
    },
    {
      src: "/s1-new-open-living-dining.jpeg",
      alt: "Salon-salle à manger S+1 - Espace ouvert avec cuisine et îlot central",
    },
    {
      src: "/s1-new-kitchen-modern.jpeg",
      alt: "Cuisine S+1 - Cuisine moderne équipée avec plan de travail en marbre",
    },
  ]

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
            <div className="flex items-center space-x-3">{/* Button removed */}</div>
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
            <span className="text-gray-900">Appartement S+1</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 md:gap-12 gap-8 items-start">
            <div>
              <Badge className="mb-4 bg-custom-beige text-white rounded-none">Appartement S+1</Badge>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">Appartement S+1</h1>

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

              <div className="flex flex-col sm:flex-row gap-4">{/* Demander une Visite button removed */}</div>
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
                        className="w-full h-96 object-cover cursor-pointer"
                        onClick={() => openCoverLightbox(index)}
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
                <Badge className="bg-custom-beige text-white rounded-none">30 Unités Disponibles</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-8 md:py-8 py-5 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 md:mb-6 mb-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Plans et Agencement</h2>
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
                    {s1Plans.map((plan, index) => (
                      <div
                        key={index}
                        className="w-full flex-shrink-0 relative cursor-pointer group"
                        onClick={() => openLightbox(index)}
                      >
                        <Image
                          src={plan.src || "/placeholder.svg"}
                          alt={plan.alt}
                          fill
                          className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
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
                    Plan S+1 - Unité {currentPlanIndex + 1} sur 30
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Agencement optimisé avec salon spacieux, cuisine ouverte, chambre confortable et salle de bain
                    moderne.
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
                  {s1Plans.map((_, index) => (
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
      <section className="py-16 md:py-16 py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-12 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Caractéristiques Techniques</h2>
            <p className="text-lg text-gray-600">Des équipements modernes pour votre confort quotidien</p>
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
            <p className="text-lg text-gray-600">Découvrez les finitions et l'aménagement en images</p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 md:gap-6 gap-4">
            <div className="relative group cursor-pointer" onClick={() => openGalleryLightbox(0)}>
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/s1-salon-moderne-luxe.jpeg"
                  alt="Salon S+1 - Espace de vie moderne avec canapé beige, coin bar et TV murale"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            </div>

            <div className="relative group cursor-pointer" onClick={() => openGalleryLightbox(1)}>
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/s1-new-open-living-dining.jpeg"
                  alt="Salon-salle à manger S+1 - Espace ouvert avec cuisine et îlot central"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            </div>

            <div className="relative group cursor-pointer" onClick={() => openGalleryLightbox(2)}>
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/s1-new-kitchen-modern.jpeg"
                  alt="Cuisine S+1 - Cuisine moderne équipée avec plan de travail en marbre"
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

      {/* Plan Lightbox */}
      <PlanLightbox
        isOpen={showPlanLightbox}
        onClose={() => setShowPlanLightbox(false)}
        plans={s1Plans}
        initialIndex={lightboxStartIndex}
      />

      {/* Cover Lightbox */}
      <CoverLightbox
        isOpen={showCoverLightbox}
        onClose={() => setShowCoverLightbox(false)}
        images={coverImages}
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
