const API_BASE = import.meta.env.VITE_API_BASE || ''
const TOKEN_KEY = 'pp_token'
const USER_KEY = 'pp_user'

async function post(path, body) {
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
      data = text
    }
  }

  if (!response.ok) {
    const message = (data && (data.message || data.msg || data.error)) || `请求失败（${response.status}）`
    throw new Error(message)
  }
  return data
}

export function sendCode(email, scene) {
  return post('/api/paypal/user/sendCode', { email, scene })
}

export function register(email, password, code, inviteCode) {
  return post('/api/paypal/user/register', { email, password, code, inviteCode })
}

export function login(email, password) {
  return post('/api/paypal/user/login', { email, password })
}

export function logout(token) {
  return post('/api/paypal/user/logout', { token })
}

export function saveAuth(data) {
  if (!data || !data.token) return
  localStorage.setItem(TOKEN_KEY, data.token)
  localStorage.setItem(USER_KEY, JSON.stringify({
    userId: data.userId,
    email: data.email,
    nickname: data.nickname
  }))
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || ''
}

export function currentUser() {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}
