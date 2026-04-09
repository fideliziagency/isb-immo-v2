"use client"

import { useEffect, useState } from "react"
import { supabase, type Availability } from "@/lib/supabase"
import { Building2, CheckCircle2, AlertCircle, TrendingDown, RefreshCw, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [availability, setAvailability] = useState<Availability[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const loadData = async () => {
    setLoading(true)
    const { data } = await supabase
      .from("property_availability")
      .select("*")
    if (data) setAvailability(data)
    setLastUpdate(new Date())
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  const totalPlans = availability.reduce((a, b) => a + Number(b.total_plans), 0)
  const totalVendus = availability.reduce((a, b) => a + Number(b.vendus), 0)
  const totalDispo = availability.reduce((a, b) => a + Number(b.disponibles), 0)
  const tauxVente = totalPlans > 0 ? Math.round((totalVendus / totalPlans) * 100) : 0

  const typeColors: Record<string, string> = {
    s1: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    s2: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    s3: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    duplex: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    villa: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  }

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-2xl font-semibold">Tableau de bord</h1>
          <p className="text-gray-500 text-sm mt-1">
            Mis à jour le {lastUpdate.toLocaleDateString("fr-FR")} à {lastUpdate.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Actualiser
          </button>
          <Link
            href="https://www.isbimmobiliere.com"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 bg-[#b6b09f]/10 hover:bg-[#b6b09f]/20 text-[#b6b09f] rounded-lg text-sm transition-colors border border-[#b6b09f]/20"
          >
            <ExternalLink className="w-4 h-4" />
            Voir le site
          </Link>
        </div>
      </div>

      {/* Stats globales */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total unités", value: totalPlans, icon: Building2, color: "text-white" },
          { label: "Disponibles", value: totalDispo, icon: CheckCircle2, color: "text-emerald-400" },
          { label: "Vendus", value: totalVendus, icon: AlertCircle, color: "text-rose-400" },
          { label: "Taux de vente", value: `${tauxVente}%`, icon: TrendingDown, color: "text-amber-400" },
        ].map((stat) => (
          <div key={stat.label} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-500 text-xs font-medium">{stat.label}</p>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Par type de bien */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl mb-8">
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-white font-medium text-sm">Disponibilités par type</h2>
          <Link href="/admin/plans" className="text-[#b6b09f] text-xs hover:underline">
            Gérer les plans →
          </Link>
        </div>
        <div className="divide-y divide-gray-800">
          {loading ? (
            <div className="p-8 text-center text-gray-600 text-sm">Chargement…</div>
          ) : availability.map((item) => {
            const pct = item.total_plans > 0
              ? Math.round((Number(item.vendus) / Number(item.total_plans)) * 100)
              : 0
            return (
              <div key={item.code} className="p-4 flex items-center gap-4">
                <span className={`text-xs font-mono px-2 py-0.5 rounded border uppercase ${typeColors[item.code] || "bg-gray-800 text-gray-400 border-gray-700"}`}>
                  {item.code}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-white text-sm">{item.title}</span>
                    <span className="text-gray-500 text-xs">
                      <span className="text-emerald-400 font-medium">{item.disponibles}</span>
                      {" "}dispo · {" "}
                      <span className="text-rose-400 font-medium">{item.vendus}</span>
                      {" "}vendu{Number(item.vendus) > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-rose-500 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
                <Link
                  href={`/admin/plans?type=${item.code}`}
                  className="text-xs text-gray-600 hover:text-[#b6b09f] transition-colors px-2 py-1 rounded hover:bg-gray-800"
                >
                  Gérer →
                </Link>
              </div>
            )
          })}
        </div>
      </div>

      {/* Raccourcis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { href: "/admin/plans", title: "Plans & Ventes", desc: "Marquer des appartements comme vendus, ajouter des plans", color: "border-blue-500/20 hover:border-blue-500/40" },
          { href: "/admin/logements", title: "Logements", desc: "Modifier les descriptions, photos, et infos par type de bien", color: "border-[#b6b09f]/20 hover:border-[#b6b09f]/40" },
          { href: "/admin/contenu", title: "Contenu du site", desc: "Éditer les textes et images de la homepage", color: "border-purple-500/20 hover:border-purple-500/40" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`bg-gray-900 border ${item.color} rounded-xl p-5 transition-all hover:bg-gray-800/50 group`}
          >
            <h3 className="text-white font-medium text-sm mb-1 group-hover:text-[#b6b09f] transition-colors">
              {item.title}
            </h3>
            <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
