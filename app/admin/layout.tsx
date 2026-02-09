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
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

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
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            <div className="font-semibold">Espace Admin</div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="rounded-none border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent text-sm"
              onClick={handleLogout}
            >
              Se déconnecter
            </Button>
          </div>
        </div>
      </div>

      {/* Content area with attached left nav */}
      <div className="flex flex-1 relative">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-64 bg-white border-r shadow-sm">
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
              Catégories
            </Link>
            <Link
              href="/admin/houses"
              className={`block px-3 py-2 text-sm font-medium rounded-none border ${
                pathname === "/admin/houses"
                  ? "bg-custom-beige text-white border-custom-beige"
                  : "bg-transparent text-gray-700 border-gray-200 hover:bg-gray-50"
              }`}
            >
              Maisons
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

        {/* Mobile sidebar overlay */}
        {mobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/30 z-40"
            onClick={() => setMobileMenuOpen(false)}
          >
            <aside className="w-64 bg-white h-full shadow-lg" onClick={(e) => e.stopPropagation()}>
              <nav className="p-4 space-y-2">
                <Link
                  href="/admin/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
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
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 text-sm font-medium rounded-none border ${
                    pathname === "/admin/properties"
                      ? "bg-custom-beige text-white border-custom-beige"
                      : "bg-transparent text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  Catégories
                </Link>
                <Link
                  href="/admin/houses"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 text-sm font-medium rounded-none border ${
                    pathname === "/admin/houses"
                      ? "bg-custom-beige text-white border-custom-beige"
                      : "bg-transparent text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  Maisons
                </Link>
                <Link
                  href="/admin/leads"
                  onClick={() => setMobileMenuOpen(false)}
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
          </div>
        )}

        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
