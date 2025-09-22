"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight, BookOpen, TrendingUp, Home, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const blogPosts = [
  {
    id: 1,
    title: "Vivre à La Soukra : Entre Calme, Sécurité et Commodités",
    excerpt:
      "Découvrez pourquoi La Soukra est devenue l'une des destinations résidentielles les plus prisées de la région tunisoise.",
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
      "Analyse des nouvelles tendances qui façonnent le marché immobilier de luxe tunisien et les attentes des acquéreurs.",
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
      "Les avantages exclusifs de l'achat sur plan et les garanties offertes aux acquéreurs dans le contexte actuel.",
    image: "/modern-apartment-construction.png",
    category: "Investissement",
    date: "10 Décembre 2024",
    readTime: "6 min",
    slug: "pourquoi-acheter-sur-plan-2025-avantages-garanties",
    featured: false,
  },
]

const categories = [
  { name: "Lifestyle", icon: Home, color: "bg-green-100 text-green-800" },
  { name: "Marché", icon: TrendingUp, color: "bg-blue-100 text-blue-800" },
  { name: "Investissement", icon: Users, color: "bg-purple-100 text-purple-800" },
]

export default function BlogSection() {
  const getCategoryIcon = (categoryName: string) => {
    const category = categories.find((cat) => cat.name === categoryName)
    return category ? category.icon : BookOpen
  }

  const getCategoryColor = (categoryName: string) => {
    const category = categories.find((cat) => cat.name === categoryName)
    return category ? category.color : "bg-gray-100 text-gray-800"
  }

  return (
    <section id="actualites" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-custom-beige-light text-custom-beige rounded-none">The Life Magazine</Badge>
          <h2 className="text-6xl font-bold text-gray-900 mb-6">Actualités & Conseils</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Restez informé des dernières tendances immobilières, découvrez nos conseils d'experts et suivez l'actualité
            de The Life Residence.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured Article */}
          <div className="lg:col-span-2">
            {blogPosts
              .filter((post) => post.featured)
              .map((post) => {
                const CategoryIcon = getCategoryIcon(post.category)
                return (
                  <Card key={post.id} className="rounded-none border-0 shadow-lg overflow-hidden group">
                    <div className="relative h-80">
                      <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <Badge className={`rounded-none ${getCategoryColor(post.category)}`}>
                          <CategoryIcon className="h-3 w-3 mr-1" />
                          {post.category}
                        </Badge>
                      </div>
                      <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-custom-beige-light transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-200 mb-4 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-gray-300 text-sm">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{post.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className="rounded-none bg-custom-beige hover:bg-custom-beige-hover"
                            asChild
                          >
                            <Link href={`/blog/${post.slug}`}>
                              Lire l'article
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}
          </div>

          {/* Other Articles */}
          <div className="space-y-6">
            {blogPosts
              .filter((post) => !post.featured)
              .map((post) => {
                const CategoryIcon = getCategoryIcon(post.category)
                return (
                  <Card
                    key={post.id}
                    className="rounded-none border-0 shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <div className="flex">
                      <div className="relative w-32 h-24 flex-shrink-0">
                        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                      </div>
                      <CardContent className="flex-1 p-4">
                        <Badge className={`mb-2 rounded-none text-xs ${getCategoryColor(post.category)}`}>
                          <CategoryIcon className="h-3 w-3 mr-1" />
                          {post.category}
                        </Badge>
                        <h4 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-custom-beige transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center space-x-3">
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
                    </div>
                  </Card>
                )
              })}

            {/* Newsletter Signup */}
            <Card className="rounded-none border-0 shadow-sm bg-custom-beige-light">
              <CardContent className="p-6 text-center">
                <BookOpen className="h-8 w-8 text-custom-beige mx-auto mb-3" />
                <h4 className="font-bold text-gray-900 mb-2">Newsletter The Life</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Recevez nos derniers articles et actualités directement dans votre boîte mail.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent text-sm"
                  />
                  <Button size="sm" className="w-full rounded-none bg-custom-beige hover:bg-custom-beige-hover">
                    S'abonner
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="rounded-none border-custom-beige text-custom-beige hover:bg-custom-beige hover:text-white bg-transparent"
            asChild
          >
            <Link href="/blog">
              Voir Tous les Articles
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
