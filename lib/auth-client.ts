// lib/auth-client.ts
// Utilities for handling admin token and JWT decoding on the client

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("admin_access_token")
}

export function clearAdminToken(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("admin_access_token")
}

export function parseJwt<T = any>(token: string): T {
  const base64Url = token.split(".")[1]
  if (!base64Url) throw new Error("Invalid JWT")
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  )
  return JSON.parse(jsonPayload)
}

export function isTokenValid(token: string): boolean {
  try {
    const payload = parseJwt<{ exp?: number }>(token)
    if (!payload || !payload.exp) return false
    return payload.exp * 1000 > Date.now()
  } catch {
    return false
  }
}
