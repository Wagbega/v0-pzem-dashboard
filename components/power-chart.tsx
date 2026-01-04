"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { getHistoricalData } from "@/app/actions"

export function PowerChart() {
  const [data, setData] = useState<Array<{ time: string; power: number }>>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const entries = await getHistoricalData(20)
        const chartData = entries.map((parsed) => ({
          time: parsed.timestamp.toLocaleTimeString(),
          power: parsed.power,
        }))
        setData(chartData)
      } catch (err) {
        console.error("[v0] Error fetching power chart data:", err)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="glass-strong glow-subtle hover:glow-secondary transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-foreground">Power Consumption</CardTitle>
        <CardDescription>Active power draw in watts</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data}>
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
              formatter={(value: number) => [`${value.toFixed(0)} W`, "Power"]}
            />
            <Line type="monotone" dataKey="power" stroke="oklch(0.7 0.22 190)" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
