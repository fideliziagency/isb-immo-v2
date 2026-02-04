"use client"

import { useEffect, useMemo, useState } from "react"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || (typeof window !== "undefined" && window.location.hostname === "localhost" ? "http://localhost:3000" : "https://isb-immo-backend-latest.onrender.com")

type Lead = {
  id: string | number
  name?: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  message?: string
  unitType?: string
  propertyId?: string | number | null
  createdAt?: string
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState<string>("")

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const token = typeof window !== "undefined" ? localStorage.getItem("admin_access_token") : null
        const res = await fetch(`${API_BASE_URL}/leads`, {
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
        const arr: Lead[] = Array.isArray(data) ? data : Array.isArray(data?.items) ? data.items : []
        setLeads(arr)
      } catch (e: any) {
        if (e?.name !== "AbortError") setError("Impossible de charger les leads.")
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    load()
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return leads
    return leads.filter((l) => {
      const parts = [
        l.name,
        l.firstName,
        l.lastName,
        l.email,
        l.phone,
        l.unitType,
        l.message,
        typeof l.propertyId === "number" ? String(l.propertyId) : l.propertyId,
      ]
        .filter(Boolean)
        .map((s) => String(s).toLowerCase())
      return parts.some((p) => p.includes(q))
    })
  }, [leads, search])

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
        <div className="w-full max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par nom, email, téléphone, type, message…"
            className="w-full border rounded-none px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-400"
          />
        </div>
      </div>

      {loading && <div className="text-gray-500">Chargement…</div>}
      {!loading && error && <div className="text-red-600">{error}</div>}
      {!loading && !error && filtered.length === 0 && (
        <div className="text-gray-500">Aucun lead trouvé.</div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="overflow-auto border border-gray-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left font-medium px-3 py-2 border-b">#</th>
                <th className="text-left font-medium px-3 py-2 border-b">Nom</th>
                <th className="text-left font-medium px-3 py-2 border-b">Email</th>
                <th className="text-left font-medium px-3 py-2 border-b">Téléphone</th>
                <th className="text-left font-medium px-3 py-2 border-b">Type</th>
                <th className="text-left font-medium px-3 py-2 border-b">Propriété</th>
                <th className="text-left font-medium px-3 py-2 border-b">Message</th>
                <th className="text-left font-medium px-3 py-2 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l, idx) => (
                <tr key={l.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 border-b text-gray-700">{idx + 1}</td>
                  <td className="px-3 py-2 border-b text-gray-900">
                    {l.name || [l.firstName, l.lastName].filter(Boolean).join(" ") || "—"}
                  </td>
                  <td className="px-3 py-2 border-b text-gray-700">{l.email || "—"}</td>
                  <td className="px-3 py-2 border-b text-gray-700">{l.phone || "—"}</td>
                  <td className="px-3 py-2 border-b text-gray-700">{l.unitType || "—"}</td>
                  <td className="px-3 py-2 border-b text-gray-700">{l.propertyId ?? "—"}</td>
                  <td className="px-3 py-2 border-b text-gray-700 max-w-[320px] truncate" title={l.message || undefined}>
                    {l.message || "—"}
                  </td>
                  <td className="px-3 py-2 border-b text-gray-700">
                    {l.createdAt ? new Date(l.createdAt).toLocaleString() : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
