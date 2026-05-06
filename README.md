# My Prayers — Web

A responsive, installable prayer-times PWA. Web port of the React Native package
[**@shkomaghdid/react-native-prayer-times**](https://github.com/OneAboveAll1964/react-native-prayer-times) —
the same astronomical engine, the same offline geocoder, the same Hisnul Muslim
azkars and 99 Names of Allah, plus Quran reading with a Sorani translation.

Frontend-only. No server beyond Supabase (read-only) and the public
[alquran.cloud](https://alquran.cloud) API.

## Features

- **Prayer times** — calculated via 7 well-known methods (Umm al-Qura, MWL, ISNA,
  Karachi, Egypt, Jafari, Tehran) plus a custom-angle method, with Hanafi / Shafi'i
  asr, four higher-latitude adjustments, per-prayer offsets, and an optional
  fixed-table fallback for cities the source database covers.
- **Offline geocoder** — search 6,700+ cities across 252 countries, reverse-geocode
  from device location. Recently picked cities are remembered.
- **Qibla compass** — live device-orientation compass on mobile (HTTPS required);
  static bearing on desktop. Distance to the Kaaba.
- **Hisnul Muslim azkars** — 12 categories, 133 chapters, 310 items, all with
  multilingual translations. Star a chapter to pin it; per-item dhikr counters
  persist across reloads.
- **99 Names of Allah** — name, transliteration, translation in every supported
  language.
- **Quran** — full text from alquran.cloud (Quran Uthmani + the
  **Burhan Muhammad-Amin** Sorani translation, plus en.sahih and ar.muyassar).
  Bookmark whole surahs **and** individual ayahs; "Continue reading" picks up
  where you left off; tapping an ayah bookmark scrolls straight to it.
- **Tasbih** — large-bead counter with target presets (33 / 99 / 100 / ∞) and a
  running total. Two reset buttons: clear the current count or wipe the total too.
- **Hijri date**, **monthly calendar** (stacked day cards on mobile, full grid on
  desktop, single batched query per month), **next-prayer countdown**.
- **Languages** — English, Arabic, Kurdish (Sorani), Kurdish (Badini). Full RTL.
- **Theming** — light / dark / auto with a green accent (`#1F8A4C`). System-bar
  color follows the active theme on mobile.
- **Pickable Arabic typeface** — Amiri Quran (default), Alyamama, Scheherazade,
  Naskh. Live previews; selectable from Settings or via a typography button on
  the Quran / Surah pages.
- **Installable PWA** — true standalone app on iOS Add-to-Home and Chrome
  Install, with shortcuts for Qibla / Azkars / Quran. Custom splash screen with
  a sliding-door reveal that gates on `document.fonts.ready`.

Everything that doesn't need fresh data is cached in `localStorage`
(stale-while-revalidate): Names of Allah, Azkar categories / chapters / items,
the Quran surah list, individual surahs. Subsequent visits hydrate instantly.
Prayer times are intentionally not cached because they're date- and
location-dependent.

## Tech stack

- **Vite 8** + **React 19** (JSX only, no TypeScript)
- **react-router 7**, **react-i18next**, **lucide-react** icons
- **@supabase/supabase-js** — public read-only access to a Supabase Postgres copy
  of the source SQLite database
- **vite-plugin-pwa** for the service worker + manifest
- **@fontsource** for self-hosted typefaces
- **eslint + prettier**

## Layout / Navigation

- **Mobile**: 5-tab bottom bar — Home, Azkars, Qibla, Quran, **More**. The
  *More* tab opens a bottom sheet containing Calendar, Names, Tasbih, Settings.
- **Desktop**: persistent left sidebar with all entries.
- Header + search are one sticky block per page; a content-only scroll area sits
  below it so chrome never moves while scrolling. Native scrollbars are hidden
  everywhere.

## Architecture

```
src/
├── lib/
│   ├── prayer-times/        # 1:1 JS port of the RN package's calculator
│   │   ├── calculatedPrayerTime.js
│   │   ├── calculationMethod.js
│   │   ├── asrMethod.js
│   │   ├── higherLatitudeMethod.js
│   │   ├── prayerAttribute.js
│   │   ├── prayerTime.js
│   │   └── prayerTimeRepository.js   # batches month queries against Supabase
│   ├── repositories/        # Supabase-backed data access
│   │   ├── locationRepository.js
│   │   ├── nameOfAllahRepository.js
│   │   └── hisnulMuslimRepository.js
│   ├── quran.js             # alquran.cloud client + cache
│   ├── qibla.js             # bearing + Haversine distance
│   ├── hijri.js             # Intl islamic-umalqura
│   ├── cache.js             # localStorage SWR cache
│   ├── i18nLang.js
│   └── supabase.js
├── i18n/                    # en, ar, ckb, ckb_Badini bundles
├── store/
│   ├── settings.js          # theme, lang, calc method, font, location, ...
│   └── favorites.js         # chapter stars, surah/ayah bookmarks, dhikr, tasbih
├── pages/                   # one .jsx per route
└── components/<PageName>/   # one folder per page, plus Layout/ and ui/ primitives
```

The frontend talks only to two origins: your Supabase project (anon key) and
`api.alquran.cloud`.

## Setup

```bash
npm install
cp .env.example .env   # already filled in with the Supabase URL + anon key
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
| `npm run migrate` | Re-run the SQLite → Supabase data migration (needs service-role key) |

## Supabase

The schema lives in [`supabase/schema.sql`](./supabase/schema.sql). It mirrors
the bundled SQLite database from the source RN package: countries, locations,
prayer\_time, name + name\_translation, and the azkar\_category / chapter / item
trio with their translation tables. RLS allows anon SELECTs only.

Apply the schema once in the Supabase Studio SQL Editor, then load data with the
**service-role** key (one-time):

```bash
SUPABASE_URL=https://<ref>.supabase.co \
SUPABASE_SERVICE_KEY=eyJ... \
npm run migrate
```

The script reads `muslim_db_v3.0.0.db` from the sibling
`react-native-prayer-times/assets/custom/` directory by default; override with
`SQLITE_DB=/path/to/file`.

## Installing as an app

- **iOS Safari**: Share → *Add to Home Screen*. The result is a real standalone
  app — no browser chrome, custom splash, theme color matches your light/dark
  setting.
- **Android Chrome / desktop Chrome / Edge**: the *Install app* prompt fires
  once the app is loaded at a **secure origin** (https or `localhost` directly
  on the same device).

To install or to test the **Qibla compass** from a real phone you need an HTTPS
URL — `http://<your-mac-ip>:5173/` over your LAN won't work, since
`DeviceOrientation` and the install prompt require a secure origin. Two options:

```bash
npm run dev:https      # binds to 0.0.0.0 with a self-signed cert
# then on your phone, open https://<your-mac-ip>:5173 and accept the warning
```

Or tunnel the dev server with `ngrok http 5173` / `cloudflared tunnel --url http://localhost:5173`.

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
- Fonts: **[Amiri / Amiri Quran](https://fonts.google.com/specimen/Amiri)**,
  **[Alyamama](https://fontsource.org/fonts/alyamama)**,
  **[Scheherazade New](https://fonts.google.com/specimen/Scheherazade+New)**,
  **[Noto Naskh Arabic](https://fonts.google.com/noto/specimen/Noto+Naskh+Arabic)**,
  **[Inter](https://rsms.me/inter/)**, all served via
  [@fontsource](https://fontsource.org/).
- Icons: [lucide](https://lucide.dev/), with a custom in-house "99" mark for the
  Names of Allah tab.

Made by [@OneAboveAll1964](https://github.com/OneAboveAll1964).

## License

MIT.
