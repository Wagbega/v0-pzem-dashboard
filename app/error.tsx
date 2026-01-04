"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("[v0] Error boundary caught:", error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="glass-strong rounded-2xl border border-white/10 p-8 text-center">
        <h2 className="mb-4 text-2xl font-bold text-white">Something went wrong!</h2>
        <p className="mb-6 text-slate-300">{error.message || "An unexpected error occurred"}</p>
        <Button onClick={reset} className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30">
          Try again
        </Button>
      </div>
    </div>
  )
}
