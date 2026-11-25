import './ModelCard.css'

const LABELS = { text: '文本', image: '图像', video: '视频', audio: '语音' }

export default {
  props: {
    model: { type: Object, required: true }
  },
  data() {
    return { showFallback: false }
  },
  computed: {
    initial() {
      return (this.model.modelId || '?').slice(0, 1).toUpperCase()
    },
    capabilityLabel() {
      return LABELS[this.model.capability] || this.model.capability || '未知'
    },
    contextLabel() {
      const number = Number(this.model.maxContext)
      if (!number) return ''
      if (number >= 1000000) return `${(number / 1000000).toFixed(number % 1000000 === 0 ? 0 : 1)}M`
      if (number >= 1000) return `${Math.round(number / 1000)}K`
      return String(number)
    }
  }
}
