"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Battery, BatteryCharging } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface BatteryStatusProps {
  voltage: number
  percentage: number
}

export function BatteryStatus({ voltage, percentage }: BatteryStatusProps) {
  const getStatusText = () => {
    if (percentage > 70) return "Healthy"
    if (percentage >= 10) return "Moderate"
    return "Critical"
  }

  const getStatusColor = () => {
    if (percentage > 70) return "text-success"
    if (percentage >= 10) return "text-warning"
    return "text-destructive"
  }

  return (
    <Card className="glass-strong glow-subtle hover:glow-primary transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-foreground">Battery Status</CardTitle>
          {percentage < 10 ? (
            <Battery className="h-5 w-5 text-destructive animate-pulse" />
          ) : percentage > 50 ? (
            <BatteryCharging className="h-5 w-5 text-success" />
          ) : (
            <Battery className="h-5 w-5 text-warning" />
          )}
        </div>
        <CardDescription>System battery monitoring</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Charge Level</span>
            <span className={`font-semibold ${getStatusColor()}`}>{percentage.toFixed(0)}%</span>
          </div>
          <Progress value={percentage} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Voltage</p>
            <p className="text-2xl font-bold text-foreground">{voltage.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">VDC</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Status</p>
            <p className={`text-2xl font-bold ${getStatusColor()}`}>{getStatusText()}</p>
            <p className="text-xs text-muted-foreground">Condition</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
