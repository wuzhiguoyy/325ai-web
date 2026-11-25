const API_BASE = import.meta.env.VITE_API_BASE || ''

export const CAPABILITY_LABELS = {
  text: '文本对话',
  image: '图像生成',
  video: '视频生成',
  audio: '音频',
  embedding: '向量嵌入'
}

export function capabilityLabel(key) {
  return CAPABILITY_LABELS[key] || key
}

async function getJson(path) {
  const response = await fetch(`${API_BASE}${path}`)
  if (!response.ok) throw new Error(`接口返回 ${response.status}`)
  return response.json()
}

async function postJson(path, body) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body || {})
  })
  const text = await response.text()
  let data = null
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = null
    }
  }
  if (!response.ok) {
    const message = data && (data.message || data.msg)
      ? (data.message || data.msg)
      : `接口返回 ${response.status}`
    throw new Error(message)
  }
  return data
}

export async function fetchCapabilities() {
  const data = await getJson('/api/paypal/models/capabilities')
  return Array.isArray(data) ? data : []
}

export async function fetchModels({ capability = '', pageNum = 1, pageSize = 60 } = {}) {
  const params = new URLSearchParams({ pageNum: String(pageNum), pageSize: String(pageSize) })
  if (capability) params.set('capability', capability)

  const data = await getJson(`/api/paypal/models?${params.toString()}`)
  const list = Array.isArray(data) ? data : (data.list || [])
  const total = Array.isArray(data) ? data.length : Number(data.totalCount || list.length)
  return { list, total }
}

export async function fetchModelDetail(modelId) {
  const data = await getJson(`/api/paypal/models/${encodeURIComponent(modelId)}`)
  return data || null
}

/**
 * 拉取全部模型（按页循环，接口单页上限 200）。
 */
export async function fetchAllModels() {
  const pageSize = 200
  const first = await fetchModels({ pageNum: 1, pageSize })
  const total = first.total
  const pages = Math.ceil(total / pageSize)
  if (pages <= 1) return first.list

  const rest = await Promise.all(
    Array.from({ length: pages - 1 }, (_, index) =>
      fetchModels({ pageNum: index + 2, pageSize })
    )
  )
  return first.list.concat(...rest.map(item => item.list))
}

// ==================== 令牌 ====================

export function fetchTokens(token) {
  return postJson('/api/paypal/token/list', { token })
}

export function createToken(token, name) {
  return postJson('/api/paypal/token/create', { token, name })
}

export function deleteToken(token, tokenId) {
  return postJson('/api/paypal/token/delete', { token, tokenId })
}

// ==================== 用量统计 ====================

export function fetchUsageSummary(payload) {
  return postJson('/api/paypal/usage/summary', payload)
}

export function fetchUsageTrend(payload) {
  return postJson('/api/paypal/usage/trend', payload)
}

export function fetchUsageRanking(payload) {
  return postJson('/api/paypal/usage/ranking', payload)
}

export function fetchUsageLogs(payload) {
  return postJson('/api/paypal/usage/logs', payload)
}

// ==================== 账号 ====================

export function changePassword(token, oldPassword, newPassword) {
  return postJson('/api/paypal/user/changePassword', { token, oldPassword, newPassword })
}

// ==================== 账户与充值 ====================

export function fetchAccount(token) {
  return postJson('/api/paypal/account/info', { token })
}

export function fetchAccountFlows(payload) {
  return postJson('/api/paypal/account/flows', payload)
}

export function createRecharge(token, channel, amount) {
  return postJson('/api/paypal/recharge/create', { token, channel, amount })
}

export function fetchRechargeOrders(payload) {
  return postJson('/api/paypal/recharge/orders', payload)
}

export function fetchRechargeRecords(payload) {
  return postJson('/api/paypal/recharge/records', payload)
}

export function fetchUsdtAddress(token) {
  return postJson('/api/paypal/usdt/address', { token })
}

export function syncUsdt(token) {
  return postJson('/api/paypal/usdt/sync', { token })
}

// ==================== 邀请 ====================

export function fetchInviteInfo(token) {
  return postJson('/api/paypal/invite/info', { token })
}

export function fetchInvitees(payload) {
  return postJson('/api/paypal/invite/invitees', payload)
}

export function fetchInviteRewards(payload) {
  return postJson('/api/paypal/invite/rewards', payload)
}

// ==================== 账单 ====================

export function fetchBills(payload) {
  return postJson('/api/paypal/bill/list', payload)
}

export function fetchBillSummary(token) {
  return postJson('/api/paypal/bill/summary', { token })
}

export async function exportBill(token, billNo) {
  const response = await fetch(`${API_BASE}/api/paypal/bill/export`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, billNo })
  })
  if (!response.ok) {
    throw new Error(`导出失败 ${response.status}`)
  }
  return response.blob()
}
