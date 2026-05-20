# imgcompress — Frontend

Next.js 16 frontend for [imgcompress](https://github.com/karimz1/imgcompress), a self-hosted image compression and conversion tool.

## Stack

- **Next.js 16** (static export, `output: 'export'`)
- **React 19** + TypeScript (strict)
- **Tailwind CSS 4**
- **Radix UI** component primitives
- **react-i18next** for internationalisation

## Getting Started

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

> The dev server proxies `/api/*` requests to the backend at `http://127.0.0.1:5000`.  
> Run the backend container before performing actual conversions.

## Build

```bash
pnpm build      # production build (static export)
pnpm lint       # TypeScript type-check
pnpm test:e2e   # Playwright end-to-end tests
```

## Internationalisation (i18n)

The UI supports **English** and **Hungarian**, switchable at runtime via the **HU / EN** toggle in the top-right corner. The selected language is persisted in `localStorage`.

### How it works

| File | Purpose |
|---|---|
| `src/i18n/index.ts` | i18next initialisation; reads saved locale from localStorage |
| `src/i18n/locales/en.ts` | English translation strings (source of truth) |
| `src/i18n/locales/hu.ts` | Hungarian translation strings |
| `src/i18n/types.ts` | `TranslationSchema` — TypeScript compile-time check for missing keys |
| `src/context/I18nProvider.tsx` | Wraps the app; keeps `<html lang>` in sync with the active language |
| `src/components/LanguageSwitcher.tsx` | EN / HU toggle button |

### Adding a new translation key

1. Add the key and English string to `src/i18n/locales/en.ts`.
2. Add the Hungarian translation in `src/i18n/locales/hu.ts`.  
   TypeScript will report a compile error if the key is missing.
3. Use it in a component:

```tsx
const { t } = useTranslation();
<span>{t("my.new.key")}</span>
```

### Adding a new language

1. Create `src/i18n/locales/<code>.ts` typed as `TranslationSchema`.
2. Register it in `src/i18n/index.ts` (`resources`).
3. Add the locale code to the `LanguageSwitcher` toggle logic.

> **Note:** This project uses `output: 'export'` (fully static). Locale routing via Next.js middleware is not used — all language switching is client-side only.
