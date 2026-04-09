"use client"

import { useEffect, useState } from "react"
import { supabase, type ContentSection } from "@/lib/supabase"
import Image from "next/image"
import {
  Save, Upload, Plus, Trash2, Loader2,
  CheckCircle2, AlertCircle, X, Globe, Settings2
} from "lucide-react"

type SiteSetting = { key: string; value: string }

export default function AdminContenuPage() {
  const [activeTab, setActiveTab] = useState<"sections" | "settings">("sections")
  const [sections, setSections] = useState<ContentSection[]>([])
  const [settings, setSettings] = useState<SiteSetting[]>([])
  const [selectedSection, setSelectedSection] = useState<ContentSection | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null)

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 3000)
  }

  useEffect(() => {
    const load = async () => {
      const [{ data: sec }, { data: set }] = await Promise.all([
        supabase.from("content_sections").select("*").order("section_key"),
        supabase.from("site_settings").select("*").order("key"),
      ])
      if (sec) { setSections(sec); setSelectedSection(sec[0]) }
      if (set) setSettings(set)
      setLoading(false)
    }
    load()
  }, [])

  const saveSection = async () => {
    if (!selectedSection) return
    setSaving(true)
    const { error } = await supabase
      .from("content_sections")
      .update({
        title: selectedSection.title,
        subtitle: selectedSection.subtitle,
        description: selectedSection.description,
        images: selectedSection.images,
        data: selectedSection.data,
      })
      .eq("id", selectedSection.id)
    if (error) showToast("error", "Erreur sauvegarde")
    else {
      setSections(prev => prev.map(s => s.id === selectedSection.id ? selectedSection : s))
      showToast("success", "Section mise à jour")
    }
    setSaving(false)
  }

  const saveSettings = async () => {
    setSaving(true)
    try {
      for (const s of settings) {
        await supabase.from("site_settings").upsert({ key: s.key, value: s.value })
      }
      showToast("success", "Paramètres sauvegardés")
    } catch {
      showToast("error", "Erreur sauvegarde")
    }
    setSaving(false)
  }

  const uploadSectionImage = async (file: File) => {
    if (!selectedSection) return
    const ext = file.name.split(".").pop()
    const fileName = `section-${selectedSection.section_key}-${Date.now()}.${ext}`
    const { error } = await supabase.storage.from("gallery").upload(fileName, file, { upsert: true })
    if (error) { showToast("error", "Erreur upload"); return }
    const { data: { publicUrl } } = supabase.storage.from("gallery").getPublicUrl(fileName)
    setSelectedSection(prev => prev ? {
      ...prev,
      images: [...(prev.images || []), { src: publicUrl, alt: file.name.replace(/\.[^.]+$/, "") }]
    } : null)
  }

  const removeImage = (idx: number) => {
    setSelectedSection(prev => prev ? {
      ...prev, images: prev.images.filter((_, i) => i !== idx)
    } : null)
  }

  const updateDataField = (key: string, value: string) => {
    setSelectedSection(prev => prev ? { ...prev, data: { ...prev.data, [key]: value } } : null)
  }

  const updateSetting = (key: string, value: string) => {
    setSettings(prev => prev.map(s => s.key === key ? { ...s, value } : s))
  }

  const SECTION_LABELS: Record<string, string> = {
    hero: "Hero (accueil)",
    projet: "Le Projet",
    contact: "Contact",
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="w-6 h-6 text-gray-600 animate-spin" />
    </div>
  )

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium shadow-xl border
          ${toast.type === "success" ? "bg-emerald-900/90 border-emerald-700 text-emerald-300" : "bg-red-900/90 border-red-700 text-red-300"}`}>
          {toast.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {toast.msg}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-2xl font-semibold">Contenu du site</h1>
          <p className="text-gray-500 text-sm mt-1">Modifiez les textes et images du frontoffice</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-gray-900 border border-gray-800 rounded-xl p-1 w-fit">
        {[
          { key: "sections", label: "Sections", icon: Globe },
          { key: "settings", label: "Paramètres", icon: Settings2 },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${activeTab === tab.key ? "bg-gray-700 text-white" : "text-gray-500 hover:text-white"}`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "sections" && (
        <div className="flex gap-6">
          {/* Liste sections */}
          <div className="w-44 flex-shrink-0 space-y-1">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedSection(s)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all
                  ${selectedSection?.id === s.id
                    ? "bg-[#b6b09f]/15 text-[#b6b09f] border border-[#b6b09f]/20"
                    : "text-gray-400 hover:text-white hover:bg-gray-800 border border-transparent"
                  }`}
              >
                {SECTION_LABELS[s.section_key] || s.section_key}
              </button>
            ))}
          </div>

          {/* Éditeur section */}
          {selectedSection && (
            <div className="flex-1 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <div>
                  <h3 className="text-white font-medium text-sm">
                    {SECTION_LABELS[selectedSection.section_key] || selectedSection.section_key}
                  </h3>
                  <p className="text-gray-500 text-xs mt-0.5">clé : {selectedSection.section_key}</p>
                </div>
                <button
                  onClick={saveSection}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-[#b6b09f] hover:bg-[#a39a85] disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Sauvegarder
                </button>
              </div>

              <div className="p-5 space-y-5">
                {/* Titre / Subtitle / Description */}
                <div className="space-y-3">
                  <div>
                    <label className="text-gray-500 text-xs mb-1 block">Titre</label>
                    <input value={selectedSection.title || ""} onChange={e => setSelectedSection({ ...selectedSection, title: e.target.value })}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#b6b09f]" />
                  </div>
                  <div>
                    <label className="text-gray-500 text-xs mb-1 block">Sous-titre / Badge</label>
                    <input value={selectedSection.subtitle || ""} onChange={e => setSelectedSection({ ...selectedSection, subtitle: e.target.value })}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#b6b09f]" />
                  </div>
                  <div>
                    <label className="text-gray-500 text-xs mb-1 block">Description / Texte principal</label>
                    <textarea value={selectedSection.description || ""} onChange={e => setSelectedSection({ ...selectedSection, description: e.target.value })}
                      rows={4} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#b6b09f] resize-none" />
                  </div>
                </div>

                {/* Champs data dynamiques */}
                {selectedSection.data && Object.keys(selectedSection.data).length > 0 && (
                  <div>
                    <p className="text-gray-500 text-xs font-medium mb-2 uppercase tracking-wider">Données supplémentaires</p>
                    <div className="space-y-2">
                      {Object.entries(selectedSection.data).map(([key, val]) => (
                        <div key={key}>
                          <label className="text-gray-600 text-xs mb-1 block">{key}</label>
                          <input
                            value={String(val)}
                            onChange={e => updateDataField(key, e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#b6b09f]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Images */}
                <div>
                  <p className="text-gray-500 text-xs font-medium mb-2 uppercase tracking-wider">Images ({selectedSection.images?.length || 0})</p>
                  <div className="grid grid-cols-4 gap-2 mb-2">
                    {(selectedSection.images || []).map((img, idx) => (
                      <div key={idx} className="relative group">
                        <div className="relative h-16 bg-gray-800 rounded-lg overflow-hidden">
                          <Image src={img.src} alt={img.alt} fill className="object-cover" />
                          <button onClick={() => removeImage(idx)}
                            className="absolute top-1 right-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <X className="w-2.5 h-2.5 text-white" />
                          </button>
                        </div>
                        <p className="text-gray-600 text-xs mt-0.5 truncate">{img.alt || `Image ${idx + 1}`}</p>
                      </div>
                    ))}
                    <label className="h-16 bg-gray-800 border-2 border-dashed border-gray-700 rounded-lg flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-gray-600 transition-colors">
                      <Plus className="w-4 h-4 text-gray-600" />
                      <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && uploadSectionImage(e.target.files[0])} />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "settings" && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <h3 className="text-white font-medium text-sm">Paramètres globaux du site</h3>
            <button
              onClick={saveSettings}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-[#b6b09f] hover:bg-[#a39a85] disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Sauvegarder
            </button>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {settings.map(s => (
              <div key={s.key}>
                <label className="text-gray-500 text-xs mb-1 block">{s.key}</label>
                <input
                  value={s.value || ""}
                  onChange={e => updateSetting(s.key, e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#b6b09f]"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
