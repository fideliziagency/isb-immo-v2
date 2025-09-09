import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, Search, Filter, BookOpen, TrendingUp, Home, Users, Building } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const blogPosts = [
  {
    id: 1,
    title: "Vivre à La Soukra : Entre Calme, Sécurité et Commodités",
    excerpt:
      "Découvrez pourquoi La Soukra est devenue l'une des destinations résidentielles les plus prisées de la région tunisoise, offrant un parfait équilibre entre tranquillité et accessibilité.",
    image: "/la-soukra-neighborhood.png",
    category: "Lifestyle",
    date: "20 Décembre 2024",
    readTime: "5 min",
    slug: "vivre-la-soukra-calme-securite-commodites",
    featured: true,
  },
  {
    id: 2,
    title: "Tendances de l'Immobilier Haut de Gamme en Tunisie 2025",
    excerpt:
      "Analyse complète des nouvelles tendances qui façonnent le marché immobilier de luxe tunisien et les attentes évolutives des acquéreurs modernes.",
    image: "/tunisian-luxury-residence.png",
    category: "Marché",
    date: "15 Décembre 2024",
    readTime: "7 min",
    slug: "tendances-immobilier-haut-gamme-tunisie-2025",
    featured: false,
  },
  {
    id: 3,
    title: "Pourquoi Acheter sur Plan en 2025 : Avantages et Garanties",
    excerpt:
      "Les avantages exclusifs de l'achat sur plan et les garanties offertes aux acquéreurs dans le contexte immobilier actuel de la Tunisie.",
    image: "/modern-apartment-construction.png",
    category: "Investissement",
    date: "10 Décembre 2024",
    readTime: "6 min",
    slug: "pourquoi-acheter-sur-plan-2025-avantages-garanties",
    featured: false,
  },
  {
    id: 4,
    title: "L'Art de Vivre Élégant à La Soukra",
    excerpt:
      "Comment The Life Residence redéfinit les standards de l'habitat moderne avec ses finitions exceptionnelles et ses services haut de gamme.",
    image: "/luxury-tunisia-residence.png",
    category: "Lifestyle",
    date: "5 Décembre 2024",
    readTime: "4 min",
    slug: "vivre-la-soukra-art-de-vivre-elegant",
    featured: false,
  },
]

const categories = [
  { name: "Tous", icon: BookOpen, count: 4 },
  { name: "Lifestyle", icon: Home, count: 2 },
  { name: "Marché", icon: TrendingUp, count: 1 },
  { name: "Investissement", icon: Users, count: 1 },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
              <div className="flex items-center space-x-2">
                <Building className="h-6 w-6 text-custom-beige" />
                <span className="text-lg font-bold text-gray-900">The Life Residence</span>
              </div>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un article..."
                  className="pl-10 pr-4 py-2 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent rounded-none"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-none border-custom-beige text-custom-beige hover:bg-custom-beige hover:text-white bg-transparent"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtrer
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-custom-beige-light text-custom-beige rounded-none">The Life Magazine</Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Blog & Actualités</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos conseils d'experts, les tendances du marché immobilier tunisien et l'actualité de The Life
              Residence.
            </p>
          </div>

          {/* Categories Filter */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-2 bg-gray-100 p-2 rounded-none">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant="ghost"
                  size="sm"
                  className="rounded-none hover:bg-custom-beige hover:text-white"
                >
                  <category.icon className="h-4 w-4 mr-2" />
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Article à la Une</h2>
          {blogPosts
            .filter((post) => post.featured)
            .map((post) => (
              <Card key={post.id} className="rounded-none border-0 shadow-lg overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-96 lg:h-auto">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  </div>
                  <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                    <Badge className="mb-4 bg-green-100 text-green-800 rounded-none w-fit">
                      <Home className="h-3 w-3 mr-1" />
                      {post.category}
                    </Badge>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h3>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <Button size="lg" className="rounded-none bg-custom-beige hover:bg-custom-beige-hover" asChild>
                        <Link href={`/blog/${post.slug}`}>Lire l'Article</Link>
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
        </div>
      </section>

      {/* All Articles */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Tous les Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts
              .filter((post) => !post.featured)
              .map((post) => (
                <Card key={post.id} className="rounded-none border-0 shadow-sm hover:shadow-lg transition-shadow group">
                  <div className="relative h-48">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                    <div className="absolute top-4 left-4">
                      <Badge
                        className={`rounded-none ${
                          post.category === "Lifestyle"
                            ? "bg-green-100 text-green-800"
                            : post.category === "Marché"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-custom-beige transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-sm text-gray-500">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-custom-beige hover:text-custom-beige-hover font-medium"
                      >
                        Lire →
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-custom-beige-light">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <BookOpen className="h-12 w-12 text-custom-beige mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Restez Informé</h2>
            <p className="text-gray-600 mb-8">
              Abonnez-vous à notre newsletter pour recevoir nos derniers articles, conseils d'experts et actualités
              immobilières directement dans votre boîte mail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
              />
              <Button className="rounded-none bg-custom-beige hover:bg-custom-beige-hover">S'abonner</Button>
            </div>
            <p className="text-xs text-gray-500 mt-4">Pas de spam, désabonnement possible à tout moment.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
