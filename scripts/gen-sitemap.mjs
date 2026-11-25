#!/usr/bin/env node
/**
 * 生成 sitemap.xml。
 *
 * 用法：
 *   node scripts/gen-sitemap.mjs
 *   API_BASE=https://api.325ai.com SITE_ORIGIN=https://325ai.com node scripts/gen-sitemap.mjs
 */
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const API_BASE = (process.env.API_BASE || 'https://api.325ai.com').replace(/\/$/, '')
const SITE_ORIGIN = (process.env.SITE_ORIGIN || 'https://325ai.com').replace(/\/$/, '')

const STATIC_PAGES = [
  { path: '/', priority: '1.0' },
  { path: '/#/sitemap', priority: '0.8' }
]

async function fetchPage(pageNum, pageSize) {
  const response = await fetch(`${API_BASE}/api/paypal/models?pageNum=${pageNum}&pageSize=${pageSize}`)
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  const data = await response.json()
  const list = Array.isArray(data) ? data : (data.list || [])
  const total = Array.isArray(data) ? data.length : Number(data.totalCount || list.length)
  return { list, total }
}

async function fetchModels() {
  const pageSize = 200
  const first = await fetchPage(1, pageSize)
  const pages = Math.ceil(first.total / pageSize)
  if (pages <= 1) return first.list

  const rest = await Promise.all(
    Array.from({ length: pages - 1 }, (_, index) => fetchPage(index + 2, pageSize))
  )
  return first.list.concat(...rest.map(item => item.list))
}

function url(path, priority, changefreq = 'weekly') {
  return `  <url>\n    <loc>${SITE_ORIGIN}${path}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
}

async function main() {
  let models = []
  try {
    models = await fetchModels()
  } catch (error) {
    console.warn(`[sitemap] 模型接口不可用（${error.message}），仅生成静态页`)
  }

  const entries = STATIC_PAGES.map(item => url(item.path, item.priority))
  for (const model of models) {
    const id = encodeURIComponent(model.modelId)
    entries.push(url(`/#/models/${id}`, '0.6'))
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`
  writeFileSync(resolve('public/sitemap.xml'), xml, 'utf8')
  console.log(`[sitemap] 写入 public/sitemap.xml，共 ${entries.length} 条`)
}

main()
