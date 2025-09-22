"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getAdminToken, isTokenValid } from "@/lib/auth-client"

const API_BASE_URL =
  (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_API_BASE_URL) ||
  "http://localhost:3000"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<null | { type: "success" | "error"; message: string }>(null)

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message })
    setTimeout(() => setToast(null), 4000)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || `HTTP ${res.status}`)
      }
      const data = await res.json()
      const token = data.access_token as string
      if (!token) throw new Error("Jeton d'authentification manquant")

      // Store token for admin area
      localStorage.setItem("admin_access_token", token)
      showToast("success", "Connexion réussie, redirection...")
      // Small delay for toast visibility then redirect
      setTimeout(() => router.push("/admin/dashboard"), 500)
    } catch (err: any) {
      console.error("Login error", err)
      showToast("error", "Identifiants invalides ou erreur serveur")
    } finally {
      setLoading(false)
    }
  }

  // If already logged in and token valid, go straight to dashboard
  useEffect(() => {
    const token = getAdminToken()
    if (token && isTokenValid(token)) {
      router.replace("/admin/dashboard")
    }
  }, [router])

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md rounded-none shadow-lg">
        <CardContent className="p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Connexion administrateur</h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
              <input
                type="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-custom-beige focus:border-transparent"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full rounded-none bg-transparent text-custom-beige border-2 border-custom-beige hover:bg-custom-beige hover:text-white transition-colors duration-300 disabled:opacity-60"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>
        </CardContent>
      </Card>

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
