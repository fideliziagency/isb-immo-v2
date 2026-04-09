"use client"

import { useEffect, useState, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { supabase, type Plan } from "@/lib/supabase"
import Image from "next/image"
import {
  Search, Plus, Upload, CheckSquare, Square,
  Filter, AlertCircle, CheckCircle2, RefreshCw,
  X, Eye, Loader2
} from "lucide-react"

const TYPES = [
  { code: "s1", label: "S+1", color: "bg-blue-500" },
  { code: "s2", label: "S+2", color: "bg-purple-500" },
  { code: "s3", label: "S+3", color: "bg-amber-500" },
  { code: "duplex", label: "Duplex", color: "bg-emerald-500" },
  { code: "villa", label: "Villa", color: "bg-rose-500" },
]

export default function AdminPlansPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [activeType, setActiveType] = useState(searchParams.get("type") || "s1")
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filterSold, setFilterSold] = useState<"all" | "sold" | "available">("all")
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null)
  const [uploading, setUploading] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [previewPlan, setPreviewPlan] = useState<Plan | null>(null)

  const loadPlans = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("plans")
      .select("*")
      .eq("property_type", activeType)
      .order("display_order")
    if (data) setPlans(data)
    setLoading(false)
  }, [activeType])

  useEffect(() => { loadPlans() }, [loadPlans])

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 3000)
  }

  const toggleSold = async (plan: Plan) => {
    const newSold = !plan.is_sold
    // Optimistic update
    setPlans(prev => prev.map(p => p.id === plan.id ? { ...p, is_sold: newSold, sold_at: newSold ? new Date().toISOString() : null } : p))

    const { data: { session } } = await supabase.auth.getSession()
    const { error } = await supabase.rpc("toggle_plan_sold", {
      p_plan_id: plan.id,
      p_is_sold: newSold,
      p_admin_email: session?.user?.email,
    })

    if (error) {
      // Rollback
      setPlans(prev => prev.map(p => p.id === plan.id ? { ...p, is_sold: plan.is_sold } : p))
      showToast("error", "Erreur lors de la mise à jour")
    } else {
      showToast("success", newSold ? `${plan.label} marqué comme vendu` : `${plan.label} remis en disponible`)
    }
  }

  const uploadPlanImage = async (planId: string, file: File) => {
    setUploading(planId)
    try {
      const ext = file.name.split(".").pop()
      const fileName = `${activeType}-${planId}-${Date.now()}.${ext}`
      const { error: uploadError, data } = await supabase.storage
        .from("plans")
        .upload(fileName, file, { upsert: true })

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage.from("plans").getPublicUrl(fileName)

      const { error: updateError } = await supabase
        .from("plans")
        .update({ image_url: publicUrl })
        .eq("id", planId)

      if (updateError) throw updateError

      setPlans(prev => prev.map(p => p.id === planId ? { ...p, image_url: publicUrl } : p))
      showToast("success", "Plan mis à jour avec succès")
    } catch (err) {
      showToast("error", "Erreur lors de l'upload")
    } finally {
      setUploading(null)
    }
  }

  const filtered = plans.filter(p => {
    const matchSearch = p.label.toLowerCase().includes(search.toLowerCase()) ||
      p.code.toLowerCase().includes(search.toLowerCase()) ||
      (p.bloc || "").toLowerCase().includes(search.toLowerCase())
    const matchFilter = filterSold === "all" || (filterSold === "sold" && p.is_sold) || (filterSold === "available" && !p.is_sold)
    return matchSearch && matchFilter
  })

  const soldCount = plans.filter(p => p.is_sold).length
  const availableCount = plans.filter(p => !p.is_sold).length

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium shadow-xl border transition-all
          ${toast.type === "success"
            ? "bg-emerald-900/90 border-emerald-700 text-emerald-300"
            : "bg-red-900/90 border-red-700 text-red-300"
          }`}>
          {toast.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-2xl font-semibold">Plans & Ventes</h1>
          <p className="text-gray-500 text-sm mt-1">Gérez le statut de vente de chaque appartement</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#b6b09f] hover:bg-[#a39a85] text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Ajouter un plan
        </button>
      </div>

      {/* Type tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {TYPES.map(type => (
          <button
            key={type.code}
            onClick={() => { setActiveType(type.code); setSearch(""); setFilterSold("all") }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all
              ${activeType === type.code
                ? "bg-gray-700 text-white border border-gray-600"
                : "bg-gray-900 text-gray-400 border border-gray-800 hover:border-gray-700 hover:text-white"
              }`}
          >
            <span className={`w-2 h-2 rounded-full ${type.color}`} />
            {type.label}
          </button>
        ))}
      </div>

      {/* Stats bar */}
      <div className="flex items-center gap-4 mb-5 p-3 bg-gray-900 border border-gray-800 rounded-xl">
        <div className="text-sm text-gray-400">
          Total : <span className="text-white font-medium">{plans.length}</span>
        </div>
        <div className="w-px h-4 bg-gray-700" />
        <div className="text-sm text-gray-400">
          Disponibles : <span className="text-emerald-400 font-medium">{availableCount}</span>
        </div>
        <div className="w-px h-4 bg-gray-700" />
        <div className="text-sm text-gray-400">
          Vendus : <span className="text-rose-400 font-medium">{soldCount}</span>
        </div>
        <div className="ml-auto">
          <button onClick={loadPlans} className="text-gray-600 hover:text-gray-400 transition-colors">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Filtres */}
      <div className="flex gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher par code, bloc..."
            className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-9 pr-4 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gray-600"
          />
        </div>
        <div className="flex items-center gap-1 bg-gray-900 border border-gray-800 rounded-lg p-1">
          {(["all", "available", "sold"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilterSold(f)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all
                ${filterSold === f ? "bg-gray-700 text-white" : "text-gray-500 hover:text-white"}`}
            >
              {f === "all" ? "Tous" : f === "available" ? "Disponibles" : "Vendus"}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de plans */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl aspect-[3/4] animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-600">
          <Filter className="w-8 h-8 mx-auto mb-3 opacity-50" />
          <p>Aucun plan trouvé</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {filtered.map(plan => (
            <div
              key={plan.id}
              className={`relative bg-gray-900 border rounded-xl overflow-hidden group transition-all
                ${plan.is_sold
                  ? "border-rose-500/40 bg-rose-950/20"
                  : "border-gray-800 hover:border-gray-700"
                }`}
            >
              {/* Image du plan */}
              <div className="relative aspect-square bg-gray-800 overflow-hidden">
                {plan.image_url ? (
                  <Image
                    src={plan.image_url}
                    alt={plan.label}
                    fill
                    className={`object-contain p-2 transition-all ${plan.is_sold ? "opacity-40 grayscale" : "group-hover:scale-105"}`}
                    sizes="200px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-700">
                    <FileImage className="w-8 h-8" />
                  </div>
                )}

                {/* Badge VENDU */}
                {plan.is_sold && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-rose-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg rotate-[-8deg] border-2 border-rose-400">
                      VENDU
                    </div>
                  </div>
                )}

                {/* Overlay actions au hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => setPreviewPlan(plan)}
                    className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center"
                    title="Aperçu"
                  >
                    <Eye className="w-4 h-4 text-white" />
                  </button>
                  <label className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center cursor-pointer" title="Remplacer l'image">
                    <Upload className="w-4 h-4 text-white" />
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                      onChange={e => e.target.files?.[0] && uploadPlanImage(plan.id, e.target.files[0])}
                    />
                  </label>
                </div>

                {/* Uploading spinner */}
                {uploading === plan.id && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  </div>
                )}
              </div>

              {/* Infos + toggle */}
              <div className="p-2">
                <p className="text-white text-xs font-medium truncate">{plan.code.toUpperCase()}</p>
                <p className="text-gray-500 text-xs truncate">{plan.bloc ? `Bloc ${plan.bloc}` : ""}{plan.etage ? ` · ${plan.etage}` : ""}</p>

                {/* Toggle vendu */}
                <button
                  onClick={() => toggleSold(plan)}
                  className={`mt-2 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all
                    ${plan.is_sold
                      ? "bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 border border-rose-500/30"
                      : "bg-gray-800 text-gray-400 hover:bg-emerald-500/20 hover:text-emerald-400 hover:border-emerald-500/30 border border-transparent"
                    }`}
                >
                  {plan.is_sold ? (
                    <><CheckSquare className="w-3 h-3" /> Vendu</>
                  ) : (
                    <><Square className="w-3 h-3" /> Disponible</>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal prévisualisation */}
      {previewPlan && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewPlan(null)}
        >
          <div className="relative max-w-2xl w-full bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <div>
                <p className="text-white font-medium">{previewPlan.label}</p>
                <p className="text-gray-500 text-xs mt-0.5">
                  {previewPlan.is_sold
                    ? `Vendu le ${new Date(previewPlan.sold_at!).toLocaleDateString("fr-FR")}`
                    : "Disponible"
                  }
                </p>
              </div>
              <button onClick={() => setPreviewPlan(null)} className="text-gray-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video bg-gray-800">
              {previewPlan.image_url && (
                <Image src={previewPlan.image_url} alt={previewPlan.label} fill className="object-contain p-4" />
              )}
              {previewPlan.is_sold && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-rose-600 text-white text-2xl font-bold px-8 py-4 rounded-full border-4 border-rose-400 rotate-[-8deg]">
                    VENDU
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 flex gap-3">
              <button
                onClick={() => { toggleSold(previewPlan); setPreviewPlan(null) }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${previewPlan.is_sold
                    ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30"
                    : "bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 border border-rose-500/30"
                  }`}
              >
                {previewPlan.is_sold ? "Marquer disponible" : "Marquer comme vendu"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal ajout plan */}
      {showAddModal && (
        <AddPlanModal
          activeType={activeType}
          onClose={() => setShowAddModal(false)}
          onSuccess={() => { setShowAddModal(false); loadPlans() }}
          showToast={showToast}
        />
      )}
    </div>
  )
}

