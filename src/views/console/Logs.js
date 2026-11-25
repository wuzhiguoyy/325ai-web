import './Logs.css'
import { capabilityLabel, fetchCapabilities, fetchTokens, fetchUsageLogs } from '../../api'
import { getToken } from '../../auth'

function today(offsetDays = 0) {
  const date = new Date()
  date.setDate(date.getDate() + offsetDays)
  return date.toISOString().slice(0, 10)
}

export default {
  data() {
    return {
      filter: { tokenId: '', capability: '', model: '', requestId: '', taskId: '', status: '' },
      start: today(-6),
      end: today(0),
      rows: [],
      total: 0,
      page: 1,
      pageSize: 20,
      tokens: [],
      capabilities: [],
      loading: false,
      error: ''
    }
  },
  computed: {
    totalPages() {
      return Math.max(1, Math.ceil(this.total / this.pageSize))
    }
  },
  async mounted() {
    await Promise.all([this.loadTokens(), this.loadCapabilities()])
    await this.query()
  },
  methods: {
    capabilityLabel,
    async loadTokens() {
      try {
        const list = await fetchTokens(getToken())
        this.tokens = Array.isArray(list) ? list : []
      } catch {
        this.tokens = []
      }
    },
    async loadCapabilities() {
      try {
        const list = await fetchCapabilities()
        this.capabilities = list.map(item => ({
          key: item.capability,
          label: capabilityLabel(item.capability)
        }))
      } catch {
        this.capabilities = []
      }
    },
    async query() {
      this.page = 1
      await this.load()
    },
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
        if (this.filter.tokenId) payload.tokenId = this.filter.tokenId
        if (this.filter.capability) payload.capability = this.filter.capability
        if (this.filter.model) payload.model = this.filter.model
        if (this.filter.requestId) payload.requestId = this.filter.requestId
        if (this.filter.taskId) payload.taskId = this.filter.taskId
        if (this.filter.status !== '') payload.status = this.filter.status

        const result = await fetchUsageLogs(payload)
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
    async goPage(next) {
      if (next < 1 || next > this.totalPages) return
      this.page = next
      await this.load()
    },
    reset() {
      this.filter = { tokenId: '', capability: '', model: '', requestId: '', taskId: '', status: '' }
      this.start = today(-6)
      this.end = today(0)
      this.page = 1
      this.pageSize = 20
      this.load()
    },
    formatTime(value) {
      return value ? String(value).replace('T', ' ').slice(0, 19) : '-'
    }
  }
}
