"use client"

import { useEffect, useState } from "react"
import { BarChart3, CheckCircle2, Clock3 } from "lucide-react"

type Stats = Record<string, number>

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ""

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

  const safeKeys = (obj: Stats | null): string[] => (obj ? Object.keys(obj) : [])

  const pretty: Record<string, { label: string; icon: any; color: string; bg: string }> = {
    total: { label: "Total", icon: BarChart3, color: "text-blue-700", bg: "bg-blue-50" },
    published: { label: "Publiées", icon: CheckCircle2, color: "text-green-700", bg: "bg-green-50" },
    pending: { label: "En attente", icon: Clock3, color: "text-amber-700", bg: "bg-amber-50" },
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Tableau de bord</h1>

      {loading && <div className="text-gray-500">Chargement des statistiques…</div>}
      {!loading && error && <div className="text-red-600">{error}</div>}

      {!loading && !error && stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Highlight known stats first with labels/icons */}
          {["total", "published", "pending"].filter((k) => k in stats).map((k) => {
            const cfg = pretty[k]
            const Icon = cfg?.icon
            return (
              <div key={k} className="border rounded-lg p-6 bg-white shadow-sm flex items-center gap-4">
                <div className={`h-12 w-12 rounded-md flex items-center justify-center ${cfg.bg}`}>
                  {Icon ? <Icon className={`h-6 w-6 ${cfg.color}`} /> : null}
                </div>
                <div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">{cfg?.label ?? k}</div>
                  <div className="text-3xl font-bold text-gray-900 mt-1">{stats[k]}</div>
                </div>
              </div>
            )
          })}

          {/* Render any additional fields returned by the API */}
          {safeKeys(stats)
            .filter((k) => !["total", "published", "pending"].includes(k))
            .map((k) => (
              <div key={k} className="border rounded-lg p-6 bg-white shadow-sm">
                <div className="text-sm text-gray-500 uppercase tracking-wide">{k}</div>
                <div className="text-3xl font-bold text-gray-900 mt-2">{stats[k]}</div>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
