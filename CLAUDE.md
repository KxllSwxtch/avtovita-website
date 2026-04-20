# CLAUDE.md

This file provides guidance for Claude Code when working with the AvtoVita website codebase.

## Development Commands

```bash
yarn dev       # Start Vite dev server
yarn build     # Production build (output: dist/)
yarn lint      # ESLint
yarn preview   # Preview production build
```

Package manager: **Yarn with Plug'n'Play** (no `node_modules`; deps in `.yarn/cache/`). Use `yarn` for all package operations.

## Tech Stack

- React 19, Vite 6, Tailwind CSS 4 (via `@tailwindcss/vite` plugin)
- React Router DOM 7 (BrowserRouter)
- React Query 3 (QueryClientProvider wraps app in `main.jsx`)
- Axios for HTTP requests
- Framer Motion for animations
- Heroicons, React Icons for icons
- React Slick / Swiper for carousels
- React Helmet for `<head>` management
- Lodash (utility functions)

## Architecture

SPA with the following structure:

```
src/
├── components/    # Reusable UI components (Header, Footer, CarCard, Calculator, etc.)
├── pages/         # Route-level pages (Home, About, ExportCatalog, CarDetails, etc.)
├── translations/  # Korean→Russian translation dictionaries
├── utils/         # Helper functions and option configs
├── App.jsx        # Route definitions + loading transitions
├── main.jsx       # Entry point (React 19 createRoot, Router, QueryClient)
└── index.css      # Tailwind imports + custom theme
```

**Entry:** `index.html` → `src/main.jsx` → `src/App.jsx`

**Routes** (defined in `App.jsx`):
- `/` → Home
- `/about` → About
- `/catalog` → ExportCatalog
- `/catalog/:carId` → CarDetails
- `/contacts` → Contacts
- `*` → 404

**Barrel exports:** Each subdirectory has an `index.js` re-exporting all modules. Import from the directory, not individual files.

## API Integrations

All API URLs are **hardcoded** — no environment variables.

### ENCAR Proxy (car catalog)
- Base: `https://encar-proxy-main.onrender.com`
- `/api/nav` — manufacturer/model/config navigation with query params
- `/api/catalog` — search results with filters, sorting, pagination
- `/health` — proxy status endpoint (no upstream call; safe for keep-alive pings)
- Used in: `ExportCatalog.jsx`
- Hosted on Render free tier: **sleeps after 15 min idle** (cold-start ≈ 25–60s).
  - Mitigation A (server-side, primary): UptimeRobot HTTP monitor on `/health`, every 5 min (free tier). Keeps the dyno warm. **Action required: set this up in UptimeRobot — the proxy code already exposes the endpoint.**
  - Mitigation B (client-side): `src/main.jsx` issues a fire-and-forget warmup `fetch` to `/health` at app boot.
  - If UptimeRobot stops, the catalog page shows a "Сервер просыпается" hint after 4s so users know what's happening.

### EnCAR Direct (car details & inspection)
- Base: `https://api.encar.com/v1/readside`
- `/vehicle/{carId}` — vehicle details
- `/inspection/vehicle/{vehicleId}` — inspection data
- `/record/vehicle/{vehicleId}?type={type}` — vehicle records
- Used in: `CarDetails.jsx`, `CarInspection.jsx`

### Currency API
- `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`
- Fetches USD→KRW exchange rate
- Used in: `ExportCatalog.jsx`

### Customs Calculator
- `https://corsproxy.io/?key=28174bc7&url=https://calcus.ru/calculate/Customs`
- POST with URLSearchParams (owner, age, engine, power, value, price, curr)
- Returns Russian customs fees breakdown (duty, recycling, total)
- Used in: `Calculator.jsx`

## Translation System

Custom Korean→Russian translation via dictionaries in `src/translations/`:
- `translations.js` — 757+ general Korean→Russian mappings
- `carBrands.js` — 69 brand name translations
- `carModels.js` — model translations (~760 lines)
- `carDetailedModels.js` — detailed model variant translations
- `carTrims.js` — trim level translations (~666 lines)

**Core function:** `translateSmartly(text)` in `translations.js` — sorts dictionary keys by descending length (longest match first), then replaces all Korean substrings with Russian equivalents. Use `translateCarName()` from `utils/` for car-specific translations.

## Styling

Tailwind CSS v4 with `@tailwindcss/vite` plugin (configured in `vite.config.js`).

Custom theme colors defined in `src/index.css` via `@theme`:
- `avtoVitaGold`: `#ffd700`
- `avtoVitaGoldDark`: `#b78d37`
- `avtoVitaBlack`: `#121212`

Use as `bg-avtoVitaGold`, `text-avtoVitaBlack`, etc.

## Deployment

- **Netlify** — config in `netlify.toml`
- Build command: `npm run build`, publish: `dist/`
- SPA redirect: `/* → /index.html` (status 200)
- Node version: 20.9.0
- CORS: `access-control-allow-origin: *`

## Key Patterns

### Cascading Filters (ExportCatalog.jsx)
Hierarchical: Manufacturer → Model Group → Model → Configuration → Badge → Badge Details. Each dropdown is disabled until its parent is selected. Changing a parent resets all children.

### Performance
- `memo(CarCard)` to prevent unnecessary re-renders
- `useMemo` for sort options, year/mileage/price option arrays, pagination rendering
- `useRef(fetchInProgress)` to prevent duplicate concurrent API fetches
- Custom `useDebounce` hook (500ms) for search-by-number input

### localStorage Persistence
- `exportCatalogCurrentPage` — saves/restores pagination position (debounced 300ms)
- `brandLogos` / `modelLogos` — cached logo data

### URL Parameters
ExportCatalog reads `manufacturer`, `modelGroup`, `model` from URL search params and applies them as initial filter values.
