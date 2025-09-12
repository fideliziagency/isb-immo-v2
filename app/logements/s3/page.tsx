"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import PlanLightbox from "@/components/plan-lightbox"
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
  Trees,
  ChevronLeft,
  ChevronRight,
  Camera,
  Tv,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AppartementS3Page() {
  const [showPlanLightbox, setShowPlanLightbox] = useState(false)
  const [currentPlanIndex, setCurrentPlanIndex] = useState(0)
  const [lightboxStartIndex, setLightboxStartIndex] = useState(0)
  const [currentCoverIndex, setCurrentCoverIndex] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const coverImages = [
    {
      src: "/s3-new-living-dining-gallery.png",
      alt: "Salon et salle à manger S+3 - Espace de vie moderne",
    },
    {
      src: "/s3-new-dining-area-gallery.png",
      alt: "Salle à manger S+3 - Espace repas avec miroirs",
    },
    {
      src: "/s3-new-open-living-gallery.png",
      alt: "Salon S+3 - Espace de vie ouvert et moderne",
    },
    {
      src: "/s3-new-kitchen-island-gallery.png",
      alt: "Cuisine S+3 - Cuisine moderne avec îlot central",
    },
    {
      src: "/s3-new-master-bedroom-gallery.png",
      alt: "Suite parentale S+3 - Chambre principale moderne",
    },
  ]

  const nextCoverImage = () => {
    setCurrentCoverIndex((prev) => (prev + 1) % coverImages.length)
  }

  const prevCoverImage = () => {
    setCurrentCoverIndex((prev) => (prev - 1 + coverImages.length) % coverImages.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCoverIndex((prev) => (prev + 1) % coverImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [coverImages.length])

  const specifications = [
    { icon: Ruler, label: "Surface", value: "139-208 m²" },
    { icon: Bed, label: "Chambres", value: "Une suite parentale, 2 chambres" },
    { icon: Bath, label: "Salles de bain", value: "2 salles de bain" },
    { icon: Droplets, label: "Salle d'eau", value: "S.D invités" },
    { icon: Home, label: "Salon", value: "Grand salon + cuisine" },
  ]

  const equipments = [
    { icon: Home, text: "Cuisine équipée" },
    { icon: Thermometer, text: "Climatisation dans toutes les pièces" },
    { icon: null, text: "Revêtement premium dans toutes les pièces" },
    { icon: null, text: "Menuiserie aluminium à rupture thermique" },
    { icon: Camera, text: "Interphone vidéo couleur" },
    { icon: Tv, text: "Pré-installation satellite et internet fibre" },
    { icon: Shield, text: "Isolation thermique et phonique renforcée" },
    { icon: Droplets, text: "Plomberie haut de gamme" },
    { icon: Wind, text: "VMC double flux" },
  ]

  const features = [
    { icon: Wifi, label: "Pré-câblage internet fibre" },
    { icon: Shield, label: "Sécurité 24h/24" },
    { icon: Thermometer, label: "Climatisation multi-zones" },
    { icon: Zap, label: "Installation électrique premium" },
    { icon: Droplets, label: "Plomberie haut de gamme" },
    { icon: Wind, label: "VMC double flux" },
  ]

  const s3Plans = [
    {
      src: "/s3-plan-b11.png",
      alt: "Plan S+3 - Appartement B.11 (1er étage Bloc B)",
      title: "Plan S+3 - Appartement B.11 (1er étage Bloc B) - 208 m²",
    },
    {
      src: "/s3-plan-d01.png",
      alt: "Plan S+3 - Appartement D.01 (RDC Bloc D)",
      title: "Plan S+3 - Appartement D.01 (RDC Bloc D) - 195 m²",
    },
    {
      src: "/s3-plan-a01.png",
      alt: "Plan S+3 - Appartement A.01 (RDC Bloc A)",
      title: "Plan S+3 - Appartement A.01 (RDC Bloc A) - 185 m²",
    },
    {
      src: "/s3-plan-a11.png",
      alt: "Plan S+3 - Appartement A.11 (1er étage Bloc A)",
      title: "Plan S+3 - Appartement A.11 (1er étage Bloc A) - 185 m²",
    },
    {
      src: "/s3-plan-b12.png",
      alt: "Plan S+3 - Appartement B.12 (1er étage Bloc B)",
      title: "Plan S+3 - Appartement B.12 (1er étage Bloc B) - 165 m²",
    },
    {
      src: "/s3-plan-b21.png",
      alt: "Plan S+3 - Appartement B.21 (2ème étage Bloc B)",
      title: "Plan S+3 - Appartement B.21 (2ème étage Bloc B) - 208 m²",
    },
    {
      src: "/s3-plan-b22.png",
      alt: "Plan S+3 - Appartement B.22 (2ème étage Bloc B)",
      title: "Plan S+3 - Appartement B.22 (2ème étage Bloc B) - 165 m²",
    },
    {
      src: "/s3-plan-b02.png",
      alt: "Plan S+3 - Appartement B.02 (RDC Bloc B)",
      title: "Plan S+3 - Appartement B.02 (RDC Bloc B) - 165 m²",
    },
    {
      src: "/s3-plan-a21.png",
      alt: "Plan S+3 - Appartement A.21 (2ème étage Bloc A)",
      title: "Plan S+3 - Appartement A.21 (2ème étage Bloc A) - 185 m²",
    },
    {
      src: "/s3-plan-b01.png",
      alt: "Plan S+3 - Appartement B.01 (RDC Bloc B)",
      title: "Plan S+3 - Appartement B.01 (RDC Bloc B) - 208 m²",
    },
    {
      src: "/s3-plan-d02.png",
      alt: "Plan S+3 - Appartement D.02 (RDC Bloc D)",
      title: "Plan S+3 - Appartement D.02 (RDC Bloc D) - 175 m²",
    },
    {
      src: "/s3-plan-f23.png",
      alt: "Plan S+3 - Appartement F.23 (2ème étage Bloc F)",
      title: "Plan S+3 - Appartement F.23 (2ème étage Bloc F) - 190 m²",
    },
    {
      src: "/s3-plan-d22.png",
      alt: "Plan S+3 - Appartement D.22 (2ème étage Bloc D)",
      title: "Plan S+3 - Appartement D.22 (2ème étage Bloc D) - 175 m²",
    },
    {
      src: "/s3-plan-f12.png",
      alt: "Plan S+3 - Appartement F.12 (1er étage Bloc F)",
      title: "Plan S+3 - Appartement F.12 (1er étage Bloc F) - 190 m²",
    },
    {
      src: "/s3-plan-d13.png",
      alt: "Plan S+3 - Appartement D.13 (1er étage Bloc D)",
      title: "Plan S+3 - Appartement D.13 (1er étage Bloc D) - 195 m²",
    },
    {
      src: "/s3-plan-g13.png",
      alt: "Plan S+3 - Appartement G.13 (1er étage Bloc G)",
      title: "Plan S+3 - Appartement G.13 (1er étage Bloc G) - 185 m²",
    },
    {
      src: "/s3-plan-d23.png",
      alt: "Plan S+3 - Appartement D.23 (2ème étage Bloc D)",
      title: "Plan S+3 - Appartement D.23 (2ème étage Bloc D) - 195 m²",
    },
    {
      src: "/s3-plan-f02.png",
      alt: "Plan S+3 - Appartement F.02 (RDC Bloc F)",
      title: "Plan S+3 - Appartement F.02 (RDC Bloc F) - 190 m²",
    },
    {
      src: "/s3-plan-d12.png",
      alt: "Plan S+3 - Appartement D.12 (1er étage Bloc D)",
      title: "Plan S+3 - Appartement D.12 (1er étage Bloc D) - 175 m²",
    },
    {
      src: "/s3-plan-g03.png",
      alt: "Plan S+3 - Appartement G.03 (RDC Bloc G)",
      title: "Plan S+3 - Appartement G.03 (RDC Bloc G) - 185 m²",
    },
    {
      src: "/s3-plan-g23.png",
      alt: "Plan S+3 - Appartement G.23 (2ème étage Bloc G)",
      title: "Plan S+3 - Appartement G.23 (2ème étage Bloc G) - 185 m²",
    },
    {
      src: "/s3-plan-g25.png",
      alt: "Plan S+3 - Appartement G.25 (2ème étage Bloc G)",
      title: "Plan S+3 - Appartement G.25 (2ème étage Bloc G) - 185 m²",
    },
  ]

  const nextPlan = () => {
    setCurrentPlanIndex((prev) => (prev + 1) % s3Plans.length)
  }

  const prevPlan = () => {
    setCurrentPlanIndex((prev) => (prev - 1 + s3Plans.length) % s3Plans.length)
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
            <span className="text-gray-900">Appartement S+3</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <Badge className="mb-4 bg-custom-beige text-white rounded-none">Appartement S+3</Badge>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">Appartement S+3</h1>

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
              <div className="relative h-96 overflow-hidden rounded-lg">
                <div
                  className="flex transition-transform duration-500 ease-in-out h-full"
                  style={{ transform: `translateX(-${currentCoverIndex * 100}%)` }}
                >
                  {coverImages.map((image, index) => (
                    <div key={index} className="w-full flex-shrink-0 relative">
                      <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                    </div>
                  ))}
                </div>

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
                <Badge className="bg-custom-beige text-white rounded-none">22 Unités Disponibles</Badge>
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
            <p className="text-lg text-gray-600">Un agencement pensé pour les grandes familles</p>
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
                    {s3Plans.map((plan, index) => (
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
                    Plan S+3 - Unité {currentPlanIndex + 1} sur 22
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Agencement familial avec grand salon, cuisine ouverte avec îlot, 3 chambres spacieuses et 2 salles
                    de bain.
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
                  {s3Plans.map((_, index) => (
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
            <p className="text-lg text-gray-600">Découvrez l'espace et le raffinement de l'appartement S+3</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative group cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/s3-new-living-dining-gallery.png"
                  alt="Salon et salle à manger S+3 - Espace de vie moderne"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/s3-new-dining-area-gallery.png"
                  alt="Salle à manger S+3 - Espace repas avec miroirs"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/s3-new-open-living-gallery.png"
                  alt="Salon S+3 - Espace de vie ouvert et moderne"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/s3-new-kitchen-island-gallery.png"
                  alt="Cuisine S+3 - Cuisine moderne avec îlot central"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/s3-new-master-bedroom-gallery.png"
                  alt="Suite parentale S+3 - Chambre principale moderne"
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
                L'appartement S+3 représente 24% de notre offre et convient parfaitement aux grandes familles.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <Card className="rounded-none border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Demande d'Information - S+3</h3>
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
                        placeholder="Isbimmobiliere@gmail.com"
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
                        <option>139 m² - 160 m²</option>
                        <option>160 m² - 180 m²</option>
                        <option>180 m² - 208 m²</option>
                        <option>Indifférent</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
                        placeholder="Questions spécifiques sur l'appartement S+3..."
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
                        <div className="text-gray-600">22 appartements S+3 disponibles</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Ruler className="h-5 w-5 text-custom-beige mt-1" />
                      <div>
                        <div className="font-semibold text-gray-900">Surfaces</div>
                        <div className="text-gray-600">De 139 m² à 208 m²</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Trees className="h-5 w-5 text-custom-beige mt-1" />
                      <div>
                        <div className="font-semibold text-gray-900">Jardin privé</div>
                        <div className="text-gray-600">0-28 m² (disponible uniquement pour certains appartements)</div>
                      </div>
                    </div>
                  </div>
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

      {/* Plan Lightbox */}
      <PlanLightbox
        isOpen={showPlanLightbox}
        onClose={() => setShowPlanLightbox(false)}
        plans={s3Plans}
        initialIndex={lightboxStartIndex}
      />
    </div>
  )
}
