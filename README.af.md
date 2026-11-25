<div align="center">

# 325 AI Models — Model Marketplace & Developer Console

**One API for text, image, video, audio and embedding models · Pay-as-you-go · Transparent pricing**

Vue 3 · Vite · Static hosting · Built-in SEO (sitemap / robots / JSON-LD)

[中文](README.md) · [English](README.en.md) · [Deutsch](README.de.md) · [日本語](README.ja.md) · [Africa](README.af.md)

</div>

---

## Overview

Frontend for **325 AI Models**, an AI model aggregation and API platform built for developers, agencies and startups across **Africa** — Nigeria, Kenya, South Africa, Ghana, Egypt, Morocco, Tanzania, Uganda and beyond.

- **Model marketplace** — browse hundreds of LLMs and media models, compare context windows and per-token / per-call pricing in USD
- **Developer console** — API keys, usage logs, monthly invoices, billing ledger, wallet (USDT) and referral program

**Keywords**: AI API Africa, LLM API Nigeria, AI API Kenya, AI API South Africa, AI API Ghana, AI API Egypt, AI API Morocco, cheap GPT API Africa, Claude API access Africa, Gemini API access Africa, AI API reseller, AI model aggregator, pay-as-you-go AI, USD billing AI API, text-to-image API, text-to-video API, embeddings API, Vue 3 dashboard, Vite.

---

## Fonctionnalités / Features

| Feature | Details |
| --- | --- |
| Capability browsing | Text, image, video, audio, embeddings — aggregated dynamically |
| Search | Instant filter by model name |
| Pagination | 60 models per page, driven by API totals |
| Model detail | Deep-linkable `#/models/<modelId>` with pricing and request samples |
| Console | Keys, usage logs, invoices, ledger, wallet, referrals |

### Console (sign-in required)

| Page | Purpose |
| --- | --- |
| Overview | Balance, spend, requests and token statistics |
| API keys | Create and revoke (max 10 per account) |
| Usage logs | Filter by key, model, request ID, status |
| Monthly invoices | Monthly totals and success rate |
| Billing ledger | Every balance movement |
| Wallet | USDT (TRC20) address QR and top-up history |
| Referrals | Invite link, QR code, commission history |

---

## Stack / Stack technique

| Layer | Technology |
| --- | --- |
| Framework | Vue 3 (Options API) |
| Build | Vite 6 |
| Styling | Plain CSS per component |
| QR codes | qrcode |
| Routing | Lightweight hash router |
| Hosting | Any static host (Cloudflare Pages, Netlify, Vercel) |

---

## Quick start / Démarrage

```bash
npm install
npm run dev
npm run build
```

The build emits `dist/`, `dist/sitemap.xml` and `dist/robots.txt`.

---

## Environment / Variables d'environnement

| Variable | Purpose | Example |
| --- | --- | --- |
| `VITE_API_BASE` | API base URL | `https://api.325ai.com` |
| `VITE_SITE_ORIGIN` | Canonical origin | `https://325ai.com` |

---

## SEO

- Per-view title, description and canonical URL
- Structured data: Organization, WebSite, Product
- `sitemap.xml` generated at build time for every model page
- `robots.txt` open for crawling; console pages are `noindex`

**Mots-clés / Keywords**: API IA Afrique, API LLM Nigeria, API IA Kenya, API IA Afrique du Sud, API GPT pas cher, accès API Claude, accès API Gemini, agrégateur de modèles IA, facturation à l'usage, API IA pour startups africaines.

---

## License / Licence

MIT
