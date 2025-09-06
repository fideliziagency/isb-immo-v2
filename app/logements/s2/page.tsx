import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  Droplets,
  Wind,
  Phone,
  MessageCircle,
  Download,
  Eye,
  CheckCircle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AppartementS2Page() {
  const specifications = [
    { icon: Ruler, label: "Surface", value: "85 - 95 m²" },
    { icon: Bed, label: "Chambres", value: "2 chambres" },
    { icon: Bath, label: "Salle de bain", value: "1 salle de bain" },
    { icon: Home, label: "Salon", value: "Salon spacieux + cuisine" },
    { icon: Car, label: "Parking", value: "1 place incluse" },
  ]

  const equipments = [
    "Cuisine équipée haut de gamme avec îlot",
    "Climatisation réversible dans toutes les pièces",
    "Carrelage premium grand format",
    "Menuiserie aluminium à rupture thermique",
    "Interphone vidéo couleur",
    "Pré-installation satellite et internet",
    "Éclairage LED avec variateurs",
    "Prises USB dans toutes les chambres",
    "Isolation thermique et phonique renforcée",
    "Grand balcon avec vue panoramique",
    "Dressing intégré chambre principale",
    "Salle de bain avec douche italienne",
  ]

  const features = [
    { icon: Wifi, label: "Pré-câblage internet fibre" },
    { icon: Shield, label: "Sécurité 24h/24" },
    { icon: Thermometer, label: "Climatisation multi-zones" },
    { icon: Zap, label: "Installation électrique premium" },
    { icon: Droplets, label: "Plomberie haut de gamme" },
    { icon: Wind, label: "VMC double flux" },
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
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="rounded-none border-custom-beige text-custom-beige hover:bg-custom-beige bg-transparent"
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
              <h1 className="text-4xl font-bold text-gray-900 mb-6">Appartement 3 Pièces</h1>
              <p className="text-xl text-gray-600 mb-8">
                Parfait pour les familles. Espace généreux avec 2 chambres, salon spacieux et finitions exceptionnelles.
                Le choix idéal pour un confort familial optimal.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {specifications.map((spec, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <spec.icon className="h-5 w-5 text-custom-beige" />
                    <div>
                      <div className="text-sm text-gray-600">{spec.label}</div>
                      <div className="font-semibold text-gray-900">{spec.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-none bg-custom-beige hover:bg-custom-beige">
                  <Eye className="h-5 w-5 mr-2" />
                  Demander une Visite
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-none border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Télécharger la Brochure
                </Button>
              </div>
            </div>

            <div className="relative">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/S%2B3%202-y5FoS1eydURQFZs0BX2EoQYhS3hOqa.jpeg"
                alt="Appartement S+2 - Salon moderne avec salle à manger"
                width={600}
                height={400}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge className="bg-custom-beige text-white rounded-none">45 Unités Disponibles</Badge>
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

          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="rounded-none border-0 shadow-lg overflow-hidden">
              <div className="relative h-96">
                <Image
                  src="/apartment-floor-plan-s2.png"
                  alt="Plan 2D Appartement S+2"
                  fill
                  className="object-contain p-4"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Plan 2D Détaillé</h3>
                <p className="text-gray-600">
                  Agencement familial avec salon généreux, cuisine ouverte avec îlot, 2 chambres confortables et salle
                  de bain moderne.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-none border-0 shadow-lg overflow-hidden">
              <div className="relative h-96">
                <Image src="/apartment-3d-view-s2.png" alt="Vue 3D Appartement S+2" fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Visualisation 3D</h3>
                <p className="text-gray-600">
                  Découvrez l'ambiance chaleureuse et les volumes généreux de votre futur appartement.
                </p>
              </CardContent>
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
                  <feature.icon className="h-8 w-8 text-custom-beige mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900">{feature.label}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Équipements Inclus</h3>
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
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-700">Salon + Cuisine</span>
                  <span className="font-semibold text-gray-900">45 - 50 m²</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-700">Chambre principale</span>
                  <span className="font-semibold text-gray-900">18 - 22 m²</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-700">Chambre 2</span>
                  <span className="font-semibold text-gray-900">12 - 15 m²</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-700">Salle de bain</span>
                  <span className="font-semibold text-gray-900">8 - 10 m²</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-700">Balcon</span>
                  <span className="font-semibold text-gray-900">12 - 15 m²</span>
                </div>
                <div className="flex justify-between items-center py-3 font-bold text-lg">
                  <span className="text-gray-900">Surface Totale</span>
                  <span className="text-custom-beige">85 - 95 m²</span>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Galerie Photos</h2>
            <p className="text-lg text-gray-600">Découvrez l'espace et le confort de l'appartement S+2</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative group cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/s2-living-room-view.png"
                  alt="Salon S+2"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/s2-master-bedroom-view.png"
                  alt="Chambre principale S+2"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/s2-kitchen-island-view.png"
                  alt="Cuisine avec îlot S+2"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/s2-second-bedroom-view.png"
                  alt="Chambre 2 S+2"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/s2-bathroom-view.png"
                  alt="Salle de bain S+2"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/s2-balcony-panorama-view.png"
                  alt="Balcon panoramique S+2"
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Intéressé par cet Appartement ?</h2>
              <p className="text-lg text-gray-600">
                L'appartement S+2 est notre type le plus demandé. Contactez-nous rapidement !
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
                        placeholder="contact@thelife.com"
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Surface souhaitée</label>
                      <select className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent">
                        <option>85 m² - 90 m²</option>
                        <option>90 m² - 95 m²</option>
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
                        <div className="text-gray-600">45 appartements S+2 disponibles</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Ruler className="h-5 w-5 text-custom-beige mt-1" />
                      <div>
                        <div className="font-semibold text-gray-900">Surfaces</div>
                        <div className="text-gray-600">De 85 m² à 95 m²</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Car className="h-5 w-5 text-custom-beige mt-1" />
                      <div>
                        <div className="font-semibold text-gray-900">Parking</div>
                        <div className="text-gray-600">1 place incluse par appartement</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-custom-beige p-6">
                  <h4 className="font-bold text-gray-900 mb-3">Type le Plus Demandé</h4>
                  <p className="text-gray-700 mb-4">
                    L'appartement S+2 représente 49% de notre offre et convient parfaitement aux familles avec enfants.
                  </p>
                  <Button className="w-full rounded-none bg-custom-beige hover:bg-custom-beige">
                    Réserver une Visite Prioritaire
                  </Button>
                </div>

                <div>
                  <Button size="lg" className="w-full rounded-none bg-custom-beige hover:bg-custom-beige">
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
                  <p className="text-gray-600 mb-3">2 pièces • 65-75 m² • 15 unités</p>
                  <Button className="w-full rounded-none bg-custom-beige hover:bg-custom-beige">Découvrir</Button>
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
                  <p className="text-gray-600 mb-3">4 pièces • 110-125 m² • 24 unités</p>
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
                  <p className="text-gray-600 mb-3">2 niveaux • 150-180 m² • 8 unités</p>
                  <Button className="w-full rounded-none bg-custom-beige hover:bg-custom-beige">Découvrir</Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* WhatsApp Float Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button size="lg" className="rounded-full bg-custom-beige hover:bg-custom-beige shadow-lg">
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
