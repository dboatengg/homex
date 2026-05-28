"use client"

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"

// SessionProvider is a client component — this wrapper lets you use it in a server layout
export function SessionProvider({ children }: { children: React.ReactNode }) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
}