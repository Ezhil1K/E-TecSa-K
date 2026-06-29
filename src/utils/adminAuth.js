const SESSION_KEY = 'ek_admin_session'

export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const session = JSON.parse(raw)
    if (!session.token || !session.expires) return null
    if (Date.now() > session.expires) { localStorage.removeItem(SESSION_KEY); return null }
    return session
  } catch { return null }
}

export function isLoggedIn() { return getSession() !== null }
export function login(token, expires) { localStorage.setItem(SESSION_KEY, JSON.stringify({ token, expires })) }
export function logout() { localStorage.removeItem(SESSION_KEY) }
