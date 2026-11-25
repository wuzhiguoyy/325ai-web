<div align="center">

# 325聚合模型 · 模型广场与控制台

**一个 API 调用文本、图像、视频、音频、向量模型 · 按量计费 · 价格透明**

Vue 3 · Vite · 纯静态部署 · 自带 SEO（sitemap / robots / JSON-LD）

[![Vue](https://img.shields.io/badge/Vue-3.5-42b883)](https://vuejs.org)
[![Vite](https://img.shields.io/badge/Vite-6-646cff)](https://vitejs.dev)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

</div>

---

## 项目简介

**325聚合模型**前端站点，包含 **模型广场** 与 **用户控制台** 两部分：

- 模型广场：按能力分类浏览 300+ AI 模型，查看价格、上下文与接入方式
- 用户控制台：令牌管理、使用日志、每月账单、计费流水、钱包、分享赚钱、个人设置

**关键词**：AI 模型 API、大模型中转、模型聚合平台、GPT API、Claude API、Gemini API、DeepSeek API、按量计费、模型广场、Vue3 控制台、Vite 静态站点、SEO 单页应用。

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
| 概览 | 余额、消费、请求数、Token 统计；模型跑马灯 |
| 令牌管理 | 创建、复制、删除 API 令牌（上限 10 个） |
| 使用日志 | 按令牌、模型、请求 ID、状态筛选 |
| 每月账单 | 月度汇总与成功请求比例 |
| 计费流水 | 逐笔明细，含类型标签 |
| 我的钱包 | USDT（TRC20）地址二维码、在线充值、充值记录 |
| 分享赚钱 | 邀请链接、二维码、返佣记录 |
| 个人设置 | 邮箱、密码、IP 记录开关 |

### 账号

邮箱注册 / 登录 / 退出，登录态保存在浏览器本地存储。

---

## 技术栈

| 层 | 技术 |
| --- | --- |
| 框架 | Vue 3（选项式 API） |
| 构建 | Vite 6 |
| 样式 | 原生 CSS，按组件拆分 |
| 二维码 | qrcode |
| 路由 | 轻量 hash 路由（无需 vue-router） |
| 部署 | 静态托管（Cloudflare Pages 等） |

---

## 快速开始

```bash
npm install
npm run dev
```

打开 `http://localhost:5173/`。

构建：

```bash
npm run build
```

构建会先打包，再生成 `dist/sitemap.xml` 与 `dist/robots.txt`。

---

## 环境变量

| 变量 | 作用 | 示例 |
| --- | --- | --- |
| `VITE_API_BASE` | 接口地址前缀 | `https://api.325ai.com` |
| `VITE_PROXY_TARGET` | 开发代理目标 | `https://api.325ai.com` |
| `VITE_SITE_ORIGIN` | 站点域名（canonical 用） | `https://325ai.com` |

---

## 目录结构

```text
src/
├── api.js              接口封装
├── auth.js             注册/登录/登出与登录态
├── seo.js              标题、描述、canonical、JSON-LD
├── styles.css          全局变量与重置
├── App.vue/.js/.css    模型广场 + 路由 + 登录守卫
├── components/
│   ├── AuthModal.*     登录注册弹窗
│   └── ModelCard.*     模型卡片
└── views/
    ├── Sitemap.*       网站地图
    ├── ModelDetail.*   模型详情
    ├── Console.*       控制台框架
    └── console/        控制台各页面
scripts/gen-sitemap.mjs 构建期生成 sitemap
public/robots.txt       抓取规则
```

> 约定：每个组件拆成 `.vue`（模板）+ `.js`（逻辑）+ `.css`（样式）三个文件。

---

## SEO

| 项 | 实现 |
| --- | --- |
| 站点元信息 | title / description / keywords / canonical / OG / Twitter |
| 页面级 SEO | 每个视图动态设置标题与描述 |
| 结构化数据 | Organization、WebSite、Product（模型详情） |
| 站点地图 | `sitemap.xml` 构建时生成，包含全部模型 |
| 抓取规则 | `robots.txt` 允许全站抓取 |
| 控制台 | `noindex`，避免被搜索引擎收录 |

**已知限制**：当前使用 hash 路由（`#/models/xxx`），搜索引擎可抓取但权重低于真实路径；后续可切换 history 路由并配合部署回退。

---

## 部署

### Cloudflare Pages

```
构建命令：npm run build
输出目录：dist
环境变量：VITE_API_BASE=https://api.325ai.com
          VITE_SITE_ORIGIN=https://325ai.com
```

绑定自定义域后，在 Google Search Console / Bing Webmaster 提交 `sitemap.xml`。

### 其他静态托管

把 `dist/` 上传即可；若使用 history 路由，需要配置回退到 `index.html`。

---

## 路线图

- [ ] history 路由 + 预渲染
- [ ] 模型详情静态化（每个模型独立 HTML）
- [ ] 英文站点与 hreflang

---

## License

MIT
