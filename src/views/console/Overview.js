import './Overview.css'
import { fetchUsageRanking, fetchUsageSummary, fetchUsageTrend } from '../../api'
import { getToken } from '../../auth'

function today(offsetDays = 0) {
  const date = new Date()
  date.setDate(date.getDate() + offsetDays)
  return date.toISOString().slice(0, 10)
}

export default {
  props: {
    user: { type: Object, default: () => ({}) },
    balance: { type: Number, default: 0 },
    modelCount: { type: Number, default: 0 },
    models: { type: Array, default: () => [] }
  },
  emits: ['go'],
  data() {
    return {
      mode: 'cost',
      start: today(-6),
      end: today(0),
      summary: {},
      trend: [],
      ranking: [],
      loading: false
    }
  },
  computed: {
    loopModels() {
      const source = this.models.slice(0, 12)
      const list = source.length ? source : [{ modelId: '325聚合模型' }]
      return [...list, ...list].map((item, index) => ({
        key: `${item.modelId}-${index}`,
        modelId: item.modelId,
        initial: String(item.modelId || '?').slice(0, 1).toUpperCase()
      }))
    },
    maxTrend() {
      return this.trend.reduce((max, point) => {
        const value = this.mode === 'cost' ? Number(point.cost || 0) : Number(point.tokens || 0)
        return Math.max(max, value)
      }, 0)
    }
  },
  mounted() {
    this.loadAll()
  },
  methods: {
    async loadAll() {
      const token = getToken()
      if (!token) {
        return
      }
      this.loading = true
      try {
        const [summary, trend, ranking] = await Promise.all([
          fetchUsageSummary({ token, start: this.start, end: this.end }),
          fetchUsageTrend({ token, start: this.start, end: this.end }),
          fetchUsageRanking({ token, start: this.start, end: this.end })
        ])
        this.summary = summary || {}
        this.trend = Array.isArray(trend) ? trend : []
        this.ranking = Array.isArray(ranking) ? ranking : []
      } catch {
        this.summary = {}
        this.trend = []
        this.ranking = []
      } finally {
        this.loading = false
      }
    },
    barHeight(point) {
      const value = this.mode === 'cost' ? Number(point.cost || 0) : Number(point.tokens || 0)
      if (!this.maxTrend || !value) {
        return '2px'
      }
      return Math.max(4, Math.round(value / this.maxTrend * 120)) + 'px'
    },
    tip(point) {
      return this.mode === 'cost'
        ? `${point.date}  $${this.money(point.cost)}`
        : `${point.date}  ${point.tokens} tokens`
    },
    money(value) {
      const number = Number(value)
      return Number.isFinite(number) ? number.toFixed(2) : '0.00'
    }
  }
}
