export interface ThingSpeakEntry {
  created_at: string
  entry_id: number
  field1: string // voltage
  field2: string // battery_percent
  field3: string // power
  field4: string // energy
  field5: string // frequency
  field6: string // power_factor
  field7: string // current
  field8: string // battery_voltage (VDC)
}

export interface ThingSpeakResponse {
  channel: {
    id: number
    name: string
    description: string
    created_at: string
    updated_at: string
    last_entry_id: number
  }
  feeds: ThingSpeakEntry[]
}

export interface ParsedEntry {
  voltage: number
  batteryPercent: number
  power: number
  energy: number
  frequency: number
  powerFactor: number
  current: number
  batteryVoltage: number
  timestamp: Date
}

export function parseEntry(entry: ThingSpeakEntry): ParsedEntry {
  const batteryVoltage = Number.parseFloat(entry.field8 || "0") + 0.14

  const minVoltage = 20
  const maxVoltage = 28
  const batteryPercent = Math.max(0, Math.min(100, ((batteryVoltage - minVoltage) / (maxVoltage - minVoltage)) * 100))

  return {
    voltage: Number.parseFloat(entry.field1 || "0"),
    batteryPercent,
    power: Number.parseFloat(entry.field3 || "0"),
    energy: Number.parseFloat(entry.field4 || "0"),
    frequency: Number.parseFloat(entry.field5 || "0"),
    powerFactor: Number.parseFloat(entry.field6 || "0"),
    current: Number.parseFloat(entry.field7 || "0"),
    batteryVoltage,
    timestamp: new Date(entry.created_at),
  }
}
