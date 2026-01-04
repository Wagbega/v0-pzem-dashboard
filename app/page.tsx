import { Suspense } from "react"
import Dashboard from "@/components/dashboard"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
        <Dashboard />
      </Suspense>
    </div>
  )
}
