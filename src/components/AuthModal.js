import './AuthModal.css'
import { login, register, saveAuth, sendCode } from '../auth'

export default {
  props: {
    visible: { type: Boolean, default: false },
    initialTab: { type: String, default: 'login' }
  },
  emits: ['close', 'success'],
  data() {
    const inviteCode = new URLSearchParams(window.location.search).get('invite') || ''
    return {
      tab: this.initialTab,
      email: '',
      password: '',
      code: '',
      inviteCode,
      error: '',
      loading: false,
      sending: false,
      countdown: 0,
      timer: null
    }
  },
  computed: {
    counting() {
      return this.countdown > 0
    }
  },
  watch: {
    initialTab(value) {
      this.tab = value
    },
    visible(value) {
      if (value) {
        this.error = ''
      }
    }
  },
  beforeUnmount() {
    if (this.timer) clearInterval(this.timer)
  },
  methods: {
    switchTab(tab) {
      this.tab = tab
      this.error = ''
    },
    async handleSendCode() {
      if (!this.email) {
        this.error = '请先填写邮箱'
        return
      }
      this.sending = true
      this.error = ''
      try {
        await sendCode(this.email, this.tab)
        this.startCountdown()
      } catch (err) {
        this.error = err.message
      } finally {
        this.sending = false
      }
    },
    startCountdown() {
      this.countdown = 60
      if (this.timer) clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.countdown -= 1
        if (this.countdown <= 0) {
          clearInterval(this.timer)
          this.timer = null
        }
      }, 1000)
    },
    async submit() {
      if (!this.email || !this.password) {
        this.error = '请填写邮箱和密码'
        return
      }
      if (this.tab === 'register' && !this.code) {
        this.error = '请填写邮箱验证码'
        return
      }

      this.loading = true
      this.error = ''
      try {
        const data = this.tab === 'login'
          ? await login(this.email, this.password)
          : await register(this.email, this.password, this.code, this.inviteCode)
        saveAuth(data)
        this.$emit('success', data)
        this.$emit('close')
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  }
}
