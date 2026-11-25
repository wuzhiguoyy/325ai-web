import './Bills.css'
import { exportBill, fetchBillSummary, fetchBills } from '../../api'
import { getToken } from '../../auth'

const STATUS_LABELS = {
  GENERATED: '已出账',
  PAID: '已支付',
  VOID: '已作废'
}

export default {
  data() {
    return {
      month: '',
      rows: [],
      total: 0,
      page: 1,
      pageSize: 20,
      summary: {},
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
    await Promise.all([this.loadSummary(), this.load()])
  },
  methods: {
    async loadSummary() {
      try {
        this.summary = await fetchBillSummary(getToken())
      } catch {
        this.summary = {}
      }
    },
    async load() {
      this.loading = true
      this.error = ''
      try {
        const payload = {
          token: getToken(),
          pageNum: this.page,
          pageSize: this.pageSize
        }
        if (this.month) {
          payload.month = this.month
        }
        const result = await fetchBills(payload)
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
      this.month = ''
      this.page = 1
      this.load()
    },
    goPage(next) {
      if (next < 1 || next > this.totalPages) return
      this.page = next
      this.load()
    },
    async download(bill) {
      try {
        const blob = await exportBill(getToken(), bill.billNo)
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = `${bill.billMonth}-账单.csv`
        link.click()
        URL.revokeObjectURL(link.href)
      } catch (err) {
        this.error = err.message || '导出失败'
      }
    },
    statusLabel(status) {
      return STATUS_LABELS[status] || status
    },
    money(value) {
      const number = Number(value)
      return Number.isFinite(number) ? number.toFixed(2) : '0.00'
    },
    formatTime(value) {
      return value ? String(value).replace('T', ' ').slice(0, 16) : '-'
    }
  }
}
