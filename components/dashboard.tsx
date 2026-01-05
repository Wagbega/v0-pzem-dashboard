"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Battery, Activity, BarChart3, Clock } from "lucide-react"
import { VoltageChart } from "@/components/voltage-chart"
import { PowerChart } from "@/components/power-chart"
import { EnergyStats } from "@/components/energy-stats"
import { BatteryStatus } from "@/components/battery-status"
import { SystemMetrics } from "@/components/system-metrics"
import { getLatestData } from "@/app/actions"
import type { ParsedEntry } from "@/lib/thingspeak"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Dashboard() {
  const [data, setData] = useState<ParsedEntry | null>(null)
  const [isOnline, setIsOnline] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    try {
      const parsedData = await getLatestData()
      setData(parsedData)
      setIsOnline(true)
      setError(null)
    } catch (err) {
      console.error("[v0] Error fetching ThingSpeak data:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch data")
      setIsOnline(false)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 15000)
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = () => {
    if (!data) return "bg-secondary text-white"
    if (data.batteryPercent > 70) return "bg-success text-white"
    if (data.batteryPercent >= 10) return "bg-warning text-white"
    return "bg-destructive text-white"
  }

  const formatLastUpdate = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffSecs = Math.floor(diffMs / 1000)
    const diffMins = Math.floor(diffSecs / 60)

    if (diffSecs < 60) return `${diffSecs}s ago`
    if (diffMins < 60) return `${diffMins}m ago`
    return date.toLocaleTimeString()
  }

  if (isLoading && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl glass-strong glow-primary animate-pulse">
            <Zap className="h-8 w-8 text-primary" />
          </div>
          <p className="text-muted-foreground font-medium">Loading data from ThingSpeak...</p>
        </div>
      </div>
    )
  }

  if (error && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl glass-strong border-destructive/30">
            <Zap className="h-8 w-8 text-destructive" />
          </div>
          <p className="text-destructive font-medium">{error}</p>
          <button onClick={fetchData} className="text-sm text-primary hover:underline font-medium">
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border glass-strong">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary glow-primary">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Energy Monitor</h1>
                <p className="text-sm text-muted-foreground">Pt-8X Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Badge
                variant={isOnline ? "default" : "destructive"}
                className={`gap-1.5 glass ${isOnline ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30" : ""}`}
              >
                <div
                  className={`h-2 w-2 rounded-full ${isOnline ? "bg-emerald-500 animate-pulse" : "bg-destructive"}`}
                />
                {isOnline ? "Online" : "Offline"}
              </Badge>
              <Badge variant="outline" className="hidden sm:flex gap-1.5 glass">
                <Clock className="h-3 w-3" />
                {formatLastUpdate(data.timestamp)}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        <Card className="lg:hidden glass-strong glow-subtle">
          <CardContent className="py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                Last Update
              </div>
              <div className="text-sm font-medium text-foreground">{data.timestamp.toLocaleString()}</div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="glass-strong glow-subtle hover:glow-primary transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Voltage</CardTitle>
                <Activity className="h-4 w-4 text-chart-1" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-foreground">{data.voltage.toFixed(1)}</div>
                <p className="text-xs text-muted-foreground">VAC</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-strong glow-subtle hover:glow-secondary transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Power</CardTitle>
                <Zap className="h-4 w-4 text-chart-2" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-foreground">{data.power.toFixed(0)}</div>
                <p className="text-xs text-muted-foreground">Watts</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-strong glow-subtle hover:glow-primary transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Energy</CardTitle>
                <BarChart3 className="h-4 w-4 text-chart-3" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-foreground">{data.energy.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">kWh</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-strong glow-subtle hover:glow-secondary transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Battery</CardTitle>
                <Battery className="h-4 w-4 text-chart-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-foreground">{data.batteryPercent.toFixed(0)}%</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 glass rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getStatusColor()} transition-all duration-500`}
                      style={{ width: `${data.batteryPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <VoltageChart />
          <PowerChart />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <BatteryStatus voltage={data.batteryVoltage} percentage={data.batteryPercent} />
          <SystemMetrics frequency={data.frequency} powerFactor={data.powerFactor} current={data.current} />
          <EnergyStats energy={data.energy} power={data.power} />
        </div>
      </main>
    </div>
  )
}
