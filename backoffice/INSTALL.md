# ============================================
# GUIDE D'INSTALLATION DU BACKOFFICE ISB IMMO
# ============================================

## 1. VARIABLES D'ENVIRONNEMENT

Ajouter dans `.env.local` (développement) et dans Vercel (production) :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://hjbyxvycbeitssgwgyby.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<votre_anon_key_depuis_supabase_dashboard>
SUPABASE_SERVICE_ROLE_KEY=<votre_service_role_key_depuis_supabase_dashboard>

# Déjà présent
NEXT_PUBLIC_API_BASE_URL=https://isb-immo-backend-latest.onrender.com
```

> Récupérer les clés sur : https://supabase.com/dashboard/project/hjbyxvycbeitssgwgyby/settings/api

## 2. DÉPENDANCES À INSTALLER

```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

## 3. STRUCTURE DES FICHIERS À CRÉER

```
app/
  admin/
    layout.tsx          ← copier admin-layout.tsx
    page.tsx            ← copier admin-dashboard.tsx
    login/
      page.tsx          ← copier admin-login.tsx
    logements/
      page.tsx          ← copier admin-logements.tsx
    plans/
      page.tsx          ← copier admin-plans.tsx
    contenu/
      page.tsx          ← copier admin-contenu.tsx
lib/
  supabase.ts           ← copier lib/supabase.ts
```

## 4. CRÉER LE PREMIER COMPTE ADMIN

1. Aller sur https://supabase.com/dashboard/project/hjbyxvycbeitssgwgyby/auth/users
2. Cliquer "Add user" → "Create new user"
3. Renseigner : email = isbimmobiliere@gmail.com, mot de passe de votre choix
4. L'utilisateur est déjà dans la table admin_users (inséré lors du seed)

## 5. ACCÈS AU BACKOFFICE

URL en production : https://www.isbimmobiliere.com/admin

## 6. SCHÉMA SUPABASE — RÉSUMÉ

| Table              | Rôle                                      |
|--------------------|-------------------------------------------|
| property_types     | 5 types de biens (s1→villa)               |
| plans              | 96 appartements individuels               |
| content_sections   | Textes/images homepage                    |
| site_settings      | Paramètres globaux (tel, email, etc.)     |
| admin_users        | Utilisateurs backoffice                   |
| audit_log          | Traçabilité de toutes les actions         |

## 7. SÉCURITÉ EN PLACE

✅ Row Level Security (RLS) sur toutes les tables
✅ Lecture publique pour property_types, plans, content_sections
✅ Écriture réservée aux admins authentifiés et dans admin_users
✅ Storage sécurisé (upload admin uniquement)
✅ Audit log de toutes les actions (marquer vendu, modifier contenu)
✅ Fonction toggle_plan_sold avec SECURITY DEFINER + search_path fixe
✅ Vue property_availability avec SECURITY INVOKER
✅ 0 alerte dans Supabase Security Advisor

## 8. PROCHAINE ÉTAPE — FRONTOFFICE

Pour que le frontoffice lise les données Supabase :

### units-slider.tsx
Remplacer le fetch NestJS par :
```ts
const { data } = await supabase.from("property_types").select("*").eq("is_active", true).order("display_order")
```

### pages logements/[code]
Lire les plans depuis Supabase et afficher le badge VENDU :
```ts
const { data: plans } = await supabase.from("plans").select("*").eq("property_type", code).order("display_order")
// Pour chaque plan : if (plan.is_sold) → overlay rouge "VENDU"
// Compteur dispo = plans.filter(p => !p.is_sold).length
```
