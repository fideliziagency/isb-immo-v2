import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export type PropertyType = {
  id: string
  code: string
  title: string
  subtitle: string
  description: string
  surface: string
  chambres: string
  salles_bain: string
  salle_eau: string
  salon: string
  niveaux: string
  jardin: string
  piscine: string
  cover_image: string
  gallery_images: { src: string; alt: string }[]
  specs: string[]
  equipements: string[]
  display_order: number
  is_active: boolean
  updated_at: string
}

export type Plan = {
  id: string
  property_type: string
  code: string
  label: string
  bloc: string | null
  etage: string | null
  surface: string | null
  image_url: string
  is_sold: boolean
  sold_at: string | null
  display_order: number
  updated_at: string
}

export type ContentSection = {
  id: string
  section_key: string
  title: string
  subtitle: string
  description: string
  images: { src: string; alt: string }[]
  data: Record<string, any>
  updated_at: string
}

export type Availability = {
  code: string
  title: string
  total_plans: number
  disponibles: number
  vendus: number
}
