const ADMIN_USERNAME = 'marvelindonesiateknologi@gmail.com'
const ADMIN_PASSWORD = 'Marvel2025!'
const AUTH_KEY = 'admin_auth'

function getSessionStorage(): Storage | null {
  if (typeof window === 'undefined') {
    return null
  }
  return window.sessionStorage
}

export function login(username: string, password: string): boolean {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const storage = getSessionStorage()
    if (storage) {
      const authToken = btoa(`${username}:${Date.now()}`)
      storage.setItem(AUTH_KEY, authToken)
      return true
    }
  }
  return false
}

export function logout(): void {
  const storage = getSessionStorage()
  if (storage) {
    storage.removeItem(AUTH_KEY)
  }
}

export function isAuthenticated(): boolean {
  const storage = getSessionStorage()
  if (!storage) {
    return false
  }
  return !!storage.getItem(AUTH_KEY)
}

export function checkAuth(): boolean {
  return isAuthenticated()
}
