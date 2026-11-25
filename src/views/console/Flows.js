import './Flows.css'
import { fetchAccountFlows } from '../../api'
import { getToken } from '../../auth'

const TYPE_LABELS = {
  recharge: '充值',
  consume: '消费',
  refund: '退款',
  gift: '赠送',
  adjust: '调整'
}

function today(offsetDays = 0) {
  const date = new Date()
  date.setDate(date.getDate() + offsetDays)
  return date.toISOString().slice(0, 10)
}

export default {
  data() {
    return {
      type: '',
      start: today(-29),
      end: today(0),
      rows: [],
      total: 0,
      page: 1,
      pageSize: 20,
      loading: false,
      error: ''
    }
  },
  computed: {
    totalPages() {
      return Math.max(1, Math.ceil(this.total / this.pageSize))
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    async load() {
      this.loading = true
      this.error = ''
      try {
        const payload = {
          token: getToken(),
          start: this.start,
          end: this.end,
          pageNum: this.page,
          pageSize: this.pageSize
        }
        if (this.type) {
          payload.type = this.type
        }
        const result = await fetchAccountFlows(payload)
        this.rows = result.list || []
        this.total = Number(result.totalCount || 0)
      } catch (err) {
        this.rows = []
        this.total = 0
        this.error = err.message || '加载失败'
      } finally {
        this.loading = false
      }
    },
    query() {
      this.page = 1
      this.load()
    },
    reset() {
      this.type = ''
      this.start = today(-29)
      this.end = today(0)
      this.page = 1
      this.pageSize = 20
      this.load()
    },
    async goPage(next) {
      if (next < 1 || next > this.totalPages) return
      this.page = next
      await this.load()
    },
    typeLabel(type) {
      return TYPE_LABELS[type] || type
    },
    money(value) {
      const number = Number(value)
      return Number.isFinite(number) ? number.toFixed(2) : '0.00'
    },
    formatTime(value) {
      return value ? String(value).replace('T', ' ').slice(0, 19) : '-'
    }
  }
}
