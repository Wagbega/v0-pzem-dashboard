"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, DollarSign, RotateCcw } from "lucide-react"

interface EnergyStatsProps {
  energy: number
  power: number
}

export function EnergyStats({ energy, power }: EnergyStatsProps) {
  const [baselineEnergy, setBaselineEnergy] = useState(0)

  // Calculate energy since reset
  const energySinceReset = energy - baselineEnergy

  // Calculate estimated daily usage based on current power
  const estimatedDailyUsage = (power * 24) / 1000

  const costPerKwh = 230.0
  const totalCost = energySinceReset * costPerKwh
  const estimatedDailyCost = estimatedDailyUsage * costPerKwh
  const estimatedMonthlyCost = estimatedDailyCost * 30

  console.log("[v0] Energy:", energy, "kWh")
  console.log("[v0] Baseline:", baselineEnergy, "kWh")
  console.log("[v0] Energy since reset:", energySinceReset, "kWh")
  console.log("[v0] Cost per kWh: N", costPerKwh)
  console.log("[v0] Total cost: N", totalCost)
  console.log("[v0] Current power:", power, "W")
  console.log("[v0] Estimated daily usage:", estimatedDailyUsage, "kWh")
  console.log("[v0] Estimated daily cost: N", estimatedDailyCost)
  console.log("[v0] Estimated monthly cost: N", estimatedMonthlyCost)

  const handleReset = () => {
    setBaselineEnergy(energy)
  }

  return (
    <Card className="glass-strong glow-subtle hover:glow-primary transition-all duration-300 border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-foreground">Energy Statistics</CardTitle>
          <TrendingUp className="h-5 w-5 text-chart-3" />
        </div>
        <CardDescription>Consumption and cost estimates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Total Energy</p>
            <p className="text-2xl font-bold text-foreground">{energy.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">kWh</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Avg Power</p>
            <p className="text-2xl font-bold text-foreground">{power.toFixed(0)}</p>
            <p className="text-xs text-muted-foreground">Watts</p>
          </div>
        </div>

        <div className="pt-4 border-t border-border space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Cost Tracking</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleReset} className="h-7 px-2 gap-1 bg-transparent">
              <RotateCcw className="h-3 w-3" />
              Reset
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Current Cost</span>
              <span className="text-lg font-bold text-foreground">₦{totalCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-border/50">
              <span className="text-xs text-muted-foreground">Est. Daily</span>
              <span className="text-sm font-semibold text-muted-foreground">₦{estimatedDailyCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Est. Monthly</span>
              <span className="text-sm font-semibold text-muted-foreground">₦{estimatedMonthlyCost.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
