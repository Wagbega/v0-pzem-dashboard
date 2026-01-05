"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Gauge, Radio, Zap } from "lucide-react"

interface SystemMetricsProps {
  frequency: number
  powerFactor: number
  current: number
}

export function SystemMetrics({ frequency, powerFactor, current }: SystemMetricsProps) {
  const getFrequencyStatus = () => {
    if (frequency >= 49.5 && frequency <= 50.5) return { text: "Normal", color: "text-success" }
    return { text: "Unstable", color: "text-warning" }
  }

  const getPowerFactorStatus = () => {
    if (powerFactor >= 0.9) return { text: "Excellent", color: "text-success" }
    if (powerFactor >= 0.8) return { text: "Good", color: "text-chart-2" }
    return { text: "Poor", color: "text-warning" }
  }

  const getCurrentStatus = () => {
    if (current < 5) return { text: "Low", color: "text-muted-foreground" }
    if (current < 15) return { text: "Normal", color: "text-success" }
    return { text: "High", color: "text-warning" }
  }

  const freqStatus = getFrequencyStatus()
  const pfStatus = getPowerFactorStatus()
  const currentStatus = getCurrentStatus()

  return (
    <Card className="glass-strong glow-subtle hover:glow-secondary transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-foreground">System Metrics</CardTitle>
          <Gauge className="h-5 w-5 text-primary" />
        </div>
        <CardDescription>Grid frequency and power quality</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Radio className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Frequency</span>
          </div>
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-3xl font-bold text-foreground">{frequency.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground mt-1">Hz</p>
            </div>
            <span className={`text-sm font-medium ${freqStatus.color}`}>{freqStatus.text}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center gap-2 mb-2">
            <Gauge className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Power Factor</span>
          </div>
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-3xl font-bold text-foreground">{powerFactor.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground mt-1">PF</p>
            </div>
            <span className={`text-sm font-medium ${pfStatus.color}`}>{pfStatus.text}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Current</span>
          </div>
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-3xl font-bold text-foreground">{current.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground mt-1">A</p>
            </div>
            <span className={`text-sm font-medium ${currentStatus.color}`}>{currentStatus.text}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
