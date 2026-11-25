import './Invite.css'
import { fetchInvitees, fetchInviteInfo, fetchInviteRewards } from '../../api'
import { getToken } from '../../auth'

export default {
  props: {
    user: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      info: {},
      invitees: [],
      rewards: [],
      total: 0,
      tab: 'invitees',
      keyword: '',
      copied: false,
      loading: false
    }
  },
  computed: {
    ratePercent() {
      const rate = Number(this.info.commissionRate || 0)
      return Math.round(rate * 100)
    },
    visibleInvitees() {
      const word = this.keyword.trim().toLowerCase()
      if (!word) {
        return this.invitees
      }
      return this.invitees.filter(item => String(item.email || '').toLowerCase().includes(word))
    }
  },
  async mounted() {
    await this.loadInfo()
    await this.loadInvitees()
  },
  methods: {
    async loadInfo() {
      try {
        this.info = await fetchInviteInfo(getToken())
      } catch {
        this.info = {}
      }
    },
    async loadInvitees() {
      this.loading = true
      try {
        const result = await fetchInvitees({ token: getToken(), pageNum: 1, pageSize: 100 })
        this.invitees = result.list || []
        this.total = Number(result.totalCount || 0)
      } catch {
        this.invitees = []
        this.total = 0
      } finally {
        this.loading = false
      }
    },
    async switchTab(tab) {
      this.tab = tab
      if (tab === 'rewards' && !this.rewards.length) {
        await this.loadRewards()
      }
    },
    async loadRewards() {
      this.loading = true
      try {
        const result = await fetchInviteRewards({ token: getToken(), pageNum: 1, pageSize: 100 })
        this.rewards = result.list || []
        this.total = Number(result.totalCount || 0)
      } catch {
        this.rewards = []
        this.total = 0
      } finally {
        this.loading = false
      }
    },
    async copyLink() {
      if (!this.info.link) {
        return
      }
      try {
        await navigator.clipboard.writeText(this.info.link)
      } catch {
        const input = document.createElement('textarea')
        input.value = this.info.link
        document.body.appendChild(input)
        input.select()
        document.execCommand('copy')
        document.body.removeChild(input)
      }
      this.copied = true
      setTimeout(() => { this.copied = false }, 1500)
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
