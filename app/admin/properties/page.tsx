"use client"

import { useEffect, useMemo, useState } from "react"
import { getAdminToken, isTokenValid } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"

const API_BASE_URL =
  (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_API_BASE_URL) ||
  "https://isb-immo-backend-latest.onrender.com"

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
  description: string
  image?: string
  surface?: string
  chambres?: string
  sallesBain?: string
  surfaceExterieure?: string
  disponibles?: string
  href?: string
  details?: Record<string, string>
  sold: boolean
  status: "published" | "pending"
  createdAt: string
  updatedAt: string
}

export default function AdminPropertiesPage() {
  const [token, setToken] = useState<string | null>(null)
  const [items, setItems] = useState<Property[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<Property | null>(null)
  const [toast, setToast] = useState<null | { type: "success" | "error"; message: string }>(null)
  const [addOpen, setAddOpen] = useState(false)
  const [editDraft, setEditDraft] = useState<Partial<Property> | null>(null)

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
      const res = await fetch(`${API_BASE_URL}/properties`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setItems(data)
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
    return items.filter((p) =>
      [p.code, p.title, p.type].some((v) => (v || "").toLowerCase().includes(q))
    )
  }, [items, search])

  const selectItem = async (id: number) => {
    try {
      setLoading(true)
      const res = await fetch(`${API_BASE_URL}/properties/${id}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = (await res.json()) as Property
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
      const res = await fetch(`${API_BASE_URL}/properties/${selected.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      showToast("success", "Annonce mise à jour")
      await fetchList()
      await selectItem(selected.id)
    } catch (e: any) {
      showToast("error", e.message || "Échec de la mise à jour")
    }
  }

  const updateState = async (state: { sold?: boolean; status?: "published" | "pending" }) => {
    if (!selected || !token) return
    try {
      const res = await fetch(`${API_BASE_URL}/properties/${selected.id}/state`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(state),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      showToast("success", "État mis à jour")
      await fetchList()
      await selectItem(selected.id)
    } catch (e: any) {
      showToast("error", e.message || "Échec de la mise à jour de l'état")
    }
  }

  const removeItem = async () => {
    if (!selected || !token) return
    if (!confirm("Supprimer cette annonce ?")) return
    try {
      const res = await fetch(`${API_BASE_URL}/properties/${selected.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      showToast("success", "Annonce supprimée")
      setSelected(null)
      await fetchList()
    } catch (e: any) {
      showToast("error", e.message || "Échec de la suppression")
    }
  }

  const addItem = async (form: Partial<Property>) => {
    if (!token) return showToast("error", "Connectez-vous")
    try {
      const res = await fetch(`${API_BASE_URL}/properties`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      showToast("success", "Annonce créée")
      setAddOpen(false)
      await fetchList()
    } catch (e: any) {
      showToast("error", e.message || "Échec de la création")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Annonces (Properties)</h1>
          <p className="text-sm text-gray-600">Gérer vos annonces: recherche, édition, statut et suppression.</p>
        </div>
        <Button
          onClick={() => setAddOpen(true)}
          className="rounded-none bg-transparent text-custom-beige border-2 border-custom-beige hover:bg-custom-beige hover:text-white"
        >
          Ajouter une annonce
        </Button>
      </div>

      <div className="bg-white border p-4 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <input
            type="text"
            placeholder="Rechercher par code, titre ou type..."
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
                <th className="text-left px-3 py-2 border-b">Type</th>
                <th className="text-left px-3 py-2 border-b">Titre</th>
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
                    Aucune annonce
                  </td>
                </tr>
              )}
              {!loading &&
                filtered.map((p) => (
                  <tr
                    key={p.id}
                    className={`hover:bg-gray-50 cursor-pointer ${selected?.id === p.id ? "bg-custom-beige/10" : ""}`}
                    onClick={() => selectItem(p.id)}
                  >
                    <td className="px-3 py-2 border-b">{p.id}</td>
                    <td className="px-3 py-2 border-b font-medium">{p.code}</td>
                    <td className="px-3 py-2 border-b">{p.type}</td>
                    <td className="px-3 py-2 border-b">{p.title}</td>
                    <td className="px-3 py-2 border-b">
                      <span
                        className={`px-2 py-1 text-xs border ${
                          p.status === "published"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-yellow-50 text-yellow-700 border-yellow-200"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-3 py-2 border-b">{p.sold ? "Oui" : "Non"}</td>
                    <td className="px-3 py-2 border-b">{new Date(p.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
      </div>

      {/* Details + actions */}
      {selected && editDraft && (
        <div className="bg-white border p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Détails de l'annonce #{selected.id}</h2>
            <div className="flex gap-2">
              <Button
                onClick={() => updateState({ sold: !selected.sold })}
                disabled={!token}
                className="rounded-none bg-transparent text-custom-beige border-2 border-custom-beige hover:bg-custom-beige hover:text-white disabled:opacity-60"
              >
                Marquer {selected.sold ? "Non vendu" : "Vendu"}
              </Button>
              <select
                value={selected.status}
                onChange={(e) => updateState({ status: e.target.value as any })}
                disabled={!token}
                className="px-3 py-2 border border-gray-300"
              >
                <option value="pending">pending</option>
                <option value="published">published</option>
              </select>
              <Button
                onClick={removeItem}
                disabled={!token}
                className="rounded-none bg-transparent text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-white disabled:opacity-60"
              >
                Supprimer
              </Button>
            </div>
          </div>
          {/* Preview */}
          {selected.image && (
            <div className="mb-4">
              <p className="text-sm text-gray-700 mb-2">Aperçu de l'image</p>
              <div className="border bg-gray-50 p-2 max-w-md">
                <img
                  src={resolveImageUrl(selected.image)}
                  alt={selected.title || "Image de l'annonce"}
                  className="max-h-64 w-auto object-contain"
                />
              </div>
            </div>
          )}

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
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <input
                value={editDraft.type || ""}
                onChange={(e) => setEditDraft({ ...editDraft, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
              <input
                value={editDraft.title || ""}
                onChange={(e) => setEditDraft({ ...editDraft, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                rows={5}
                value={editDraft.description || ""}
                onChange={(e) => setEditDraft({ ...editDraft, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
              <input
                value={editDraft.image || ""}
                onChange={(e) => setEditDraft({ ...editDraft, image: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300"
              />
              {editDraft.image && (
                <div className="mt-2 border bg-gray-50 p-2">
                  <img
                    src={resolveImageUrl(editDraft.image)}
                    alt="Prévisualisation"
                    className="max-h-48 w-auto object-contain"
                  />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Surface</label>
              <input
                value={editDraft.surface || ""}
                onChange={(e) => setEditDraft({ ...editDraft, surface: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Chambres</label>
              <input
                value={editDraft.chambres || ""}
                onChange={(e) => setEditDraft({ ...editDraft, chambres: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salles de bain</label>
              <input
                value={editDraft.sallesBain || ""}
                onChange={(e) => setEditDraft({ ...editDraft, sallesBain: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Surface extérieure</label>
              <input
                value={editDraft.surfaceExterieure || ""}
                onChange={(e) => setEditDraft({ ...editDraft, surfaceExterieure: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Disponibles</label>
              <input
                value={editDraft.disponibles || ""}
                onChange={(e) => setEditDraft({ ...editDraft, disponibles: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Lien (href)</label>
              <input
                value={editDraft.href || ""}
                onChange={(e) => setEditDraft({ ...editDraft, href: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300"
              />
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
        </div>
      )}

      {/* Add modal (simple inline panel) */}
      {addOpen && (
        <AddPropertyPanel
          onClose={() => setAddOpen(false)}
          onSubmit={addItem}
        />
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

function AddPropertyPanel({
  onClose,
  onSubmit,
}: {
  onClose: () => void
  onSubmit: (form: Partial<Property>) => void
}) {
  const [form, setForm] = useState<Partial<Property>>({
    code: "",
    type: "",
    title: "",
    description: "",
    status: "pending",
    sold: false,
  })

  return (
    <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white border shadow-lg w-full max-w-2xl p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Ajouter une annonce</h3>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <input
              value={form.type || ""}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
            <input
              value={form.title || ""}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows={5}
              value={form.description || ""}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300"
            >
              <option value="pending">pending</option>
              <option value="published">published</option>
            </select>
          </div>
          <div className="flex items-center gap-2 mt-6">
            <input
              id="sold"
              type="checkbox"
              checked={!!form.sold}
              onChange={(e) => setForm({ ...form, sold: e.target.checked })}
            />
            <label htmlFor="sold" className="text-sm text-gray-700">Vendu</label>
          </div>
          <div className="md:col-span-2 grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
              <input
                value={form.image || ""}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300"
              />
              {form.image && (
                <div className="mt-2 border bg-gray-50 p-2">
                  <img
                    src={resolveImageUrl(form.image)}
                    alt="Prévisualisation"
                    className="max-h-48 w-auto object-contain"
                  />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Surface</label>
              <input
                value={form.surface || ""}
                onChange={(e) => setForm({ ...form, surface: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Chambres</label>
              <input
                value={form.chambres || ""}
                onChange={(e) => setForm({ ...form, chambres: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salles de bain</label>
              <input
                value={form.sallesBain || ""}
                onChange={(e) => setForm({ ...form, sallesBain: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Surface extérieure</label>
              <input
                value={form.surfaceExterieure || ""}
                onChange={(e) => setForm({ ...form, surfaceExterieure: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Disponibles</label>
              <input
                value={form.disponibles || ""}
                onChange={(e) => setForm({ ...form, disponibles: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Lien (href)</label>
              <input
                value={form.href || ""}
                onChange={(e) => setForm({ ...form, href: e.target.value })}
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
    </div>
  )
}
