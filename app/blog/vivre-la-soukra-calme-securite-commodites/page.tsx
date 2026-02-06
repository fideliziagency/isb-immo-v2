import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  MapPin,
  Shield,
  ShoppingCart,
  GraduationCap,
  Heart,
  Car,
  Building,
  TreePine,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function BlogVivreLaSoukraPage() {
  const relatedArticles = [
    {
      title: "Tendances de l'immobilier haut de gamme en Tunisie 2025",
      excerpt: "Découvrez les nouvelles tendances qui façonnent le marché immobilier de luxe tunisien.",
      image: "/tunisian-luxury-residence.png",
      date: "15 Décembre 2024",
      slug: "tendances-immobilier-haut-gamme-tunisie-2025",
    },
    {
      title: "Pourquoi acheter sur plan en 2025 : avantages et garanties",
      excerpt: "Les avantages exclusifs de l'achat sur plan et les garanties offertes aux acquéreurs.",
      image: "/modern-apartment-construction.png",
      date: "10 Décembre 2024",
      slug: "pourquoi-acheter-sur-plan-2025-avantages-garanties",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/blog" className="flex items-center space-x-3">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
              <span className="text-lg font-bold text-gray-900">Retour au Blog</span>
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="rounded-none border-custom-beige text-custom-beige hover:bg-custom-beige hover:text-white bg-transparent"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Partager
            </Button>
          </div>
        </div>
      </header>

      {/* Article Header */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-2 mb-6">
              <Link href="/" className="text-gray-500 hover:text-custom-beige">
                Accueil
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-custom-beige">
                Blog
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900">Vivre à La Soukra</span>
            </div>

            <div className="mb-8">
              <Badge className="mb-4 bg-custom-beige-light text-custom-beige rounded-none">Lifestyle</Badge>
              <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Vivre à La Soukra : Entre Calme, Sécurité et Commodités
              </h1>

              <div className="flex items-center space-x-6 text-gray-600 mb-8">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>20 Décembre 2024</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>5 min de lecture</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Équipe ISB Immobilière</span>
                </div>
              </div>

              <div className="relative h-96 mb-8">
                <Image
                  src="/la-soukra-neighborhood.png"
                  alt="Vue panoramique de La Soukra - Quartier résidentiel calme et verdoyant"
                  fill
                  className="object-cover rounded-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                La Soukra, située dans la banlieue nord de Tunis, s'est imposée comme l'une des destinations
                résidentielles les plus prisées de la capitale tunisienne. Cette commune offre un cadre de vie
                exceptionnel qui séduit de plus en plus de familles en quête de tranquillité sans renoncer aux avantages
                de la proximité urbaine.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="h-6 w-6 text-custom-beige mr-3" />
                Un Havre de Sécurité et de Tranquillité
              </h2>

              <p className="text-gray-700 mb-6 leading-relaxed">
                La Soukra est reconnue pour son environnement sécurisé et paisible. Les rues arborées et les quartiers
                résidentiels bien entretenus créent une atmosphère sereine, idéale pour les familles avec enfants. La
                présence de services de sécurité privés dans de nombreux complexes résidentiels renforce ce sentiment de
                protection.
              </p>

              <div className="bg-custom-beige-light p-6 mb-8 border-l-4 border-custom-beige">
                <h3 className="font-bold text-gray-900 mb-3">Points forts sécuritaires :</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Quartiers résidentiels fermés et sécurisés</li>
                  <li>• Surveillance 24h/24 dans de nombreux complexes</li>
                  <li>• Éclairage public optimal</li>
                  <li>• Proximité des services de police</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <ShoppingCart className="h-6 w-6 text-custom-beige mr-3" />
                Commodités et Services à Proximité
              </h2>

              <p className="text-gray-700 mb-6 leading-relaxed">
                L'un des grands atouts de La Soukra réside dans sa proximité avec tous les services essentiels. Les
                résidents bénéficient d'un accès facile aux centres commerciaux, supermarchés, pharmacies, banques et
                services administratifs, sans avoir à se déplacer vers le centre-ville.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="rounded-none border-0 shadow-sm">
                  <CardContent className="p-6">
                    <ShoppingCart className="h-8 w-8 text-custom-beige mb-4" />
                    <h4 className="font-bold text-gray-900 mb-3">Shopping et Commerce</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Centre commercial Carrefour La Soukra</li>
                      <li>• Monoprix et supermarchés locaux</li>
                      <li>• Marchés traditionnels hebdomadaires</li>
                      <li>• Boutiques et commerces de proximité</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="rounded-none border-0 shadow-sm">
                  <CardContent className="p-6">
                    <Heart className="h-8 w-8 text-custom-beige mb-4" />
                    <h4 className="font-bold text-gray-900 mb-3">Santé et Bien-être</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Cliniques privées modernes</li>
                      <li>• Pharmacies de garde</li>
                      <li>• Centres de soins spécialisés</li>
                      <li>• Espaces verts et parcs</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <GraduationCap className="h-6 w-6 text-custom-beige mr-3" />
                Éducation et Vie Familiale
              </h2>

              <p className="text-gray-700 mb-6 leading-relaxed">
                La Soukra est particulièrement appréciée des familles grâce à son offre éducative de qualité. De
                nombreuses écoles privées et publiques, ainsi que des établissements d'enseignement supérieur, sont
                facilement accessibles depuis la commune.
              </p>

              <div className="bg-gray-50 p-6 mb-8">
                <h3 className="font-bold text-gray-900 mb-4">Établissements éducatifs notables :</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Écoles Primaires et Secondaires</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• École Internationale de La Soukra</li>
                      <li>• Lycée Pilote de La Soukra</li>
                      <li>• Écoles privées bilingues</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Enseignement Supérieur</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Proximité de l'Université de Tunis</li>
                      <li>• Écoles d'ingénieurs privées</li>
                      <li>• Instituts de formation professionnelle</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Car className="h-6 w-6 text-custom-beige mr-3" />
                Accessibilité et Transport
              </h2>

              <p className="text-gray-700 mb-6 leading-relaxed">
                Stratégiquement située, La Soukra bénéficie d'excellentes connexions de transport. La proximité de
                l'autoroute A1 permet de rejoindre rapidement le centre de Tunis, l'aéroport international
                Tunis-Carthage, et les autres gouvernorats du pays.
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-custom-beige-light">
                  <MapPin className="h-8 w-8 text-custom-beige mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">Centre de Tunis</div>
                  <div className="text-sm text-gray-600">15-20 minutes</div>
                </div>
                <div className="text-center p-4 bg-custom-beige-light">
                  <Car className="h-8 w-8 text-custom-beige mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">Aéroport</div>
                  <div className="text-sm text-gray-600">10-15 minutes</div>
                </div>
                <div className="text-center p-4 bg-custom-beige-light">
                  <Building className="h-8 w-8 text-custom-beige mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">Sidi Bou Saïd</div>
                  <div className="text-sm text-gray-600">5-10 minutes</div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TreePine className="h-6 w-6 text-custom-beige mr-3" />
                Environnement et Qualité de Vie
              </h2>

              <p className="text-gray-700 mb-6 leading-relaxed">
                La Soukra se distingue par son environnement préservé et sa qualité de vie exceptionnelle. Les espaces
                verts abondants, l'air plus pur qu'en centre-ville, et l'architecture harmonieuse contribuent à créer un
                cadre de vie idéal pour toute la famille.
              </p>

              <div className="bg-custom-beige-light p-6 mb-8">
                <h3 className="font-bold text-gray-900 mb-4">Pourquoi choisir La Soukra pour votre résidence ?</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Environnement calme et sécurisé</li>
                    <li>✓ Proximité de tous les services</li>
                    <li>✓ Excellente accessibilité</li>
                    <li>✓ Cadre de vie familial</li>
                  </ul>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Espaces verts préservés</li>
                    <li>✓ Architecture harmonieuse</li>
                    <li>✓ Communauté dynamique</li>
                    <li>✓ Investissement d'avenir</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">The Life Residence : L'Excellence à La Soukra</h2>

              <p className="text-gray-700 mb-6 leading-relaxed">
                C'est dans ce cadre privilégié que s'implante The Life Residence, notre projet résidentiel d'exception.
                Situé à Chotrana 3, face au restaurant El Firma, ce complexe de 90 logements (82 appartements, 2 duplex
                et 6 villas) incarne parfaitement l'art de vivre à La Soukra.
              </p>

              <div className="relative h-64 mb-8">
                <Image
                  src="/luxury-tunisia-residence.png"
                  alt="The Life Residence - Vue d'ensemble du projet résidentiel à La Soukra"
                  fill
                  className="object-cover rounded-none"
                />
              </div>

              <p className="text-gray-700 mb-8 leading-relaxed">
                Avec ses finitions haut de gamme, ses espaces verts aménagés et sa sécurité 24h/24, The Life Residence
                représente l'aboutissement de l'expertise d'ISB Immobilière Sodaprim Bouaziz dans la création de projets
                résidentiels d'exception.
              </p>

              <div className="text-center">
                <Button size="lg" className="rounded-none bg-custom-beige hover:bg-custom-beige-hover" asChild>
                  <Link href="/">Découvrir The Life Residence</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Articles Connexes</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedArticles.map((article, index) => (
                <Card key={index} className="rounded-none border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">{article.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{article.title}</h3>
                    <p className="text-gray-600 mb-4">{article.excerpt}</p>
                    <Button
                      variant="outline"
                      className="rounded-none border-custom-beige text-custom-beige hover:bg-custom-beige hover:text-white bg-transparent"
                      asChild
                    >
                      <Link href={`/blog/${article.slug}`}>Lire la suite</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
