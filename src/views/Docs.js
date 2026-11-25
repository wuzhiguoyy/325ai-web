import './Docs.css'
import { setSeo } from '../seo'

export default {
  data() {
    return {
      // 对外只展示公共 API 域名，真实后端地址由 Nginx 转发，不在前端暴露
      baseUrl: 'https://api.325ai.com'
    }
  },
  mounted() {
    setSeo({
      title: '接入文档',
      description: '325聚合模型 API 接入文档：鉴权、对话、模型、账户与错误码。',
      path: '/#/docs'
    })
  }
}
