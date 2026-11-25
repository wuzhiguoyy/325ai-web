<div align="center">

# 325 KI-Modelle — Modellmarktplatz & Entwickler-Konsole

**Eine API für Text-, Bild-, Video-, Audio- und Embedding-Modelle · Nutzungsbasierte Abrechnung · Transparente Preise**

Vue 3 · Vite · Statisches Hosting · SEO integriert (sitemap / robots / JSON-LD)

[中文](README.md) · [English](README.en.md) · [Deutsch](README.de.md) · [日本語](README.ja.md) · [Africa](README.af.md)

</div>

---

## Überblick

Frontend für **325 AI Models** — eine Plattform für KI-Modell-Aggregation und API-Zugang für Entwickler in der **EU, Deutschland, Österreich und der Schweiz**:

- **Modellmarktplatz** — Hunderte LLMs und Medienmodelle nach Fähigkeit durchsuchen, Kontextfenster und Preise pro Token / pro Aufruf vergleichen
- **Entwickler-Konsole** — API-Schlüssel, Nutzungsprotokolle, Monatsrechnungen, Abrechnungsjournal, Wallet und Empfehlungsprogramm

**Keywords**: KI-Modell API, LLM API Marktplatz, OpenAI API Alternative, Claude API Zugang, Gemini API Zugang, KI API für Unternehmen, GPT API Europa, KI Schnittstelle, pay per use KI, Modell-Aggregator, DSGVO-freundliche Integration, Vue 3 Dashboard, Vite, Text-zu-Bild API, Text-zu-Video API, Embeddings API.

---

## Funktionen

### Modellmarktplatz

| Funktion | Details |
| --- | --- |
| Fähigkeiten | Text, Bild, Video, Audio, Embeddings — dynamisch aggregiert |
| Suche | Sofortfilter nach Modellname |
| Seiten | 60 Modelle pro Seite, basierend auf API-Summen |
| Detailseite | Direkt verlinkbar `#/models/<modelId>` mit Preisen und Beispielen |
| Sitemap | `#/sitemap` indexiert alle Modelle nach Fähigkeit |

### Konsole (Anmeldung erforderlich)

| Seite | Zweck |
| --- | --- |
| Übersicht | Guthaben, Ausgaben, Anfragen und Token-Statistik |
| API-Schlüssel | Erstellen und widerrufen (max. 10 pro Konto) |
| Nutzungsprotokoll | Filter nach Schlüssel, Modell, Request-ID, Status |
| Monatsrechnung | Monatssummen und Erfolgsquote |
| Abrechnungsjournal | Jede Guthabenbewegung |
| Wallet | USDT-Adresse (TRC20) mit QR-Code, Aufladehistorie |
| Empfehlungen | Einladungslink, QR-Code, Provisionen |

---

## Technik

| Ebene | Technologie |
| --- | --- |
| Framework | Vue 3 (Options API) |
| Build | Vite 6 |
| Styles | Reines CSS je Komponente |
| QR-Codes | qrcode |
| Routing | Leichter Hash-Router |
| Hosting | Statisches Hosting (Cloudflare Pages, Netlify, Vercel) |

---

## Schnellstart

```bash
npm install
npm run dev
npm run build
```

Der Build erzeugt `dist/`, `dist/sitemap.xml` und `dist/robots.txt`.

---

## Umgebungsvariablen

| Variable | Zweck | Beispiel |
| --- | --- | --- |
| `VITE_API_BASE` | API-Basis-URL | `https://api.325ai.com` |
| `VITE_SITE_ORIGIN` | Kanonische Domain | `https://325ai.com` |

---

## SEO

- Eigene Title-, Description- und Canonical-Angaben je Ansicht
- Strukturierte Daten: Organization, WebSite, Product
- `sitemap.xml` wird beim Build für alle Modellseiten erzeugt
- `robots.txt` erlaubt Crawling, Konsole ist `noindex`
- Semantische Überschriften und interne Verlinkung

**Suchbegriffe**: KI API kaufen, LLM API Deutschland, OpenAI API günstig, GPT API Europa, Claude API nutzen, Gemini API Zugang, KI Modelle vergleichen, API für KI Startups, KI Schnittstelle für SaaS, nutzungsbasierte KI-Abrechnung.

---

## Lizenz

MIT
