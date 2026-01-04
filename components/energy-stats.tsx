"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, DollarSign } from "lucide-react"

interface EnergyStatsProps {
  energy: number
  power: number
}

export function EnergyStats({ energy, power }: EnergyStatsProps) {
  // Calculate estimated daily usage based on current power
  const estimatedDailyUsage = (power * 24) / 1000

  // Rough cost calculation (adjust rate as needed)
  const costPerKwh = 0.12 // $0.12 per kWh
  const estimatedDailyCost = estimatedDailyUsage * costPerKwh
  const estimatedMonthlyCost = estimatedDailyCost * 30

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
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Cost Estimates</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Daily</span>
              <span className="text-sm font-semibold text-foreground">${estimatedDailyCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Monthly</span>
              <span className="text-sm font-semibold text-foreground">${estimatedMonthlyCost.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
