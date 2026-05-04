#!/usr/bin/env node
/**
 * Snapshots the current manufacturer list (with car counts) from the live
 * encar-proxy and writes it to src/data/manufacturers.json. The bundled
 * snapshot is shown by useManufacturers as initialData on first paint, so
 * the brand dropdown is populated before any network request completes.
 *
 * The snapshot is treated as immediately-stale by React Query
 * (initialDataUpdatedAt: 0), so a background refetch fires on every mount
 * and the live counts overwrite the snapshot within ~1 s when the proxy is
 * healthy. Brand *names* don't change hourly, so the worst-case staleness
 * is the count column being a few minutes off until the live data lands.
 *
 * Run manually: `yarn snapshot:manufacturers`
 *
 * Could be automated as a daily/weekly GitHub Action that opens a PR if the
 * file changed — defer until volume of changes warrants it.
 */

import { writeFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT = join(__dirname, '..')
const OUT_PATH = join(ROOT, 'src', 'data', 'manufacturers.json')

const PROXY_URL =
  'https://encar-proxy-main.onrender.com/api/nav?count=true&q=(And.Hidden.N._.CarType.A._.SellType.%EC%9D%BC%EB%B0%98.)&inav=%7CMetadata%7CSort'

const TIMEOUT_MS = 30_000

// Keep only fields the React app reads. Full upstream payload is ~158 KB;
// trimming yields ~10 KB which is small enough to bundle without bloating the
// initial JS load.
function trim(manufacturers) {
  return manufacturers.map((m) => ({
    Value: m.Value,
    DisplayValue: m.DisplayValue,
    Count: m.Count,
    IsSelected: m.IsSelected ?? false,
  }))
}

async function fetchManufacturers() {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(PROXY_URL, { signal: ctrl.signal })
    if (!res.ok) {
      const body = await res.text().catch(() => '')
      throw new Error(
        `HTTP ${res.status}: ${body.slice(0, 200)}\n\n` +
          `If the proxy is in shed-load mode (503), regenerate manually with:\n` +
          `  curl --proxy http://USER:PASS@proxy.bestproxy.com:2312 ` +
          `-H 'Origin: http://www.encar.com' ` +
          `'http://api.encar.com/search/car/list/premium?count=true&q=...&inav=...'\n` +
          `then transform the response into the same shape this script produces.`
      )
    }
    const data = await res.json()
    const manufacturers =
      data?.iNav?.Nodes?.[1]?.Facets?.[0]?.Refinements?.Nodes?.[0]?.Facets || []
    const totalCars = data?.Count || 0
    if (manufacturers.length === 0) {
      throw new Error('Empty manufacturer list — proxy returned unexpected shape')
    }
    return { manufacturers, totalCars }
  } finally {
    clearTimeout(timer)
  }
}

async function main() {
  console.log(`Fetching manufacturer snapshot from ${PROXY_URL}`)
  const { manufacturers, totalCars } = await fetchManufacturers()
  await mkdir(dirname(OUT_PATH), { recursive: true })
  const trimmed = trim(manufacturers)
  const payload = {
    generatedAt: new Date().toISOString(),
    totalCars,
    manufacturers: trimmed,
  }
  await writeFile(OUT_PATH, JSON.stringify(payload, null, 2) + '\n', 'utf8')
  const sizeKb = (JSON.stringify(payload).length / 1024).toFixed(1)
  console.log(
    `Wrote ${OUT_PATH}\n  ${trimmed.length} manufacturers, ${totalCars.toLocaleString()} total cars, ${sizeKb} KB`
  )
}

main().catch((err) => {
  console.error('Snapshot failed:', err.message)
  process.exit(1)
})
