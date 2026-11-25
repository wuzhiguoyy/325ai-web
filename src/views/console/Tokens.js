import './Tokens.css'
import { createToken, deleteToken, fetchTokens } from '../../api'
import { getToken } from '../../auth'

export default {
  emits: ['logout'],
  data() {
    return {
      tokens: [],
      loading: false,
      error: '',
      creating: false,
      saving: false,
      deleting: '',
      name: '',
      createError: '',
      newToken: null,
      copiedNew: false
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    async load() {
      const token = getToken()
      if (!token) {
        this.error = '登录已失效，请重新登录'
        return
      }
      this.loading = true
      this.error = ''
      try {
        const list = await fetchTokens(token)
        this.tokens = Array.isArray(list) ? list : []
      } catch (err) {
        this.error = err.message || '加载失败'
      } finally {
        this.loading = false
      }
    },
    openCreate() {
      this.name = ''
      this.createError = ''
      this.creating = true
    },
    async create() {
      if (!this.name) {
        this.createError = '请填写令牌名称'
        return
      }
      this.saving = true
      this.createError = ''
      try {
        const result = await createToken(getToken(), this.name)
        this.creating = false
        this.newToken = result.token
        await this.load()
      } catch (err) {
        this.createError = err.message || '创建失败'
      } finally {
        this.saving = false
      }
    },
    async remove(id) {
      this.error = ''
      this.deleting = id
      try {
        await deleteToken(getToken(), String(id))
      } catch (err) {
        this.error = err.message || '删除失败'
        this.deleting = ''
        return
      }
      this.deleting = ''
      await this.load()
    },
    mask(prefix) {
      return prefix ? `${prefix}••••••` : 'sk-325-••••••'
    },
    formatTime(value) {
      return value ? String(value).replace('T', ' ').slice(0, 16) : '-'
    },
    async copyNew() {
      await this.writeClipboard(this.newToken)
      this.copiedNew = true
      setTimeout(() => { this.copiedNew = false }, 1500)
    },
    async writeClipboard(text) {
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
    }
  }
}
