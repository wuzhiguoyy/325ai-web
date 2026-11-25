<div align="center">

# 325 AI Models — Model Marketplace & Developer Console

**One API for text, image, video, audio and embedding models · Pay-as-you-go · Transparent pricing**

Vue 3 · Vite · Static hosting · Built-in SEO (sitemap / robots / JSON-LD)

[中文](README.md) · [English](README.en.md) · [Deutsch](README.de.md) · [日本語](README.ja.md) · [Africa](README.af.md)

</div>

---

## Overview

Frontend for **325 AI Models**, an AI model aggregation and API resale platform for developers in the **United States, Canada and worldwide**:

- **Model marketplace** — browse hundreds of LLMs and media models by capability, compare context windows and per-token / per-call pricing
- **Developer console** — API keys, usage logs, monthly invoices, billing ledger, wallet and referral program

**Keywords**: AI model API, LLM API marketplace, OpenAI API alternative, Claude API access, Gemini API access, AI API reseller, unified AI gateway, pay-as-you-go AI API, cheap LLM API for startups, model aggregation platform, Vue 3 dashboard, Vite static site, AI API for SaaS, text-to-image API, text-to-video API, embeddings API.

---

## Features

### Model marketplace

| Feature | Details |
| --- | --- |
| Capability browsing | Text, image, video, audio, embeddings — aggregated dynamically |
| Search | Instant filter by model name |
| Pagination | 60 models per page, driven by API totals |
| Model detail | Deep-linkable `#/models/<modelId>` with pricing and request samples |
| Sitemap | `#/sitemap` indexes every model by capability |

### Console (requires sign-in)

| Page | Purpose |
| --- | --- |
| Overview | Balance, spend, request and token statistics |
| API keys | Create and revoke keys (limit 10 per account) |
| Usage logs | Filter by key, model, request ID and status |
| Monthly invoices | Monthly totals and success rate |
| Billing ledger | Line-by-line balance movements |
| Wallet | USDT (TRC20) address QR, top-up history |
| Referral program | Invite link, QR code, commission records |

---

## Stack

| Layer | Technology |
| --- | --- |
| Framework | Vue 3 (Options API) |
| Build | Vite 6 |
| Styling | Plain CSS, split per component |
| QR codes | qrcode |
| Routing | Lightweight hash router |
| Hosting | Any static host (Cloudflare Pages, Vercel, Netlify) |

---

## Quick start

```bash
npm install
npm run dev
npm run build
```

The build emits `dist/`, plus `dist/sitemap.xml` and `dist/robots.txt`.

---

## Environment

| Variable | Purpose | Example |
| --- | --- | --- |
| `VITE_API_BASE` | API base URL | `https://api.325ai.com` |
| `VITE_SITE_ORIGIN` | Canonical site origin | `https://325ai.com` |

---

## SEO

- Per-view title, description and canonical URL
- Structured data: Organization, WebSite, Product
- `sitemap.xml` generated at build time for every model page
- `robots.txt` open for crawling; console pages are `noindex`
- Semantic headings and internal linking across marketplace, detail and docs

**Keywords for search engines**: AI API marketplace USA, LLM API Canada, OpenAI compatible API, GPT API access, Claude API proxy, Gemini API proxy, AI model aggregator, pay per token AI API, AI API for indie developers, AI API for startups, multi-model API gateway, AI model pricing comparison.

---

## License

MIT
