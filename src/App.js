import './App.css'
import AuthModal from './components/AuthModal.vue'
import ModelCard from './components/ModelCard.vue'
import Console from './views/Console.vue'
import Docs from './views/Docs.vue'
import ModelDetail from './views/ModelDetail.vue'
import Sitemap from './views/Sitemap.vue'
import { capabilityLabel, fetchCapabilities, fetchModels } from './api'
import { clearAuth, currentUser, getToken, logout } from './auth'
import { setSeo } from './seo'

export default {
  components: { AuthModal, Console, Docs, ModelCard, ModelDetail, Sitemap },
  data() {
    return {
      view: 'plaza',
      modelId: '',
      pendingView: '',
      capabilities: [],
      capability: '',
      keyword: '',
      models: [],
      total: 0,
      loading: false,
      error: '',
      pageNum: 1,
      pageSize: 60,
      user: currentUser(),
      authVisible: false,
      authTab: 'login'
    }
  },
  computed: {
    visible() {
      const word = this.keyword.trim().toLowerCase()
      if (!word) return this.models
      return this.models.filter(item => String(item.modelId).toLowerCase().includes(word))
    },
    totalPages() {
      return Math.max(1, Math.ceil(this.total / this.pageSize))
    }
  },
  mounted() {
    this.loadCapabilities()
    this.load()
    this.applyHash()
    window.addEventListener('hashchange', this.applyHash)
  },
  beforeUnmount() {
    window.removeEventListener('hashchange', this.applyHash)
  },
  methods: {
    async loadCapabilities() {
      try {
        const list = await fetchCapabilities()
        this.capabilities = list.map(item => ({
          key: item.capability,
          label: capabilityLabel(item.capability),
          count: item.count
        }))
      } catch {
        this.capabilities = []
      }
    },
    async load() {
      this.loading = true
      this.error = ''
      try {
        const result = await fetchModels({
          capability: this.capability,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
        this.models = result.list
        this.total = result.total
      } catch (err) {
        this.models = []
        this.total = 0
        this.error = err.message || '接口请求失败'
      } finally {
        this.loading = false
      }
    },
    changeCapability(key) {
      this.capability = key
      this.pageNum = 1
      this.load()
    },
    goPage(next) {
      if (next < 1 || next > this.totalPages) return
      this.pageNum = next
      this.load()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },

    // ---------- 视图与登录守卫 ----------
    applyHash() {
      const hash = window.location.hash || '#/'
      if (hash.startsWith('#/console')) {
        this.goConsole()
        return
      }
      if (hash.startsWith('#/sitemap')) {
        this.setView('sitemap')
        return
      }
      if (hash.startsWith('#/docs')) {
        this.setView('docs')
        return
      }
      if (hash.startsWith('#/models/')) {
        const id = decodeURIComponent(hash.slice('#/models/'.length))
        this.setView('detail', id)
        return
      }
      this.setView('plaza')
    },
    setView(view, modelId) {
      this.view = view
      if (modelId !== undefined) this.modelId = modelId

      const hash = view === 'console' ? '#/console'
        : view === 'sitemap' ? '#/sitemap'
        : view === 'docs' ? '#/docs'
        : view === 'detail' ? `#/models/${encodeURIComponent(this.modelId)}`
        : '#/'

      if (window.location.hash !== hash) {
        window.history.replaceState(null, '', hash)
      }
      window.scrollTo({ top: 0 })
      this.applySeo(view)
    },
    applySeo(view) {
      if (view === 'console') {
        setSeo({
          title: '控制台',
          description: '325聚合模型控制台：令牌、用量、账单与钱包。',
          path: '/#/console',
          noindex: true
        })
        return
      }
      if (view === 'sitemap' || view === 'detail' || view === 'docs') {
        return // 由对应页面设置
      }
      setSeo({
        title: '模型广场',
        description: '325聚合模型：文本、图像、视频、音频、向量模型统一 API，按量计费。',
        path: '/',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: '325聚合模型',
          url: 'https://325ai.com/'
        }
      })
    },
    goPlaza() {
      this.setView('plaza')
    },
    goConsole() {
      if (!getToken() || !this.user) {
        this.pendingView = 'console'
        this.authTab = 'login'
        this.authVisible = true
        return
      }
      this.setView('console')
    },

    openAuth(tab) {
      this.authTab = tab
      this.pendingView = ''
      this.authVisible = true
    },
    handleAuthSuccess(data) {
      this.user = data || currentUser()
      this.authVisible = false
      if (this.pendingView) {
        this.setView(this.pendingView)
        this.pendingView = ''
      }
    },
    async doLogout() {
      try {
        const token = getToken()
        if (token) await logout(token)
      } catch {
        // 忽略退出接口失败
      } finally {
        clearAuth()
        this.user = null
        this.setView('plaza')
      }
    }
  }
}
