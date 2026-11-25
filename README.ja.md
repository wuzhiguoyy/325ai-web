<div align="center">

# 325 AIモデル — モデルマーケットプレイス＆開発者コンソール

**1つのAPIでテキスト・画像・動画・音声・埋め込みモデルを利用 · 従量課金 · 明朗な料金**

Vue 3 · Vite · 静的ホスティング · SEO対応（sitemap / robots / JSON-LD）

[中文](README.md) · [English](README.en.md) · [Deutsch](README.de.md) · [日本語](README.ja.md) · [Africa](README.af.md)

</div>

---

## 概要

**325 AI Models** のフロントエンドです。**日本国内の開発者・スタートアップ**向けに、AIモデルの集約とAPI提供を行います。

- **モデルマーケットプレイス** — 数百のLLM・画像・動画モデルを機能別に閲覧し、コンテキスト長と料金を比較
- **開発者コンソール** — APIキー管理、利用ログ、月次請求、課金履歴、ウォレット、紹介プログラム

**キーワード**：AI API 日本, LLM API 比較, OpenAI API 代替, Claude API 利用, Gemini API 利用, DeepSeek API, 格安 AI API, 従量課金 API, AIモデル 集約, GPT API 日本語, 画像生成API, 動画生成API, 埋め込みAPI, Vue 3 ダッシュボード, Vite 静的サイト.

---

## 機能

### モデルマーケットプレイス

| 機能 | 内容 |
| --- | --- |
| カテゴリ閲覧 | テキスト・画像・動画・音声・埋め込み。動的に集計 |
| 検索 | モデル名で即時絞り込み |
| ページング | 1ページ60件、APIの総件数に連動 |
| モデル詳細 | `#/models/<modelId>` の固有URL、料金とリクエスト例を表示 |
| サイトマップ | `#/sitemap` で全モデルをカテゴリ別に索引 |

### コンソール（ログイン必須）

| 画面 | 内容 |
| --- | --- |
| 概要 | 残高、利用額、リクエスト数、トークン統計 |
| APIキー | 発行・削除（1アカウント最大10個） |
| 利用ログ | キー・モデル・リクエストID・ステータスで絞り込み |
| 月次請求 | 月別合計と成功率 |
| 課金履歴 | 残高変動の明細 |
| ウォレット | USDT（TRC20）アドレスQR、入金履歴 |
| 紹介プログラム | 招待リンク、QRコード、報酬履歴 |

---

## 技術スタック

| 層 | 技術 |
| --- | --- |
| フレームワーク | Vue 3（Options API） |
| ビルド | Vite 6 |
| スタイル | コンポーネント単位の素のCSS |
| QRコード | qrcode |
| ルーティング | 軽量ハッシュルーター |
| ホスティング | 静的ホスティング（Cloudflare Pages など） |

---

## クイックスタート

```bash
npm install
npm run dev
npm run build
```

ビルドで `dist/`、`dist/sitemap.xml`、`dist/robots.txt` を生成します。

---

## 環境変数

| 変数 | 用途 | 例 |
| --- | --- | --- |
| `VITE_API_BASE` | APIのベースURL | `https://api.325ai.com` |
| `VITE_SITE_ORIGIN` | canonical用ドメイン | `https://325ai.com` |

---

## SEO

- 画面ごとに title / description / canonical を設定
- 構造化データ：Organization、WebSite、Product
- ビルド時に全モデルページの `sitemap.xml` を生成
- `robots.txt` でクロール許可、コンソールは `noindex`
- 見出し構造と内部リンクを最適化

---

## ライセンス

MIT
