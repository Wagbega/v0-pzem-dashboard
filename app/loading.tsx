import { Zap } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="text-center space-y-4">
        <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl glass-strong glow-primary animate-pulse">
          <Zap className="h-8 w-8 text-blue-400" />
        </div>
        <p className="text-slate-300 font-medium">Loading Energy Monitor...</p>
      </div>
    </div>
  )
}
