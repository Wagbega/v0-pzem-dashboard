"use server"

import { parseEntry, type ThingSpeakEntry, type ThingSpeakResponse, type ParsedEntry } from "@/lib/thingspeak"

const CHANNEL_ID = "3217965"
const BASE_URL = "https://api.thingspeak.com/channels"
const READ_API_KEY = process.env.THINGSPEAK_READ_API_KEY?.trim()

async function fetchLatestEntries(results = 20): Promise<ThingSpeakResponse> {
  const url = new URL(`${BASE_URL}/${CHANNEL_ID}/feeds.json`)
  url.searchParams.append("results", results.toString())
  if (READ_API_KEY) {
    url.searchParams.append("api_key", READ_API_KEY)
  }

  console.log("[v0] Fetching from:", url.toString().replace(READ_API_KEY || "", "API_KEY_HIDDEN"))

  const response = await fetch(url.toString(), {
    cache: "no-store",
  })

  console.log("[v0] Response status:", response.status)

  if (!response.ok) {
    const errorText = await response.text()
    console.log("[v0] Error response:", errorText)
    throw new Error(`ThingSpeak API error: ${response.status} - ${errorText}`)
  }

  const data = await response.json()
  console.log("[v0] Received feeds count:", data.feeds?.length || 0)
  return data
}

async function fetchLatestEntry(): Promise<ThingSpeakEntry> {
  const url = new URL(`${BASE_URL}/${CHANNEL_ID}/feeds/last.json`)
  if (READ_API_KEY) {
    url.searchParams.append("api_key", READ_API_KEY)
  }

  console.log("[v0] Fetching last entry from:", url.toString().replace(READ_API_KEY || "", "API_KEY_HIDDEN"))

  const response = await fetch(url.toString(), {
    cache: "no-store",
  })

  console.log("[v0] Last entry response status:", response.status)

  if (!response.ok) {
    const errorText = await response.text()
    console.log("[v0] Error response:", errorText)
    throw new Error(`ThingSpeak API error: ${response.status} - ${errorText}`)
  }

  const data = await response.json()
  console.log("[v0] Latest entry:", data)
  return data
}

export async function getLatestData(): Promise<ParsedEntry> {
  const entry = await fetchLatestEntry()
  return parseEntry(entry)
}

export async function getHistoricalData(results = 20): Promise<ParsedEntry[]> {
  const response = await fetchLatestEntries(results)
  return response.feeds.map(parseEntry)
}
