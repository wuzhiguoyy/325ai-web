import './Sitemap.css'
import { capabilityLabel, fetchAllModels, fetchCapabilities } from '../api'
import { setSeo } from '../seo'

export default {
  data() {
    return {
      models: [],
      capabilities: [],
      loading: false,
      error: ''
    }
  },
  computed: {
    groups() {
      const map = new Map()
      for (const model of this.models) {
        const key = model.capability || 'other'
        if (!map.has(key)) {
          map.set(key, { key, label: capabilityLabel(key), models: [] })
        }
        map.get(key).models.push(model)
      }
      return Array.from(map.values()).sort((a, b) => a.key.localeCompare(b.key))
    }
  },
  async mounted() {
    setSeo({
      title: '网站地图',
      description: '325聚合模型站点地图：全部模型、能力分类与控制台入口。',
      path: '/#/sitemap',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: '325聚合模型',
        url: 'https://325ai.com/'
      }
    })

    this.loading = true
    try {
      const [models, caps] = await Promise.all([
        fetchAllModels(),
        fetchCapabilities()
      ])
      this.models = models
      this.capabilities = caps.map(item => ({
        key: item.capability,
        label: capabilityLabel(item.capability),
        count: item.count
      }))
    } catch (err) {
      this.error = err.message || '加载失败'
    } finally {
      this.loading = false
    }
  }
}