// ─── Modal Ajout Plan ────────────────────────────────────────────────────────
function AddPlanModal({ activeType, onClose, onSuccess, showToast }: {
  activeType: string
  onClose: () => void
  onSuccess: () => void
  showToast: (type: "success" | "error", msg: string) => void
}) {
  const [code, setCode] = useState("")
  const [label, setLabel] = useState("")
  const [bloc, setBloc] = useState("")
  const [etage, setEtage] = useState("")
  const [surface, setSurface] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      let imageUrl = ""
      if (file) {
        const ext = file.name.split(".").pop()
        const fileName = `${activeType}-${code}-${Date.now()}.${ext}`
        const { error: uploadError } = await supabase.storage.from("plans").upload(fileName, file)
        if (uploadError) throw uploadError
        const { data: { publicUrl } } = supabase.storage.from("plans").getPublicUrl(fileName)
        imageUrl = publicUrl
      }

      const { error } = await supabase.from("plans").insert({
        property_type: activeType,
        code: code.toLowerCase().replace(/\./g, ""),
        label,
        bloc: bloc || null,
        etage: etage || null,
        surface: surface || null,
        image_url: imageUrl,
        display_order: 999,
      })

      if (error) throw error
      showToast("success", "Plan ajouté avec succès")
      onSuccess()
    } catch (err) {
      showToast("error", "Erreur lors de l'ajout du plan")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-gray-800">
          <h3 className="text-white font-medium">Ajouter un plan — {activeType.toUpperCase()}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Code *</label>
              <input value={code} onChange={e => setCode(e.target.value)} required placeholder="ex: c12" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#b6b09f]" />
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Bloc</label>
              <input value={bloc} onChange={e => setBloc(e.target.value)} placeholder="A, B, C..." className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#b6b09f]" />
            </div>
          </div>
          <div>
            <label className="text-gray-400 text-xs mb-1 block">Libellé *</label>
            <input value={label} onChange={e => setLabel(e.target.value)} required placeholder="Appartement C.12 - 1er étage Bloc C" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#b6b09f]" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Étage</label>
              <select value={etage} onChange={e => setEtage(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#b6b09f]">
                <option value="">—</option>
                <option>RDC</option>
                <option>1er</option>
                <option>2ème</option>
                <option>3ème</option>
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Surface</label>
              <input value={surface} onChange={e => setSurface(e.target.value)} placeholder="68 m²" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#b6b09f]" />
            </div>
          </div>
          <div>
            <label className="text-gray-400 text-xs mb-1 block">Image du plan (PNG/JPG)</label>
            <label className="flex items-center gap-3 w-full bg-gray-800 border border-dashed border-gray-700 rounded-lg px-4 py-3 cursor-pointer hover:border-gray-500 transition-colors">
              <Upload className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">{file ? file.name : "Choisir un fichier…"}</span>
              <input type="file" accept="image/*" className="hidden" onChange={e => setFile(e.target.files?.[0] || null)} />
            </label>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 bg-gray-800 text-gray-400 rounded-lg text-sm hover:bg-gray-700 transition-colors">Annuler</button>
            <button type="submit" disabled={loading} className="flex-1 py-2.5 bg-[#b6b09f] hover:bg-[#a39a85] disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Ajout…</> : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
