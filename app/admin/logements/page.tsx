"use client"

import { useEffect, useState } from "react"
import { supabase, type PropertyType } from "@/lib/supabase"
import Image from "next/image"
import {
  Save, Upload, Plus, Trash2, Eye, EyeOff,
  Loader2, CheckCircle2, AlertCircle, X, GripVertical
} from "lucide-react"

const TYPES = ["s1", "s2", "s3", "duplex", "villa"]

export default function AdminLogementsPage() {
  const [types, setTypes] = useState<PropertyType[]>([])
  const [selected, setSelected] = useState<PropertyType | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null)

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 3000)
  }

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("property_types")
        .select("*")
        .order("display_order")
      if (data) { setTypes(data); setSelected(data[0]) }
      setLoading(false)
    }
    load()
  }, [])

  const handleSave = async () => {
    if (!selected) return
    setSaving(true)
    const { error } = await supabase
      .from("property_types")
      .update({
        title: selected.title,
        subtitle: selected.subtitle,
        description: selected.description,
        surface: selected.surface,
        chambres: selected.chambres,
        salles_bain: selected.salles_bain,
        salle_eau: selected.salle_eau,
        salon: selected.salon,
        niveaux: selected.niveaux,
        jardin: selected.jardin,
        piscine: selected.piscine,
        cover_image: selected.cover_image,
        gallery_images: selected.gallery_images,
        specs: selected.specs,
        equipements: selected.equipements,
      })
      .eq("id", selected.id)

    if (error) showToast("error", "Erreur lors de la sauvegarde")
    else {
      setTypes(prev => prev.map(t => t.id === selected.id ? selected : t))
      showToast("success", "Modifications enregistrées")
    }
    setSaving(false)
  }

  const uploadCover = async (file: File) => {
    if (!selected) return
    const ext = file.name.split(".").pop()
    const fileName = `cover-${selected.code}-${Date.now()}.${ext}`
    const { error } = await supabase.storage.from("covers").upload(fileName, file, { upsert: true })
    if (error) { showToast("error", "Erreur upload"); return }
    const { data: { publicUrl } } = supabase.storage.from("covers").getPublicUrl(fileName)
    setSelected(prev => prev ? { ...prev, cover_image: publicUrl } : null)
  }

  const uploadGalleryImage = async (file: File) => {
    if (!selected) return
    const ext = file.name.split(".").pop()
    const fileName = `gallery-${selected.code}-${Date.now()}.${ext}`
    const { error } = await supabase.storage.from("gallery").upload(fileName, file, { upsert: true })
    if (error) { showToast("error", "Erreur upload"); return }
    const { data: { publicUrl } } = supabase.storage.from("gallery").getPublicUrl(fileName)
    setSelected(prev => prev ? {
      ...prev,
      gallery_images: [...(prev.gallery_images || []), { src: publicUrl, alt: file.name.replace(/\.[^.]+$/, "") }]
    } : null)
  }

  const removeGalleryImage = (idx: number) => {
    setSelected(prev => prev ? {
      ...prev,
      gallery_images: prev.gallery_images.filter((_, i) => i !== idx)
    } : null)
  }

  const updateGalleryAlt = (idx: number, alt: string) => {
    setSelected(prev => {
      if (!prev) return null
      const imgs = [...prev.gallery_images]
      imgs[idx] = { ...imgs[idx], alt }
      return { ...prev, gallery_images: imgs }
    })
  }

  const updateList = (field: "specs" | "equipements", idx: number, value: string) => {
    setSelected(prev => {
      if (!prev) return null
      const arr = [...prev[field]]
      arr[idx] = value
      return { ...prev, [field]: arr }
    })
  }

  const addListItem = (field: "specs" | "equipements") => {
    setSelected(prev => prev ? { ...prev, [field]: [...prev[field], ""] } : null)
  }

  const removeListItem = (field: "specs" | "equipements", idx: number) => {
    setSelected(prev => prev ? { ...prev, [field]: prev[field].filter((_: string, i: number) => i !== idx) } : null)
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="w-6 h-6 text-gray-600 animate-spin" />
    </div>
  )

  return (
    <div className="flex h-full min-h-screen">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium shadow-xl border
          ${toast.type === "success" ? "bg-emerald-900/90 border-emerald-700 text-emerald-300" : "bg-red-900/90 border-red-700 text-red-300"}`}>
          {toast.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {toast.msg}
        </div>
      )}

      {/* Sidebar types */}
      <div className="w-48 bg-gray-900 border-r border-gray-800 flex-shrink-0">
        <div className="p-4 border-b border-gray-800">
          <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Types de biens</p>
        </div>
        <nav className="p-2 space-y-1">
          {types.map(type => (
            <button
              key={type.id}
              onClick={() => setSelected(type)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all
                ${selected?.id === type.id
                  ? "bg-[#b6b09f]/15 text-[#b6b09f] border border-[#b6b09f]/20"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
            >
              <div className="font-medium uppercase text-xs">{type.code}</div>
              <div className="text-xs text-gray-600 truncate">{type.title}</div>
            </button>
          ))}
        </nav>
      </div>

      {/* Éditeur */}
      {selected && (
        <div className="flex-1 overflow-auto">
          <div className="max-w-3xl mx-auto p-6 lg:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono text-[#b6b09f] bg-[#b6b09f]/10 px-2 py-0.5 rounded uppercase">{selected.code}</span>
                <h1 className="text-white text-xl font-semibold mt-1">{selected.title}</h1>
              </div>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#b6b09f] hover:bg-[#a39a85] disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? "Sauvegarde…" : "Sauvegarder"}
              </button>
            </div>

            {/* Image cover */}
            <Section title="Image principale">
              <div className="relative group">
                <div className="relative h-48 bg-gray-800 rounded-xl overflow-hidden">
                  {selected.cover_image && (
                    <Image src={selected.cover_image} alt="Cover" fill className="object-cover" />
                  )}
                  <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <div className="flex flex-col items-center gap-2 text-white">
                      <Upload className="w-6 h-6" />
                      <span className="text-sm">Remplacer l'image</span>
                    </div>
                    <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && uploadCover(e.target.files[0])} />
                  </label>
                </div>
              </div>
            </Section>

            {/* Infos textuelles */}
            <Section title="Informations générales">
              <div className="space-y-4">
                <Field label="Titre">
                  <input value={selected.title} onChange={e => setSelected({ ...selected, title: e.target.value })}
                    className="input-admin" />
                </Field>
                <Field label="Sous-titre">
                  <input value={selected.subtitle || ""} onChange={e => setSelected({ ...selected, subtitle: e.target.value })}
                    className="input-admin" />
                </Field>
                <Field label="Description">
                  <textarea value={selected.description || ""} onChange={e => setSelected({ ...selected, description: e.target.value })}
                    rows={3} className="input-admin resize-none" />
                </Field>
              </div>
            </Section>

            {/* Caractéristiques */}
            <Section title="Caractéristiques">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Surface", key: "surface" },
                  { label: "Chambres", key: "chambres" },
                  { label: "Salle de bain", key: "salles_bain" },
                  { label: "Salle d'eau", key: "salle_eau" },
                  { label: "Salon", key: "salon" },
                  { label: "Niveaux", key: "niveaux" },
                  { label: "Jardin", key: "jardin" },
                  { label: "Piscine", key: "piscine" },
                ].map(({ label, key }) => (
                  <Field key={key} label={label}>
                    <input
                      value={(selected as any)[key] || ""}
                      onChange={e => setSelected({ ...selected, [key]: e.target.value } as PropertyType)}
                      className="input-admin"
                      placeholder="—"
                    />
                  </Field>
                ))}
              </div>
            </Section>

            {/* Galerie */}
            <Section title="Photos galerie">
              <div className="grid grid-cols-3 gap-3 mb-3">
                {(selected.gallery_images || []).map((img, idx) => (
                  <div key={idx} className="relative group">
                    <div className="relative h-24 bg-gray-800 rounded-lg overflow-hidden">
                      <Image src={img.src} alt={img.alt} fill className="object-cover" />
                      <button
                        onClick={() => removeGalleryImage(idx)}
                        className="absolute top-1 right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3 text-white" />
                      </button>
                    </div>
                    <input
                      value={img.alt}
                      onChange={e => updateGalleryAlt(idx, e.target.value)}
                      placeholder="Description alt..."
                      className="w-full mt-1 bg-gray-800 border border-gray-700 rounded px-2 py-1 text-gray-400 text-xs focus:outline-none focus:border-gray-600"
                    />
                  </div>
                ))}
                <label className="h-24 bg-gray-800 border-2 border-dashed border-gray-700 rounded-lg flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-gray-600 transition-colors">
                  <Plus className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 text-xs">Ajouter</span>
                  <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && uploadGalleryImage(e.target.files[0])} />
                </label>
              </div>
            </Section>

            {/* Specs techniques */}
            <Section title="Caractéristiques techniques">
              <EditableList
                items={selected.specs || []}
                onChange={(idx, val) => updateList("specs", idx, val)}
                onAdd={() => addListItem("specs")}
                onRemove={(idx) => removeListItem("specs", idx)}
                placeholder="ex: Pré-câblage internet fibre"
              />
            </Section>

            {/* Équipements inclus */}
            <Section title="Équipements inclus">
              <EditableList
                items={selected.equipements || []}
                onChange={(idx, val) => updateList("equipements", idx, val)}
                onAdd={() => addListItem("equipements")}
                onRemove={(idx) => removeListItem("equipements", idx)}
                placeholder="ex: Cuisine équipée avec îlot central"
              />
            </Section>
          </div>
        </div>
      )}

      <style jsx>{`
        :global(.input-admin) {
          width: 100%;
          background: rgb(31 41 55);
          border: 1px solid rgb(55 65 81);
          border-radius: 0.5rem;
          padding: 0.5rem 0.75rem;
          color: white;
          font-size: 0.875rem;
        }
        :global(.input-admin:focus) {
          outline: none;
          border-color: #b6b09f;
        }
      `}</style>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h3 className="text-white text-sm font-medium mb-4 pb-2 border-b border-gray-800">{title}</h3>
      {children}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-gray-500 text-xs mb-1">{label}</label>
      {children}
    </div>
  )
}

function EditableList({ items, onChange, onAdd, onRemove, placeholder }: {
  items: string[]
  onChange: (idx: number, val: string) => void
  onAdd: () => void
  onRemove: (idx: number) => void
  placeholder: string
}) {
  return (
    <div className="space-y-2">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <input
            value={item}
            onChange={e => onChange(idx, e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#b6b09f]"
          />
          <button onClick={() => onRemove(idx)} className="text-gray-600 hover:text-red-400 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button onClick={onAdd} className="flex items-center gap-2 text-gray-500 hover:text-[#b6b09f] text-sm transition-colors pt-1">
        <Plus className="w-4 h-4" />
        Ajouter un élément
      </button>
    </div>
  )
}
