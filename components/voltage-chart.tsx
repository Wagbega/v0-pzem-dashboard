"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { getHistoricalData } from "@/app/actions"

export function VoltageChart() {
  const [data, setData] = useState<Array<{ time: string; voltage: number }>>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const entries = await getHistoricalData(20)
        const chartData = entries.map((parsed) => ({
          time: parsed.timestamp.toLocaleTimeString(),
          voltage: parsed.voltage,
        }))
        setData(chartData)
      } catch (err) {
        console.error("[v0] Error fetching voltage chart data:", err)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="glass-strong glow-subtle hover:glow-primary transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-foreground">Voltage</CardTitle>
        <CardDescription>Real-time voltage monitoring</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="voltageGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.7 0.25 250)" stopOpacity={0.9} />
                <stop offset="100%" stopColor="oklch(0.7 0.25 250)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              stroke="oklch(0.50 0 0)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.split(":").slice(0, 2).join(":")}
            />
            <YAxis stroke="oklch(0.50 0 0)" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.16 0 0)",
                border: "1px solid oklch(0.24 0 0)",
                borderRadius: "8px",
                color: "oklch(0.95 0 0)",
              }}
              formatter={(value: number) => [`${value.toFixed(1)} V`, "Voltage"]}
            />
            <Area
              type="monotone"
              dataKey="voltage"
              stroke="oklch(0.7 0.25 250)"
              fill="url(#voltageGradient)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
