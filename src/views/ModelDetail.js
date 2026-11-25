import './ModelDetail.css'
import { capabilityLabel, fetchModelDetail } from '../api'
import { setSeo } from '../seo'

const LABELS = { text: '文本对话', image: '图像生成', video: '视频生成', audio: '音频', embedding: '向量嵌入' }

export default {
  props: {
    modelId: { type: String, required: true }
  },
  data() {
    return { model: null, loading: false }
  },
  computed: {
    capabilityLabel() {
      return capabilityLabel(this.model?.capability)
    },
    contextLabel() {
      const number = Number(this.model?.maxContext)
      if (!number) return ''
      if (number >= 1000000) return `${(number / 1000000).toFixed(number % 1000000 === 0 ? 0 : 1)}M`
      if (number >= 1000) return `${Math.round(number / 1000)}K`
      return String(number)
    },
    priceText() {
      const model = this.model
      if (!model) return '-'
      if (model.perCallPrice) return `$${this.formatPrice(model.perCallPrice)} / 次`
      if (model.inputPricePerM || model.outputPricePerM) {
        return `$${this.formatPrice(model.inputPricePerM)} 输入 / $${this.formatPrice(model.outputPricePerM)} 输出（每百万 token）`
      }
      if (model.unitPrice != null) return `$${this.formatPrice(model.unitPrice)}`
      return '价格请咨询'
    },
    summary() {
      const label = LABELS[this.model?.capability] || this.model?.capability || '模型'
      return `${this.model.modelId} 是 325聚合模型提供的${label}模型，可通过统一 API 调用，按实际用量计费。`
    },
    schemaRows() {
      const schema = this.model?.apiSchema
      if (!schema || typeof schema !== 'object') return []
      const source = schema.properties && typeof schema.properties === 'object' ? schema.properties : schema
      return Object.keys(source).map(name => {
        const item = source[name] || {}
        const desc = item.description || item.type || ''
        return { name, desc: typeof desc === 'string' ? desc : String(desc) }
      })
    },
    sample() {
      return `curl https://api.325ai.com/api/paypal/chat \\
  -H "Authorization: Bearer $KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"${this.modelId}","instruction":"你好"}'`
    }
  },
  async mounted() {
    this.loading = true
    try {
      this.model = await fetchModelDetail(this.modelId)
    } finally {
      this.loading = false
    }

    setSeo({
      title: this.model ? `${this.model.modelId} 价格与接入` : `${this.modelId} 未找到`,
      description: this.model
        ? (this.model.description || `${this.model.modelId}：${this.summary} 支持统一 API 接入，按量计费。`)
        : '未找到该模型',
      path: `/#/models/${encodeURIComponent(this.modelId)}`,
      jsonLd: this.model
        ? {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: this.model.modelId,
            description: this.model.description || this.summary,
            brand: { '@type': 'Brand', name: '325聚合模型' },
            offers: {
              '@type': 'Offer',
              priceCurrency: 'USD',
              price: this.model.perCallPrice || this.model.inputPricePerM || this.model.unitPrice || '0',
              availability: 'https://schema.org/InStock'
            }
          }
        : undefined
    })
  },
  methods: {
    formatPrice(value) {
      const number = Number(value)
      if (!Number.isFinite(number)) return '-'
      return number >= 1 ? number.toFixed(2) : number.toFixed(4).replace(/0+$/, '').replace(/\.$/, '')
    }
  }
}
