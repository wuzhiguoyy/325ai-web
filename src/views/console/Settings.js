import './Settings.css'
import { changePassword } from '../../api'
import { getToken } from '../../auth'

const IP_KEY = 'pp_log_ip'

export default {
  props: {
    user: { type: Object, default: () => ({}) }
  },
  emits: ['logout'],
  data() {
    return {
      storeIp: localStorage.getItem(IP_KEY) === '1',
      changing: false,
      saving: false,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      error: '',
      success: ''
    }
  },
  watch: {
    storeIp(value) {
      localStorage.setItem(IP_KEY, value ? '1' : '0')
    }
  },
  methods: {
    openPassword() {
      this.oldPassword = ''
      this.newPassword = ''
      this.confirmPassword = ''
      this.error = ''
      this.success = ''
      this.changing = true
    },
    closePassword() {
      this.changing = false
    },
    async submit() {
      this.error = ''
      this.success = ''

      if (!this.oldPassword) {
        this.error = '请填写原密码'
        return
      }
      if (!this.newPassword || this.newPassword.length < 8) {
        this.error = '新密码至少 8 位'
        return
      }
      if (this.newPassword !== this.confirmPassword) {
        this.error = '两次输入的新密码不一致'
        return
      }

      this.saving = true
      try {
        await changePassword(getToken(), this.oldPassword, this.newPassword)
        this.success = '密码修改成功'
        this.oldPassword = ''
        this.newPassword = ''
        this.confirmPassword = ''
      } catch (err) {
        this.error = err.message || '修改失败'
      } finally {
        this.saving = false
      }
    }
  }
}
