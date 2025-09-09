import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, User, Share2, Home, Sparkles, Shield, TreePine, Users, Car } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function BlogArtDeVivreElegantPage() {
  const relatedArticles = [
    {
      title: "Vivre à La Soukra : Entre Calme, Sécurité et Commodités",
      excerpt: "Découvrez les avantages de la vie à La Soukra et pourquoi cette commune séduit tant de familles.",
      image: "/la-soukra-neighborhood.png",
      date: "20 Décembre 2024",
      slug: "vivre-la-soukra-calme-securite-commodites",
    },
    {
      title: "Tendances de l'immobilier haut de gamme en Tunisie 2025",
      excerpt: "Les nouvelles tendances qui façonnent le marché immobilier de luxe tunisien.",
      image: "/tunisian-luxury-residence.png",
      date: "15 Décembre 2024",
      slug: "tendances-immobilier-haut-gamme-tunisie-2025",
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
              <span className="text-gray-900">Art de Vivre Élégant</span>
            </div>

            <div className="mb-8">
              <Badge className="mb-4 bg-custom-beige-light text-custom-beige rounded-none">Lifestyle</Badge>
              <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                L'Art de Vivre Élégant à La Soukra
              </h1>

              <div className="flex items-center space-x-6 text-gray-600 mb-8">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>5 Décembre 2024</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>4 min de lecture</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Équipe ISB Immobilière</span>
                </div>
              </div>

              <div className="relative h-96 mb-8">
                <Image
                  src="/luxury-tunisia-residence.png"
                  alt="The Life Residence - Art de vivre élégant à La Soukra"
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
                The Life Residence ne se contente pas d'offrir des logements d'exception à La Soukra. Ce projet
                résidentiel redéfinit les standards de l'habitat moderne en Tunisie, créant un véritable art de vivre où
                élégance, confort et raffinement se conjuguent harmonieusement.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Sparkles className="h-6 w-6 text-custom-beige mr-3" />
                Une Architecture d'Exception
              </h2>

              <p className="text-gray-700 mb-6 leading-relaxed">
                Chaque détail architectural de The Life Residence a été pensé pour créer une harmonie parfaite entre
                modernité et élégance intemporelle. Les lignes épurées de la façade, les matériaux nobles et les
                finitions haut de gamme témoignent d'un savoir-faire exceptionnel.
              </p>

              <div className="bg-custom-beige-light p-6 mb-8 border-l-4 border-custom-beige">
                <h3 className="font-bold text-gray-900 mb-3">Signatures architecturales :</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Façades contemporaines avec jeu de volumes</li>
                  <li>• Grandes baies vitrées pour une luminosité optimale</li>
                  <li>• Terrasses et balcons aux lignes épurées</li>
                  <li>• Intégration harmonieuse dans l'environnement</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Home className="h-6 w-6 text-custom-beige mr-3" />
                Des Espaces de Vie Pensés pour le Bien-être
              </h2>

              <p className="text-gray-700 mb-6 leading-relaxed">
                Au-delà de l'esthétique, The Life Residence privilégie la fonctionnalité et le confort. Chaque
                appartement, duplex et villa a été conçu pour optimiser l'espace et créer une atmosphère de sérénité
                propice au bien-être familial.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="rounded-none border-0 shadow-sm">
                  <CardContent className="p-6">
                    <Sparkles className="h-8 w-8 text-custom-beige mb-4" />
                    <h4 className="font-bold text-gray-900 mb-3">Finitions Premium</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Carrelage grand format premium</li>
                      <li>• Menuiserie aluminium haut de gamme</li>
                      <li>• Sanitaires et robinetterie de luxe</li>
                      <li>• Éclairage LED avec variateurs</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="rounded-none border-0 shadow-sm">
                  <CardContent className="p-6">
                    <TreePine className="h-8 w-8 text-custom-beige mb-4" />
                    <h4 className="font-bold text-gray-900 mb-3">Espaces Extérieurs</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Jardins paysagers soignés</li>
                      <li>• Terrasses et balcons spacieux</li>
                      <li>• Espaces verts communs</li>
                      <li>• Aires de détente aménagées</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="h-6 w-6 text-custom-beige mr-3" />
                Un Cadre de Vie Sécurisé et Serein
              </h2>

              <p className="text-gray-700 mb-6 leading-relaxed">
                La tranquillité d'esprit est au cœur de la philosophie de The Life Residence. Un système de sécurité
                moderne et discret, associé à un environnement paisible, garantit à chaque résident un cadre de vie
                serein et protégé.
              </p>

              <div className="bg-gray-50 p-6 mb-8">
                <h3 className="font-bold text-gray-900 mb-4">Services et commodités :</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Shield className="h-4 w-4 text-custom-beige mr-2" />
                      Sécurité
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Gardiennage 24h/24</li>
                      <li>• Vidéosurveillance HD</li>
                      <li>• Contrôle d'accès sécurisé</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Car className="h-4 w-4 text-custom-beige mr-2" />
                      Commodités
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Parking sécurisé</li>
                      <li>• Espaces communs</li>
                      <li>• Maintenance assurée</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="h-6 w-6 text-custom-beige mr-3" />
                Une Communauté d'Exception
              </h2>

              <p className="text-gray-700 mb-6 leading-relaxed">
                Vivre à The Life Residence, c'est intégrer une communauté de résidents partageant les mêmes valeurs
                d'excellence et de raffinement. Les espaces communs favorisent les rencontres et créent un véritable
                esprit de voisinage dans le respect de l'intimité de chacun.
              </p>

              <div className="bg-custom-beige-light p-6 mb-8">
                <h3 className="font-bold text-gray-900 mb-4">Pourquoi choisir The Life Residence ?</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Architecture contemporaine d'exception</li>
                    <li>✓ Finitions et équipements haut de gamme</li>
                    <li>✓ Emplacement privilégié à La Soukra</li>
                    <li>✓ Sécurité et tranquillité garanties</li>
                  </ul>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Espaces verts et aires de détente</li>
                    <li>✓ Communauté résidentielle select</li>
                    <li>✓ Services et commodités intégrés</li>
                    <li>✓ Investissement d'avenir sécurisé</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">L'Excellence Signée ISB Immobilière</h2>

              <p className="text-gray-700 mb-6 leading-relaxed">
                Fort de plus de 20 ans d'expérience dans la promotion immobilière haut de gamme, ISB Immobilière
                Sodaprim Bouaziz apporte à The Life Residence toute son expertise et son savoir-faire. Chaque projet est
                une signature d'excellence qui perdure dans le temps.
              </p>

              <p className="text-gray-700 mb-8 leading-relaxed">
                The Life Residence incarne ainsi une nouvelle vision de l'habitat résidentiel en Tunisie, où l'art de
                vivre élégant devient une réalité quotidienne pour ses résidents privilégiés.
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
