"use client"

import { useEffect, useMemo, useState } from "react"
import { getAdminToken, isTokenValid } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"

const API_BASE_URL =
  (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_API_BASE_URL) ||
  (typeof window !== "undefined" && window.location.hostname === "localhost" ? "http://localhost:3000" : "https://isb-immo-backend-latest.onrender.com")

function resolveImageUrl(src?: string): string {
  if (!src) return ""
  if (/^https?:\/\//i.test(src)) return src
  if (src.startsWith("/uploads")) return `${API_BASE_URL}${src}`
  return src
}

type Property = {
  id: number
  code: string
  type: string
  title: string
  sold?: boolean
  status?: string
}

type FloorPlan = {
  id: number
  filename: string
  path: string
  title?: string
  order?: number
  isCarouselImage?: boolean
  createdAt?: string
}

type House = {
  id: number
  code: string
  name: string
  description: string
  mainImage?: string
  salesStatus: "available" | "sold" | "reserved"
  address?: string
  totalSurface?: string
  price?: string
  details?: Record<string, string>
  properties?: Property[]
  floorPlans?: FloorPlan[]
  createdAt: string
  updatedAt: string
}

const statusLabel: Record<string, string> = {
  available: "Disponible",
  sold: "Vendue",
  reserved: "Réservée",
}

export default function AdminHousesPage() {
  const [token, setToken] = useState<string | null>(null)
  const [items, setItems] = useState<House[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<House | null>(null)
  const [toast, setToast] = useState<null | { type: "success" | "error"; message: string }>(null)
  const [addOpen, setAddOpen] = useState(false)
  const [editDraft, setEditDraft] = useState<Partial<House> | null>(null)
  const [uploading, setUploading] = useState(false)

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message })
    setTimeout(() => setToast(null), 3500)
  }

  useEffect(() => {
    const t = getAdminToken()
    if (t && isTokenValid(t)) setToken(t)
  }, [])

  const fetchList = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch(`${API_BASE_URL}/houses`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setItems(Array.isArray(data) ? data : Array.isArray(data?.items) ? data.items : [])
    } catch (e: any) {
      setError(e.message || "Erreur de chargement")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return items
    return items.filter((h) => [h.code, h.name].some((v) => (v || "").toLowerCase().includes(q)))
  }, [items, search])

  const selectItem = async (id: number) => {
    try {
      setLoading(true)
      const res = await fetch(`${API_BASE_URL}/houses/${id}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = (await res.json()) as House
      setSelected(data)
      setEditDraft({ ...data })
    } catch (e: any) {
      showToast("error", e.message || "Erreur lors du chargement des détails")
    } finally {
      setLoading(false)
    }
  }

  const saveEdit = async () => {
    if (!selected || !token || !editDraft) return
    try {
      const payload: any = { ...editDraft }
      delete payload.id
      delete payload.createdAt
      delete payload.updatedAt
      delete payload.properties
      delete payload.floorPlans
      const res = await fetch(`${API_BASE_URL}/houses/${selected.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      showToast("success", "Maison mise à jour")
      await fetchList()
      await selectItem(selected.id)
    } catch (e: any) {
      showToast("error", e.message || "Échec de la mise à jour")
    }
  }

  const removeItem = async () => {
    if (!selected || !token) return
    if (!confirm("Supprimer cette maison ?")) return
    try {
      const res = await fetch(`${API_BASE_URL}/houses/${selected.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      showToast("success", "Maison supprimée")
      setSelected(null)
      setEditDraft(null)
      await fetchList()
    } catch (e: any) {
      showToast("error", e.message || "Échec de la suppression")
    }
  }

  const addItem = async (form: Partial<House>) => {
    if (!token) return showToast("error", "Connectez-vous")
    try {
      const res = await fetch(`${API_BASE_URL}/houses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      showToast("success", "Maison créée")
      setAddOpen(false)
      await fetchList()
    } catch (e: any) {
      showToast("error", e.message || "Échec de la création")
    }
  }

  const uploadMainImage = async (file: File | null) => {
    if (!selected || !token || !file) return
    try {
      setUploading(true)
      const formData = new FormData()
      formData.append("files", file)

      const uploadRes = await fetch(`${API_BASE_URL}/uploads/houses/${selected.id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })
      if (!uploadRes.ok) throw new Error(`HTTP ${uploadRes.status}`)
      const uploaded = (await uploadRes.json()) as Array<{ filename: string; path: string }>
      const first = uploaded[0]
      if (!first) throw new Error("Fichier non reçu")

      const updateRes = await fetch(`${API_BASE_URL}/houses/${selected.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ mainImage: first.path }),
      })
      if (!updateRes.ok) throw new Error(`HTTP ${updateRes.status}`)

      showToast("success", "Image principale mise à jour")
      await fetchList()
      await selectItem(selected.id)
    } catch (e: any) {
      showToast("error", e.message || "Échec de l'upload")
    } finally {
      setUploading(false)
    }
  }

  const uploadFloorPlans = async (files: FileList | null) => {
    if (!selected || !token || !files || files.length === 0) return
    try {
      setUploading(true)
      const formData = new FormData()
      Array.from(files).forEach((file) => formData.append("files", file))

      const uploadRes = await fetch(`${API_BASE_URL}/uploads/houses/${selected.id}/carousel`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })
      if (!uploadRes.ok) throw new Error(`HTTP ${uploadRes.status}`)
      const uploaded = (await uploadRes.json()) as Array<{ filename: string; path: string }>

      const creationTasks = uploaded.map((file, index) => {
        const original = Array.from(files)[index]
        const title = original?.name ? original.name.replace(/\.[^/.]+$/, "") : file.filename
        return fetch(`${API_BASE_URL}/floor-plans`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            filename: file.filename,
            path: file.path,
            houseId: selected.id,
            title,
            isCarouselImage: true,
          }),
        })
      })

      const results = await Promise.all(creationTasks)
      if (results.some((r) => !r.ok)) throw new Error("Échec lors de la création des plans")

      showToast("success", "Images du carousel ajoutées")
      await selectItem(selected.id)
    } catch (e: any) {
      showToast("error", e.message || "Échec de l'upload")
    } finally {
      setUploading(false)
    }
  }

  const replaceFloorPlan = async (planId: number, file: File | null) => {
    if (!selected || !token || !file) return
    try {
      setUploading(true)
      const formData = new FormData()
      formData.append("files", file)

      const uploadRes = await fetch(`${API_BASE_URL}/uploads/houses/${selected.id}/carousel`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })
      if (!uploadRes.ok) throw new Error(`HTTP ${uploadRes.status}`)
      const uploaded = (await uploadRes.json()) as Array<{ filename: string; path: string }>
      const first = uploaded[0]
      if (!first) throw new Error("Fichier non reçu")

      const replaceRes = await fetch(`${API_BASE_URL}/floor-plans/${planId}/replace`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ filename: first.filename, path: first.path }),
      })
      if (!replaceRes.ok) throw new Error(`HTTP ${replaceRes.status}`)

      showToast("success", "Plan remplacé")
      await selectItem(selected.id)
    } catch (e: any) {
      showToast("error", e.message || "Échec du remplacement")
    } finally {
      setUploading(false)
    }
  }

  const deleteFloorPlan = async (planId: number) => {
    if (!selected || !token) return
    if (!confirm("Supprimer ce plan ?")) return
    try {
      const res = await fetch(`${API_BASE_URL}/floor-plans/${planId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      showToast("success", "Plan supprimé")
      await selectItem(selected.id)
    } catch (e: any) {
      showToast("error", e.message || "Échec de la suppression")
    }
  }

  const carouselPlans = (selected?.floorPlans || []).filter((plan) => plan.isCarouselImage)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Maisons</h1>
          <p className="text-sm text-gray-600">Gérer vos maisons, statuts et plans.</p>
        </div>
        <Button
          onClick={() => setAddOpen(true)}
          className="rounded-none bg-transparent text-custom-beige border-2 border-custom-beige hover:bg-custom-beige hover:text-white"
        >
          Ajouter une maison
        </Button>
      </div>

      <div className="bg-white border p-4 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <input
            type="text"
            placeholder="Rechercher par code ou nom..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300"
          />
          <Button
            onClick={fetchList}
            className="rounded-none bg-transparent text-custom-beige border-2 border-custom-beige hover:bg-custom-beige hover:text-white"
          >
            Rafraîchir
          </Button>
        </div>

        <div className="overflow-auto border">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="text-left px-3 py-2 border-b">ID</th>
                <th className="text-left px-3 py-2 border-b">Code</th>
                <th className="text-left px-3 py-2 border-b">Nom</th>
                <th className="text-left px-3 py-2 border-b">Statut</th>
                <th className="text-left px-3 py-2 border-b">Créé</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={5} className="px-3 py-4 text-center text-gray-500">
                    Chargement...
                  </td>
                </tr>
              )}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-3 py-4 text-center text-gray-500">
                    Aucune maison
                  </td>
                </tr>
              )}
              {!loading &&
                filtered.map((h) => (
                  <tr
                    key={h.id}
                    className={`hover:bg-gray-50 cursor-pointer ${selected?.id === h.id ? "bg-custom-beige/10" : ""}`}
                    onClick={() => selectItem(h.id)}
                  >
                    <td className="px-3 py-2 border-b">{h.id}</td>
                    <td className="px-3 py-2 border-b font-medium">{h.code}</td>
                    <td className="px-3 py-2 border-b">{h.name}</td>
                    <td className="px-3 py-2 border-b">
                      <span className="px-2 py-1 text-xs border bg-gray-50 text-gray-700 border-gray-200">
                        {statusLabel[h.salesStatus] || h.salesStatus}
                      </span>
                    </td>
                    <td className="px-3 py-2 border-b">{new Date(h.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
      </div>

      {selected && editDraft && (
        <div className="bg-white border p-4 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Détails de la maison #{selected.id}</h2>
            <div className="flex gap-2">
              <Button
                onClick={removeItem}
                disabled={!token}
                className="rounded-none bg-transparent text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-white disabled:opacity-60"
              >
                Supprimer
              </Button>
            </div>
          </div>

          {selected.mainImage && (
            <div>
              <p className="text-sm text-gray-700 mb-2">Aperçu de l'image principale</p>
              <div className="border bg-gray-50 p-2 max-w-md">
                <img
                  src={resolveImageUrl(selected.mainImage)}
                  alt={selected.name || "Image de la maison"}
                  className="max-h-64 w-auto object-contain"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Modifier l'image principale</label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => uploadMainImage(e.target.files?.[0] || null)}
                disabled={uploading}
              />
              {uploading && <span className="text-xs text-gray-500">Upload en cours...</span>}
            </div>
            <p className="text-xs text-gray-500 mt-1">JPG, PNG recommandés. Max 5MB.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
              <input
                value={editDraft.code || ""}
                onChange={(e) => setEditDraft({ ...editDraft, code: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input
                value={editDraft.name || ""}
                onChange={(e) => setEditDraft({ ...editDraft, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                rows={4}
                value={editDraft.description || ""}
                onChange={(e) => setEditDraft({ ...editDraft, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image principale</label>
              <input
                value={editDraft.mainImage || ""}
                onChange={(e) => setEditDraft({ ...editDraft, mainImage: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Statut de vente</label>
              <select
                value={editDraft.salesStatus || "available"}
                onChange={(e) => setEditDraft({ ...editDraft, salesStatus: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300"
              >
                <option value="available">Disponible</option>
                <option value="sold">Vendue</option>
                <option value="reserved">Réservée</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
              <input
                value={editDraft.address || ""}
                onChange={(e) => setEditDraft({ ...editDraft, address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Surface totale</label>
              <input
                value={editDraft.totalSurface || ""}
                onChange={(e) => setEditDraft({ ...editDraft, totalSurface: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prix</label>
              <input
                value={editDraft.price || ""}
                onChange={(e) => setEditDraft({ ...editDraft, price: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Détails (JSON)</label>
              <textarea
                rows={3}
                value={editDraft.details ? JSON.stringify(editDraft.details, null, 2) : ""}
                onChange={(e) => {
                  const value = e.target.value
                  try {
                    const parsed = value ? JSON.parse(value) : {}
                    setEditDraft({ ...editDraft, details: parsed })
                  } catch {
                    setEditDraft({ ...editDraft, details: editDraft.details })
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 font-mono text-xs"
                placeholder='{"parking": "2 places", "jardin": "privatif"}'
              />
              <p className="text-xs text-gray-500 mt-1">Format JSON attendu.</p>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Button
              onClick={saveEdit}
              disabled={!token}
              className="rounded-none bg-transparent text-custom-beige border-2 border-custom-beige hover:bg-custom-beige hover:text-white disabled:opacity-60"
            >
              Enregistrer les modifications
            </Button>
            {!token && <p className="text-xs text-red-600 self-center">Connectez-vous pour modifier.</p>}
          </div>

          {/* Properties overview */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Biens associés</h3>
            {selected.properties && selected.properties.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-3">
                {selected.properties.map((p) => (
                  <div key={p.id} className="border p-3 bg-gray-50">
                    <div className="font-medium">{p.title}</div>
                    <div className="text-xs text-gray-600">{p.type} · {p.code}</div>
                    <div className="text-xs text-gray-600">{p.sold ? "Vendu" : "Disponible"}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-500">Aucun bien associé.</div>
            )}
          </div>

          {/* Floor plans management */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Carousel (images pour détail public)</h3>
            <p className="text-sm text-gray-600 mb-3">Ajoutez des images pour le carousel sur la page de détail publique</p>
            <div className="flex items-center gap-3 mb-4">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => uploadFloorPlans(e.target.files)}
                disabled={uploading}
              />
              {uploading && <span className="text-xs text-gray-500">Upload en cours...</span>}
            </div>

            {carouselPlans.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {carouselPlans.map((plan) => (
                  <div key={plan.id} className="border p-3 bg-white">
                    <div className="text-sm font-medium mb-2">{plan.title || plan.filename}</div>
                    <div className="border bg-gray-50 p-2 mb-3">
                      <img
                        src={resolveImageUrl(plan.path)}
                        alt={plan.title || "Plan"}
                        className="max-h-48 w-auto object-contain"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-gray-600">Remplacer:</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => replaceFloorPlan(plan.id, e.target.files?.[0] || null)}
                      />
                      <Button
                        onClick={() => deleteFloorPlan(plan.id)}
                        disabled={!token}
                        className="ml-auto rounded-none bg-transparent text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-white disabled:opacity-60"
                      >
                        Supprimer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-500">Aucune image disponible.</div>
            )}
          </div>
        </div>
      )}

      {addOpen && (
        <AddHousePanel onClose={() => setAddOpen(false)} onSubmit={addItem} />
      )}

      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 shadow-lg border text-white ${
            toast.type === "success" ? "bg-green-600 border-green-700" : "bg-red-600 border-red-700"
          }`}
          role="status"
          aria-live="polite"
        >
          {toast.message}
        </div>
      )}
    </div>
  )
}

