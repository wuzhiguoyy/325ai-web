import './Console.css'
import { fetchAccount } from '../api'
import { getToken } from '../auth'
import Bills from './console/Bills.vue'
import EmptyPage from './console/EmptyPage.vue'
import Flows from './console/Flows.vue'
import Invite from './console/Invite.vue'
import Logs from './console/Logs.vue'
import Overview from './console/Overview.vue'
import Settings from './console/Settings.vue'
import Tokens from './console/Tokens.vue'
import Wallet from './console/Wallet.vue'

export default {
  components: { Bills, EmptyPage, Flows, Invite, Logs, Overview, Settings, Tokens, Wallet },
  props: {
    user: { type: Object, default: () => ({}) },
    modelCount: { type: Number, default: 0 },
    models: { type: Array, default: () => [] }
  },
  emits: ['back', 'logout'],
  mounted() {
    this.loadAccount()
  },
  data() {
    return {
      active: 'overview',
      balance: 0,
      menus: [
        { key: 'overview', label: '概览' },
        { key: 'tokens', label: '令牌管理' },
        { key: 'logs', label: '使用日志' },
        { key: 'bills', label: '每月账单' },
        { key: 'flows', label: '计费流水' },
        { key: 'wallet', label: '我的钱包' },
        { key: 'invite', label: '分享赚钱' },
        { key: 'settings', label: '个人设置' }
      ]
    }
  },
  computed: {
    currentLabel() {
      const item = this.menus.find(menu => menu.key === this.active)
      return item ? item.label : '控制台'
    },
    currentDesc() {
      const map = {
        tokens: '创建和吊销 API 令牌，令牌用于调用 325聚合模型。',
        logs: '查看每次调用的模型、耗时与消耗。',
        bills: '按月汇总消费，支持导出对账单。',
        flows: '逐笔计费流水，含预扣与结算。',
        settings: '修改密码、绑定邮箱、注销账号。'
      }
      return map[this.active] || '功能开发中。'
    },
    currentAction() {
      return this.active === 'tokens' ? '新建令牌' : ''
    }
  },
  methods: {
    switchTo(key) {
      this.active = key
      if (key === 'wallet' || key === 'overview') {
        this.loadAccount()
      }
    },
    async loadAccount() {
      try {
        const account = await fetchAccount(getToken())
        this.balance = Number(account.balance || 0)
      } catch {
        this.balance = 0
      }
    }
  }
}
