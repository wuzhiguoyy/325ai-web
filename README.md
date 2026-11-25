<div align="center">

# 325 聚合模型 · 模型广场与控制台

**一个 API 调用文本、图像、视频、音频、向量模型 · 按量计费 · 价格透明**

Vue 3 · Vite · 纯静态部署 · 自带 SEO（sitemap / robots / JSON-LD）

[中文](README.md) · [English](README.en.md) · [Deutsch](README.de.md) · [日本語](README.ja.md) · [Africa](README.af.md)

</div>

---

## 项目简介

**325聚合模型**前端站点，包含 **模型广场** 与 **用户控制台**：

- 模型广场：按能力分类浏览 AI 模型，查看价格、上下文与接入方式
- 用户控制台：令牌管理、使用日志、每月账单、计费流水、钱包、分享赚钱、个人设置

**关键词**：AI 模型 API、大模型中转、模型聚合平台、GPT API、Claude API、Gemini API、按量计费、模型广场、Vue3 控制台、Vite 静态站点、SEO 单页应用。

---

## 功能

### 模型广场

| 能力 | 说明 |
| --- | --- |
| 分类筛选 | 分类动态聚合；文本 / 图像 / 视频 / 音频 / 向量 |
| 搜索 | 按模型名实时过滤 |
| 分页 | 每页 60 条，按接口总数翻页 |
| 模型详情 | 独立地址 `#/models/<modelId>`，含计费与调用示例 |
| 站点地图 | `#/sitemap`，按分类索引全部模型 |

### 控制台（需登录）

| 页面 | 说明 |
| --- | --- |
| 概览 | 余额、消费、请求数、Token 统计 |
| 令牌管理 | 创建、删除 API 令牌（上限 10 个） |
| 使用日志 | 按令牌、模型、请求 ID、状态筛选 |
| 每月账单 | 月度汇总与成功请求比例 |
| 计费流水 | 逐笔明细 |
| 我的钱包 | USDT（TRC20）地址二维码、充值记录 |
| 分享赚钱 | 邀请链接、二维码、返佣记录 |
| 个人设置 | 邮箱、密码、IP 记录开关 |

---

## 技术栈

| 层 | 技术 |
| --- | --- |
| 框架 | Vue 3（选项式 API） |
| 构建 | Vite 6 |
| 样式 | 原生 CSS，按组件拆分 |
| 二维码 | qrcode |
| 路由 | 轻量 hash 路由 |
| 部署 | 静态托管（Cloudflare Pages 等） |

---

## 快速开始

```bash
npm install
npm run dev
npm run build
```

构建会生成 `dist/` 与 `dist/sitemap.xml`、`dist/robots.txt`。

---

## 环境变量

| 变量 | 作用 | 示例 |
| --- | --- | --- |
| `VITE_API_BASE` | 接口地址前缀 | `https://api.325ai.com` |
| `VITE_SITE_ORIGIN` | 站点域名（canonical） | `https://325ai.com` |

---

## SEO

- 每个视图独立 title / description / canonical
- 结构化数据：Organization、WebSite、Product
- `sitemap.xml` 构建时生成，覆盖全部模型详情页
- `robots.txt` 允许全站抓取
- 控制台 `noindex`

---

## License

MIT
