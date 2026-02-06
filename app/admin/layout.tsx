"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { isTokenValid, getAdminToken, clearAdminToken } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [authorized, setAuthorized] = useState<boolean>(false)

  useEffect(() => {
    const token = getAdminToken()
    if (!token || !isTokenValid(token)) {
      clearAdminToken()
      setAuthorized(false)
      if (pathname !== "/admin/login") router.replace("/admin/login")
      return
    }
    setAuthorized(true)
  }, [pathname, router])

  const handleLogout = () => {
    clearAdminToken()
    router.replace("/admin/login")
  }

  // Allow the login page without token
  if (pathname === "/admin/login") return <>{children}</>

  if (!authorized) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-700">Vérification de l'accès...</div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <div className="w-full border-b bg-white">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="font-semibold">Espace Admin</div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="rounded-none border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
              onClick={handleLogout}
            >
              Se déconnecter
            </Button>
          </div>
        </div>
      </div>

      {/* Content area with attached left nav */}
      <div className="flex flex-1">
        <aside className="w-64 bg-white border-r shadow-sm">
          <nav className="p-4 space-y-2">
            <Link
              href="/admin/dashboard"
              className={`block px-3 py-2 text-sm font-medium rounded-none border ${
                pathname === "/admin/dashboard"
                  ? "bg-custom-beige text-white border-custom-beige"
                  : "bg-transparent text-gray-700 border-gray-200 hover:bg-gray-50"
              }`}
            >
              Tableau de bord
            </Link>
            <Link
              href="/admin/properties"
              className={`block px-3 py-2 text-sm font-medium rounded-none border ${
                pathname === "/admin/properties"
                  ? "bg-custom-beige text-white border-custom-beige"
                  : "bg-transparent text-gray-700 border-gray-200 hover:bg-gray-50"
              }`}
            >
              Annonces (Properties)
            </Link>
            <Link
              href="/admin/leads"
              className={`block px-3 py-2 text-sm font-medium rounded-none border ${
                pathname === "/admin/leads"
                  ? "bg-custom-beige text-white border-custom-beige"
                  : "bg-transparent text-gray-700 border-gray-200 hover:bg-gray-50"
              }`}
            >
              Leads
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
