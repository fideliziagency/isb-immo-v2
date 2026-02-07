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

type Category = {
  id: number
  code: string
  type: string
  title: string
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
  location?: string
  mainImage?: string
  salesStatus: "available" | "sold" | "reserved"
  sold: boolean
  categoryId: number
  category?: Category
  price?: string
  surfaceDupHorsOeuvreRDC?: string
  surfaceDupHorsOeuvreR1?: string
  surfaceTotalDup?: string
  surfacePartiesCommunes?: string
  surfaceVendable?: string
  surfaceJardinPrive?: string
  planPdf?: string
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
  const [categories, setCategories] = useState<Category[]>([])
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
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/properties`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setCategories(Array.isArray(data) ? data : [])
    } catch (e: any) {
      console.error('Error fetching categories:', e)
      setCategories([])
    }
  }

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

  const updateSoldStatus = async (sold: boolean) => {
    if (!selected || !token) return
    try {
      const res = await fetch(`${API_BASE_URL}/houses/${selected.id}/sold`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sold }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      showToast("success", sold ? "Marquée vendue" : "Marquée non vendue")
      await fetchList()
      await selectItem(selected.id)
    } catch (e: any) {
      showToast("error", e.message || "Échec de la mise à jour")
    }
  }

  const uploadMainImage = async (file: File | null) => {
    if (!selected || !token || !file) return
    try {
      setUploading(true)
      const formData = new FormData()
      formData.append("file", file)

      const uploadRes = await fetch(`${API_BASE_URL}/uploads/houses/${selected.code}/main-image`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })
      if (!uploadRes.ok) throw new Error(`HTTP ${uploadRes.status}`)
      const uploaded = await uploadRes.json() as { filename: string; path: string; houseCode: string }

      const updateRes = await fetch(`${API_BASE_URL}/houses/${selected.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ mainImage: uploaded.path }),
      })
      if (!updateRes.ok) throw new Error(`HTTP ${updateRes.status}`)

      showToast("success", "Image principale mise à jour")
      setEditDraft({ ...editDraft, mainImage: uploaded.path })
      await fetchList()
      await selectItem(selected.id)
    } catch (e: any) {
      showToast("error", e.message || "Échec de l'upload")
    } finally {
      setUploading(false)
    }
  }

  const uploadPlanPdf = async (file: File | null) => {
    if (!selected || !token || !file) return
    if (!file.type.includes("pdf")) {
      showToast("error", "Veuillez sélectionner un fichier PDF")
      return
    }
    try {
      setUploading(true)
      const formData = new FormData()
      formData.append("file", file)

      const uploadRes = await fetch(`${API_BASE_URL}/uploads/houses/${selected.code}/plan-pdf`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })
      if (!uploadRes.ok) throw new Error(`HTTP ${uploadRes.status}`)
      const uploaded = await uploadRes.json() as { filename: string; path: string; houseCode: string }

      const updateRes = await fetch(`${API_BASE_URL}/houses/${selected.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ planPdf: uploaded.path }),
      })
      if (!updateRes.ok) throw new Error(`HTTP ${updateRes.status}`)

      showToast("success", "Plan PDF mis à jour")
      setEditDraft({ ...editDraft, planPdf: uploaded.path })
      await selectItem(selected.id)
    } catch (e: any) {
      showToast("error", e.message || "Échec de l'upload du PDF")
    } finally {
      setUploading(false)
    }
  }

  const uploadSliderImages = async (files: FileList | null) => {
    if (!selected || !token || !files || files.length === 0) return
    try {
      setUploading(true)
      const formData = new FormData()
      Array.from(files).forEach((file) => formData.append("files", file))

      const uploadRes = await fetch(`${API_BASE_URL}/uploads/houses/${selected.code}/slider-images`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })
      if (!uploadRes.ok) throw new Error(`HTTP ${uploadRes.status}`)
      
      showToast("success", "Images du slider ajoutées")
      await selectItem(selected.id)
    } catch (e: any) {
      showToast("error", e.message || "Échec de l'upload des images")
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Maisons</h1>
          <p className="text-sm text-gray-600">Gérer vos maisons, catégories, statuts et plans.</p>
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
                <th className="text-left px-3 py-2 border-b">Catégorie</th>
                <th className="text-left px-3 py-2 border-b">Statut</th>
                <th className="text-left px-3 py-2 border-b">Vendu</th>
                <th className="text-left px-3 py-2 border-b">Créé</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={7} className="px-3 py-4 text-center text-gray-500">
                    Chargement...
                  </td>
                </tr>
              )}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-3 py-4 text-center text-gray-500">
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
                    <td className="px-3 py-2 border-b">{h.category?.title || '-'}</td>
                    <td className="px-3 py-2 border-b">
                      <span className="px-2 py-1 text-xs border bg-gray-50 text-gray-700 border-gray-200">
                        {statusLabel[h.salesStatus] || h.salesStatus}
                      </span>
                    </td>
                    <td className="px-3 py-2 border-b">{h.sold ? "Oui" : "Non"}</td>
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="font-semibold">Détails de la maison #{selected.id}</h2>
            <div className="flex gap-2">
              <Button
                onClick={() => updateSoldStatus(!selected.sold)}
                disabled={!token}
                className="rounded-none bg-transparent text-custom-beige border-2 border-custom-beige hover:bg-custom-beige hover:text-white disabled:opacity-60"
              >
                Marquer {selected.sold ? "Non vendue" : "Vendue"}
              </Button>
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

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
            <label className="block text-sm font-semibold text-gray-900 mb-2">📸 Image Principale</label>
            <p className="text-xs text-gray-600 mb-3">
              L'image sera enregistrée dans /uploads/maison_{selected.code}/
            </p>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => uploadMainImage(e.target.files?.[0] || null)}
                disabled={uploading}
                className="flex-1"
                id="main-image-upload"
              />
              <Button
                onClick={() => document.getElementById('main-image-upload')?.click()}
                disabled={uploading}
                className="rounded-none bg-custom-beige hover:bg-custom-beige text-white disabled:opacity-60"
              >
                {uploading ? "Upload..." : "Choisir une image"}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">JPG, PNG, WEBP recommandés. Max 5MB.</p>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie *</label>
              <select
                value={editDraft.categoryId || ""}
                onChange={(e) => setEditDraft({ ...editDraft, categoryId: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300"
                required
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title} ({cat.type})
                  </option>
                ))}
              </select>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Localisation (RDC+ETAGE Bloc F)</label>
              <input
                value={editDraft.location || ""}
                onChange={(e) => setEditDraft({ ...editDraft, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300"
                placeholder="RDC+ETAGE Bloc F"
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Surface Dup Hors oeuvre RDC</label>
              <input
                value={editDraft.surfaceDupHorsOeuvreRDC || ""}
                onChange={(e) => setEditDraft({ ...editDraft, surfaceDupHorsOeuvreRDC: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300"
                placeholder="93 m²"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Surface Dup Hors oeuvre R+1</label>
              <input
                value={editDraft.surfaceDupHorsOeuvreR1 || ""}
                onChange={(e) => setEditDraft({ ...editDraft, surfaceDupHorsOeuvreR1: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300"
                placeholder="93 m²"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Surface Totale Dup</label>
              <input
                value={editDraft.surfaceTotalDup || ""}
                onChange={(e) => setEditDraft({ ...editDraft, surfaceTotalDup: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300"
                placeholder="186 m²"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Surface Parties communes</label>
              <input
                value={editDraft.surfacePartiesCommunes || ""}
                onChange={(e) => setEditDraft({ ...editDraft, surfacePartiesCommunes: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300"
                placeholder="35 m²"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Surface Vendable</label>
              <input
                value={editDraft.surfaceVendable || ""}
                onChange={(e) => setEditDraft({ ...editDraft, surfaceVendable: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300"
                placeholder="221 m²"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Surface Jardin privé</label>
              <input
                value={editDraft.surfaceJardinPrive || ""}
                onChange={(e) => setEditDraft({ ...editDraft, surfaceJardinPrive: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300"
                placeholder="118 m²"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Plan PDF</label>
              {editDraft.planPdf && (
                <div className="mb-2 p-2 bg-gray-50 border rounded flex items-center justify-between">
                  <a 
                    href={resolveImageUrl(editDraft.planPdf)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Voir le plan PDF
                  </a>
                  <button
                    onClick={() => setEditDraft({ ...editDraft, planPdf: "" })}
                    className="text-xs text-red-600 hover:text-red-800"
                    type="button"
                  >
                    Supprimer
                  </button>
                </div>
              )}
              <div className="flex gap-2">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => uploadPlanPdf(e.target.files?.[0] || null)}
                  disabled={uploading}
                  className="flex-1 text-sm"
                />
                {uploading && <span className="text-xs text-gray-500">Upload en cours...</span>}
              </div>
              <p className="text-xs text-gray-500 mt-1">PDF uniquement. Max 10MB. Enregistré dans /uploads/maison_{"{"}code{"}"}/</p>
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
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-500">Aucun bien associé.</div>
            )}
          </div>

          {/* Floor plans management */}


          {/* Slider Images for maison_{code} directory */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Slider Principal (dans /uploads/maison_{selected.code}/)</h3>
            <p className="text-sm text-gray-600 mb-3">
              Ces images seront affichées dans le slider principal de la page de détail. 
              Elles sont stockées dans le dossier /uploads/maison_{selected.code}/ et fonctionneront en production.
            </p>
            <div className="flex items-center gap-3 mb-4">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => uploadSliderImages(e.target.files)}
                disabled={uploading}
                className="flex-1"
              />
              {uploading && <span className="text-xs text-gray-500">Upload en cours...</span>}
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-800">
              💡 Les images uploadées ici seront automatiquement détectées et affichées sur la page publique de cette maison.
            </div>
          </div>
        </div>
      )}

      {addOpen && (
        <AddHousePanel onClose={() => setAddOpen(false)} onSubmit={addItem} categories={categories} />
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
  categories,
}: {
  onClose: () => void
  onSubmit: (form: Partial<House>) => void
  categories: Category[]
}) {
  const [form, setForm] = useState<Partial<House>>({
    code: "",
    name: "",
    description: "",
    salesStatus: "available",
    sold: false,
  })

  return (
    <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white border shadow-lg w-full max-w-2xl p-6 overflow-y-auto max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie *</label>
            <select
              value={form.categoryId || ""}
              onChange={(e) => setForm({ ...form, categoryId: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300"
              required
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title} ({cat.type})
                </option>
              ))}
            </select>
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
          <div className="flex items-center gap-2 mt-6">
            <input
              id="sold"
              type="checkbox"
              checked={!!form.sold}
              onChange={(e) => setForm({ ...form, sold: e.target.checked })}
            />
            <label htmlFor="sold" className="text-sm text-gray-700">Vendue</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Localisation</label>
            <input
              value={form.location || ""}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300"
              placeholder="RDC+ETAGE Bloc F"
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Surface Dup RDC</label>
            <input
              value={form.surfaceDupHorsOeuvreRDC || ""}
              onChange={(e) => setForm({ ...form, surfaceDupHorsOeuvreRDC: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300"
              placeholder="93 m²"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Surface Dup R+1</label>
            <input
              value={form.surfaceDupHorsOeuvreR1 || ""}
              onChange={(e) => setForm({ ...form, surfaceDupHorsOeuvreR1: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300"
              placeholder="93 m²"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Surface Totale</label>
            <input
              value={form.surfaceTotalDup || ""}
              onChange={(e) => setForm({ ...form, surfaceTotalDup: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300"
              placeholder="186 m²"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Parties communes</label>
            <input
              value={form.surfacePartiesCommunes || ""}
              onChange={(e) => setForm({ ...form, surfacePartiesCommunes: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300"
              placeholder="35 m²"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Surface Vendable</label>
            <input
              value={form.surfaceVendable || ""}
              onChange={(e) => setForm({ ...form, surfaceVendable: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300"
              placeholder="221 m²"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jardin privé</label>
            <input
              value={form.surfaceJardinPrive || ""}
              onChange={(e) => setForm({ ...form, surfaceJardinPrive: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300"
              placeholder="118 m²"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Plan PDF</label>
            <input
              value={form.planPdf || ""}
              onChange={(e) => setForm({ ...form, planPdf: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300"
              placeholder="/uploads/plans/FD01-plan.pdf"
            />
            <p className="text-xs text-gray-500 mt-1">
              💡 Pour uploader un fichier PDF, créez d'abord la maison puis modifiez-la pour ajouter le plan PDF.
            </p>
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