function AddHousePanel({
  onClose,
  onSubmit,
}: {
  onClose: () => void
  onSubmit: (form: Partial<House>) => void
}) {
  const [form, setForm] = useState<Partial<House>>({
    code: "",
    name: "",
    description: "",
    salesStatus: "available",
  })

  return (
    <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white border shadow-lg w-full max-w-2xl p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Ajouter une maison</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">✕</button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
            <input
              value={form.code || ""}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input
              value={form.name || ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows={4}
              value={form.description || ""}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Statut de vente</label>
            <select
              value={form.salesStatus || "available"}
              onChange={(e) => setForm({ ...form, salesStatus: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300"
            >
              <option value="available">Disponible</option>
              <option value="sold">Vendue</option>
              <option value="reserved">Réservée</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image principale</label>
            <input
              value={form.mainImage || ""}
              onChange={(e) => setForm({ ...form, mainImage: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
            <input
              value={form.address || ""}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Surface totale</label>
            <input
              value={form.totalSurface || ""}
              onChange={(e) => setForm({ ...form, totalSurface: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prix</label>
            <input
              value={form.price || ""}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300"
            />
          </div>
        </div>

        <div className="mt-4 flex gap-2 justify-end">
          <Button
            onClick={() => onSubmit(form)}
            className="rounded-none bg-transparent text-custom-beige border-2 border-custom-beige hover:bg-custom-beige hover:text-white"
          >
            Créer
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="rounded-none border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
          >
            Annuler
          </Button>
        </div>
      </div>
    </div>
  )
}
