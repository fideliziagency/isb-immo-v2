"use client"

import { useEffect, useState } from "react"
import { BarChart3, CheckCircle2, Clock3, Home, ShoppingBag } from "lucide-react"

type Stats = {
  categories?: {
    total: number
    published: number
    pending: number
  }
  houses?: {
    total: number
    sold: number
    available: number
  }
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || (typeof window !== "undefined" && window.location.hostname === "localhost" ? "http://localhost:3000" : "https://isb-immo-backend-latest.onrender.com")

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const token = typeof window !== "undefined" ? localStorage.getItem("admin_access_token") : null
        const res = await fetch(`${API_BASE_URL}/stats`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          cache: "no-store",
          signal: controller.signal,
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        if (!isMounted) return
        setStats(data as Stats)
      } catch (e: any) {
        if (e?.name === "AbortError") return
        setError("Impossible de charger les statistiques.")
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    load()
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [API_BASE_URL])

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Tableau de bord</h1>

      {loading && <div className="text-gray-500">Chargement des statistiques…</div>}
      {!loading && error && <div className="text-red-600">{error}</div>}

      {!loading && !error && stats && (
        <div className="space-y-8">
          {/* Categories Section */}
          {stats.categories && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Catégories
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="border rounded-lg p-6 bg-white shadow-sm flex items-center gap-4">
                  <div className="h-12 w-12 rounded-md flex items-center justify-center bg-blue-50">
                    <BarChart3 className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 uppercase tracking-wide">Total</div>
                    <div className="text-3xl font-bold text-gray-900 mt-1">{stats.categories.total}</div>
                  </div>
                </div>
                <div className="border rounded-lg p-6 bg-white shadow-sm flex items-center gap-4">
                  <div className="h-12 w-12 rounded-md flex items-center justify-center bg-green-50">
                    <CheckCircle2 className="h-6 w-6 text-green-700" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 uppercase tracking-wide">Publiées</div>
                    <div className="text-3xl font-bold text-gray-900 mt-1">{stats.categories.published}</div>
                  </div>
                </div>
                <div className="border rounded-lg p-6 bg-white shadow-sm flex items-center gap-4">
                  <div className="h-12 w-12 rounded-md flex items-center justify-center bg-amber-50">
                    <Clock3 className="h-6 w-6 text-amber-700" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 uppercase tracking-wide">En attente</div>
                    <div className="text-3xl font-bold text-gray-900 mt-1">{stats.categories.pending}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Houses Section */}
          {stats.houses && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Home className="h-5 w-5" />
                Maisons
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="border rounded-lg p-6 bg-white shadow-sm flex items-center gap-4">
                  <div className="h-12 w-12 rounded-md flex items-center justify-center bg-blue-50">
                    <BarChart3 className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 uppercase tracking-wide">Total</div>
                    <div className="text-3xl font-bold text-gray-900 mt-1">{stats.houses.total}</div>
                  </div>
                </div>
                <div className="border rounded-lg p-6 bg-white shadow-sm flex items-center gap-4">
                  <div className="h-12 w-12 rounded-md flex items-center justify-center bg-red-50">
                    <CheckCircle2 className="h-6 w-6 text-red-700" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 uppercase tracking-wide">Vendues</div>
                    <div className="text-3xl font-bold text-gray-900 mt-1">{stats.houses.sold}</div>
                  </div>
                </div>
                <div className="border rounded-lg p-6 bg-white shadow-sm flex items-center gap-4">
                  <div className="h-12 w-12 rounded-md flex items-center justify-center bg-green-50">
                    <CheckCircle2 className="h-6 w-6 text-green-700" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 uppercase tracking-wide">Disponibles</div>
                    <div className="text-3xl font-bold text-gray-900 mt-1">{stats.houses.available}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
