# My Prayers — Web

A responsive, installable prayer-times PWA. Web port of the React Native package
[**@shkomaghdid/react-native-prayer-times**](https://github.com/OneAboveAll1964/react-native-prayer-times) —
the same astronomical engine, the same offline geocoder, the same Hisnul Muslim
azkars and 99 Names of Allah, plus Quran reading with a Sorani translation.

## Features

- **Prayer times** — calculated via 7 well-known methods (Umm al-Qura, MWL, ISNA,
  Karachi, Egypt, Jafari, Tehran) plus a custom-angle method, with Hanafi/Shafi'i
  asr, four higher-latitude adjustments, per-prayer offsets, and an optional
  fixed-table fallback for cities the source database covers.
- **Offline geocoder** — search 6,700+ cities across 252 countries, reverse-geocode
  from device location.
- **Qibla compass** — live device-orientation compass on mobile; static bearing on
  desktop. Distance to the Kaaba.
- **Hisnul Muslim azkars** — 12 categories, 133 chapters, 310 items, all with
  multilingual translations and per-item dhikr counters.
- **99 Names of Allah** — with translation and transliteration in every supported
  language.
- **Quran** — full text from [alquran.cloud](https://alquran.cloud) with Arabic
  Uthmani + the **Burhan Muhammad-Amin** Sorani translation (also English, Arabic
  Muyassar). Bookmark surahs and individual ayahs; "Continue reading" picks up
  where you left off.
- **Tasbih** — large-bead counter with target presets (33 / 99 / 100 / ∞) and a
  running total that survives reload.
- **Hijri date**, **monthly calendar**, **next-prayer countdown**.
- **Languages** — English, Arabic, Kurdish (Sorani), Kurdish (Badini). Full RTL.
- **Theming** — light / dark / auto with a green accent (`#1F8A4C`).
- **Installable PWA** — true standalone app on iOS Add-to-Home and Chrome Install,
  with shortcuts for Qibla / Azkars / Quran. App icon and theme color follow the
  active theme.
- **Pickable Arabic typeface** — Amiri, Naskh, Scheherazade, Reem Kufi, with live
  previews in Settings.

Everything that doesn't need fresh data is cached in `localStorage`
(stale-while-revalidate), so navigation between the cached surfaces is instant.

## Tech stack

- **Vite 8** + **React 19** (JSX only)
- **react-router 7**, **react-i18next**, **lucide-react** icons
- **@supabase/supabase-js** — public read-only access to a Supabase Postgres copy
  of the source SQLite database
- **vite-plugin-pwa** for the service worker + manifest
- **eslint + prettier**, no TypeScript

## Architecture

```
src/
├── lib/
│   ├── prayer-times/      # 1:1 port of the RN package's calculator
│   ├── repositories/      # Supabase-backed data access (locations, names, azkars)
│   ├── quran.js           # alquran.cloud client + cache
│   ├── qibla.js           # bearing + distance math
│   ├── hijri.js           # Intl islamic-umalqura
│   ├── cache.js           # localStorage SWR cache
│   └── supabase.js
├── i18n/                  # en, ar, ckb, ckb_Badini bundles
├── store/                 # settings + favorites (localStorage)
├── pages/                 # one .jsx per route
└── components/<PageName>/ # one folder per page, plus Layout/ and ui/ primitives
```

The frontend talks only to two origins: your Supabase project (anon key) and
`api.alquran.cloud`. There is **no backend** beyond Supabase.

## Setup

```bash
npm install
cp .env.example .env   # already filled in with your project URL + anon key
npm run dev            # http://localhost:5173
```

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run dev:https` | Vite dev with self-signed HTTPS — required to test the compass / install the PWA from a phone (`HTTPS=1 vite --host`) |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build |
| `npm run preview:https` | Same, over HTTPS |
| `npm run lint` | ESLint |
| `npm run format` | Prettier write |
| `npm run migrate` | Re-run the SQLite → Supabase data migration |

## Supabase

The schema lives in [`supabase/schema.sql`](./supabase/schema.sql). It mirrors
the bundled SQLite database from the source RN package (countries, locations,
prayer\_time, name + name\_translation, azkar\_category/chapter/item with their
translation tables). Apply it once via the Supabase Studio SQL Editor.

Then run the migration script with the **service-role** key (one-time):

```bash
SUPABASE_URL=https://<ref>.supabase.co \
SUPABASE_SERVICE_KEY=eyJ... \
npm run migrate
```

The script reads from
`/Users/oneaboveall/WebstormProjects/react-native-prayer-times/assets/custom/muslim_db_v3.0.0.db`
by default; override with `SQLITE_DB=/path/to/file`.

## Installing as an app

- **iOS Safari**: Share → *Add to Home Screen*
- **Android Chrome / desktop Chrome / Edge**: the *Install app* prompt will fire
  once the app has been visited at a secure origin (not plain `http://localhost`
  from another device).
- For local install + compass testing on a real phone, run `npm run dev:https`
  and accept the self-signed certificate.

## Credits

- Calculation logic and bundled offline data: **muslim-data-flutter** by
  [@kosratdev](https://github.com/kosratdev), ported to React Native by
  [@OneAboveAll1964](https://github.com/OneAboveAll1964) in
  [react-native-prayer-times](https://github.com/OneAboveAll1964/react-native-prayer-times)
  — this web app is a 1:1 port of that package's API.
- Quran data: **[alquran.cloud](https://alquran.cloud)** (Quran Uthmani +
  ku.asan / en.sahih / ar.muyassar editions).
- Hisnul Muslim azkars: traditional compilation by Sa'id ibn Ali ibn Wahf
  al-Qahtani, included in the source database.
- Fonts: **[Amiri](https://fonts.google.com/specimen/Amiri)**,
  **[Noto Naskh Arabic](https://fonts.google.com/noto/specimen/Noto+Naskh+Arabic)**,
  **[Scheherazade New](https://fonts.google.com/specimen/Scheherazade+New)**,
  **[Reem Kufi](https://fonts.google.com/specimen/Reem+Kufi)**,
  **[Inter](https://rsms.me/inter/)**, all served via
  [@fontsource](https://fontsource.org/).

## License

MIT.
