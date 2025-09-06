"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Home,
  Shield,
  Award,
  ArrowRight,
  Play,
  Camera,
  Building,
  Clock,
  Download,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import UnitsSlider from "@/components/units-slider"
import FacilitiesSection from "@/components/facilities-section"
import WhyBuyOffPlan from "@/components/why-buy-off-plan"
import ReservationModal from "@/components/reservation-modal"

export default function HomePage() {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Building className="h-8 w-8 text-custom-beige" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">The Life Residence</h1>
                <p className="text-xs text-gray-600">Par Sodaprim Immobilière</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#projet" className="text-gray-700 hover:text-custom-beige font-medium text-xl">
                Le Projet
              </Link>
              <Link href="#logements" className="text-gray-700 hover:text-custom-beige font-medium text-xl">
                Les Logements
              </Link>
              <Link href="#galerie" className="text-gray-700 hover:text-custom-beige font-medium text-xl">
                Galerie
              </Link>
              <Link href="#actualites" className="text-gray-700 hover:text-custom-beige font-medium text-xl">
                Actualités
              </Link>
              <Link href="#contact" className="text-gray-700 hover:text-custom-beige font-medium text-xl">
                Contact
              </Link>
            </nav>
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
      <section className="relative h-screen bg-gradient-to-br from-amber-50 to-gray-100">
        <div className="absolute inset-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/821b40bc-9d0e-4fcd-b7c6-00076f962d7c.jpg-GCytTCBAok3dY0Rp49xbJUvcSKLJNI.jpeg"
            alt="The Life Residence - Vue extérieure du complexe résidentiel moderne"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <Badge className="mb-4 bg-custom-beige text-white rounded-none">Nouveau Projet Résidentiel</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              The Life
              <br />
              <span className="text-custom-beige-light">Residence</span>
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Un art de vivre exceptionnel à Chotrana 3, La Soukra. 84 appartements et 8 duplex de très haut standing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="rounded-none bg-custom-beige bg-custom-beige-hover text-white"
                onClick={() => setIsReservationModalOpen(true)}
              >
                <Home className="h-5 w-5 mr-2" />
                Réserver Votre Appartement sur Plan
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-none border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
              >
                <Download className="h-5 w-5 mr-2" />
                Télécharger la Brochure
              </Button>
            </div>

            {/* Engaging Tagline */}
            <div className="mt-6 p-4 bg-black/20 rounded-none border-l-4 border-custom-beige">
              <p className="text-custom-beige-light font-medium">
                Investissez aujourd'hui dans votre futur appartement haut de gamme et bénéficiez des offres de lancement
                exclusives.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-custom-beige-light">92</div>
                <div className="text-sm text-gray-300">Logements</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-custom-beige-light">2026</div>
                <div className="text-sm text-gray-300">Livraison</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-custom-beige-light">10+</div>
                <div className="text-sm text-gray-300">Ans d'expérience</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <ArrowRight className="h-6 w-6 text-white rotate-90" />
          </div>
        </div>
      </section>

      {/* Le Projet Section */}
      <section id="projet" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-custom-beige-light text-custom-beige rounded-none">Le Projet</Badge>
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
                    <p className="text-gray-600">Route principale, face au restaurant El Firma</p>
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
            <div className="relative h-96">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/831a51d7-07cd-4c86-8f3d-2e2fe0299cd4.jpg-j0g89lKslMd9WykKvFCnGmalMJ5TrU.jpeg"
                alt="The Life Residence - Vue du complexe résidentiel"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Developer Info */}
          <div className="bg-gray-50 p-8 mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Sodaprim Immobilière</h3>
                <p className="text-gray-600 mb-6">
                  Avec plus de 10 ans d'expérience dans l'immobilier résidentiel haut de gamme, Sodaprim Immobilière a
                  développé une expertise reconnue dans la création de projets d'exception.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Building className="h-5 w-5 text-custom-beige" />
                    <span className="text-gray-700">Résidence Skander - Aïn Zaghouan Nord</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Building className="h-5 w-5 text-custom-beige" />
                    <span className="text-gray-700">Résidence El Menzah</span>
                  </div>
                </div>
              </div>
              <div className="relative h-64">
                <Image src="/about-construction-4.png" alt="Sodaprim Immobilière" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Les Logements Section with Slider */}
      <section id="logements" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-custom-beige-light text-custom-beige rounded-none">Les Logements</Badge>
            <h2 className="text-6xl font-bold text-gray-900 mb-6">Votre Futur Chez-Vous</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              84 appartements et 8 duplex conçus pour offrir confort, élégance et modernité.
            </p>
          </div>

          {/* Units Slider */}
          <UnitsSlider onReserveClick={() => setIsReservationModalOpen(true)} />
        </div>
      </section>

      {/* Why Buy Off-Plan Section */}
      <WhyBuyOffPlan />

      {/* Facilities Section */}
      <FacilitiesSection />

      {/* Galerie Section */}
      <section id="galerie" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-custom-beige-light text-custom-beige rounded-none">Galerie</Badge>
            <h2 className="text-6xl font-bold text-gray-900 mb-6">Visualisez Votre Futur</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos rendus 3D photoréalistes et suivez l'avancement des travaux.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative group cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/831a51d7-07cd-4c86-8f3d-2e2fe0299cd4.jpg-SJhOGgaW0QG1IO0YKovcozeja5yQPC.jpeg"
                  alt="Rendu 3D extérieur - Vue du complexe résidentiel avec piscine et aménagement paysager"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-custom-beige text-white rounded-none">Rendu 3D</Badge>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Camera className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/construction-progress.png"
                  alt="Avancement travaux"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-custom-beige text-white rounded-none">Travaux</Badge>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Play className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/tunisia-balcony-panorama.png"
                  alt="Vue panoramique"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-custom-beige text-white rounded-none">Vue 360°</Badge>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Camera className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="rounded-none bg-custom-beige bg-custom-beige-hover">
              <Camera className="h-5 w-5 mr-2" />
              Voir Toute la Galerie
            </Button>
          </div>
        </div>
      </section>

      {/* Actualités Section */}
      <section id="actualites" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-custom-beige-light text-custom-beige rounded-none">Actualités</Badge>
            <h2 className="text-6xl font-bold text-gray-900 mb-6">Suivez l'Évolution du Projet</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="rounded-none border-0 shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/construction-foundation-progress.png"
                  alt="Début des travaux"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Clock className="h-4 w-4 text-custom-beige" />
                  <span className="text-sm text-gray-600">Il y a 1 semaine</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Début Officiel des Travaux</h3>
                <p className="text-gray-600">
                  Les travaux de construction de The Life Residence ont officiellement commencé...
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-none border-0 shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image src="/apartment-showroom.png" alt="Appartement témoin" fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Clock className="h-4 w-4 text-custom-beige" />
                  <span className="text-sm text-gray-600">Il y a 2 semaines</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Appartement Témoin Prévu</h3>
                <p className="text-gray-600">
                  L'appartement témoin sera prêt en juillet 2026 pour vous permettre de découvrir...
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-none border-0 shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Conseils investissement"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Clock className="h-4 w-4 text-custom-beige" />
                  <span className="text-sm text-gray-600">Il y a 3 semaines</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Guide d'Investissement Immobilier</h3>
                <p className="text-gray-600">Découvrez nos conseils pour réussir votre investissement immobilier...</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-custom-beige-light text-custom-beige rounded-none">Contact</Badge>
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
                    <p className="text-gray-600">22 322 468</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-custom-beige mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">contact@theliferesidence.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-custom-beige mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Adresse</h4>
                    <p className="text-gray-600">Chotrana 3, La Soukra, Tunisie</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button size="lg" className="w-full rounded-none bg-custom-beige bg-custom-beige-hover">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Discuter sur WhatsApp
                </Button>
              </div>
            </div>

            <Card className="rounded-none border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Demande d'Information</h3>
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
                      placeholder="votre@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
                      placeholder="22 322 468"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type de logement souhaité</label>
                    <select className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent">
                      <option>Sélectionnez un type</option>
                      <option>Appartement S+1</option>
                      <option>Appartement S+2</option>
                      <option>Appartement S+3</option>
                      <option>Duplex</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
                      placeholder="Votre message..."
                    ></textarea>
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full rounded-none bg-white text-custom-beige border-2 border-custom-beige hover:bg-custom-beige hover:text-white transition-colors duration-300"
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
              <p className="text-gray-400 mb-4">Un projet résidentiel d'exception par Sodaprim Immobilière.</p>
              <div className="flex space-x-4">
                <Button size="sm" className="rounded-none bg-custom-beige bg-custom-beige-hover">
                  <MessageCircle className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-none border-gray-600 text-gray-400 hover:bg-gray-800 bg-transparent"
                >
                  <Phone className="h-4 w-4" />
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
                  <Link href="#" className="hover:text-custom-beige-light">
                    Localisation
                  </Link>
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
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Informations</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/faq" className="hover:text-custom-beige-light">
                    FAQ
                  </Link>
                </li>
                <li>Chotrana 3, La Soukra</li>
                <li>22 322 468</li>
                <li>contact@theliferesidence.com</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              © 2025 Sodaprim Bouaziz. All rights reserved. Created by{" "}
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

      {/* WhatsApp Float Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button size="lg" className="rounded-full bg-custom-beige bg-custom-beige-hover shadow-lg">
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>

      {/* Reservation Modal */}
      <ReservationModal isOpen={isReservationModalOpen} onClose={() => setIsReservationModalOpen(false)} />
    </div>
  )
}
