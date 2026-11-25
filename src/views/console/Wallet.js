import './Wallet.css'
import QRCode from 'qrcode'
import {
  createRecharge,
  fetchAccount,
  fetchRechargeOrders,
  fetchRechargeRecords,
  fetchUsdtAddress
} from '../../api'
import { getToken } from '../../auth'

export default {
  data() {
    return {
      balance: 0,
      address: '',
      qrDataUrl: '',
      amount: 100,
      presets: [50, 100, 200, 500, 1000],
      copied: false,
      creating: '',
      error: '',
      notice: '',
      records: [],
      orders: [],
      total: 0,
      loading: false
    }
  },
  async mounted() {
    await Promise.all([this.loadAccount(), this.loadOrders(), this.loadRecords()])
  },
  methods: {
    async loadAccount() {
      try {
        const account = await fetchAccount(getToken())
        this.balance = Number(account.balance || 0)
        if (account.usdtAddress) {
          this.address = account.usdtAddress
        }
      } catch {
        this.balance = 0
      }
      await this.loadUsdtAddress()
    },
    async loadUsdtAddress() {
      if (this.address) {
        await this.renderQr()
        return
      }
      try {
        const result = await fetchUsdtAddress(getToken())
        if (result && result.address) {
          this.address = result.address
          if (result.qrCode) {
            this.qrDataUrl = result.qrCode
          } else {
            await this.renderQr()
          }
        }
      } catch {
        // 地址池未配置时保持空，页面显示提示
      }
    },
    async loadOrders() {
      try {
        const result = await fetchRechargeOrders({
          token: getToken(),
          status: 'PENDING',
          pageNum: 1,
          pageSize: 10
        })
        this.orders = result.list || []
      } catch {
        this.orders = []
      }
    },
    async loadRecords() {
      this.loading = true
      try {
        const result = await fetchRechargeRecords({ token: getToken(), pageNum: 1, pageSize: 20 })
        this.records = result.list || []
        this.total = Number(result.totalCount || 0)
      } catch {
        this.records = []
        this.total = 0
      } finally {
        this.loading = false
      }
    },
    async submit(channel) {
      this.error = ''
      this.notice = ''
      if (!this.amount || Number(this.amount) < 1) {
        this.error = '充值金额至少 1 美元'
        return
      }
      this.creating = channel
      try {
        const order = await createRecharge(getToken(), channel, Number(this.amount))
        if (order.address) {
          this.address = order.address
          await this.renderQr()
        }
        this.notice = `订单已创建：${order.orderNo}，应付 ${order.payAmount} ${order.payCurrency}`
        await Promise.all([this.loadOrders(), this.loadRecords()])
      } catch (err) {
        this.error = err.message || '创建订单失败'
      } finally {
        this.creating = ''
      }
    },
    async renderQr() {
      if (!this.address) {
        return
      }
      this.qrDataUrl = await QRCode.toDataURL(this.address, {
        width: 220,
        margin: 1,
        color: { dark: '#0f172a', light: '#ffffff' }
      })
    },
    async copyText(text) {
      if (!text) {
        return
      }
      try {
        await navigator.clipboard.writeText(text)
      } catch {
        const input = document.createElement('textarea')
        input.value = text
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
