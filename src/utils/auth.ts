export interface RegisteredUser {
  username: string
  password: string
}

const USERS_KEY = 'quiz_registered_users'
const ACTIVE_USER_KEY = 'quiz_username'
const LOGGED_IN_KEY = 'quiz_isLoggedIn'

const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

export const getRegisteredUsers = (): RegisteredUser[] => {
  const data = localStorage.getItem(USERS_KEY)
  return data ? JSON.parse(data) : []
}

export const registerUser = async (username: string, password: string): Promise<string | null> => {
  if (!username.trim() || !password.trim()) {
    return 'Nama pengguna dan kata sandi tidak boleh kosong.'
  }
  if (password.trim().length < 4) {
    return 'Kata sandi minimal 4 karakter.'
  }

  const users = getRegisteredUsers()
  const exists = users.some(
    (u) => u.username.toLowerCase() === username.trim().toLowerCase()
  )
  if (exists) {
    return 'Nama pengguna sudah terdaftar. Silakan gunakan nama lain.'
  }

  const hashedPassword = await hashPassword(password.trim())
  users.push({
    username: username.trim(),
    password: hashedPassword,
  })
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
  return null
}

export const loginUser = async (
  username: string,
  password: string
): Promise<{ error: string | null; username?: string }> => {
  if (!username.trim() || !password.trim()) {
    return { error: 'Nama pengguna dan kata sandi tidak boleh kosong.' }
  }

  const users = getRegisteredUsers()
  const user = users.find(
    (u) => u.username.toLowerCase() === username.trim().toLowerCase()
  )
  if (!user) {
    return { error: 'Akun tidak ditemukan. Silakan daftar terlebih dahulu.' }
  }

  const hashedInput = await hashPassword(password.trim())
  if (user.password !== hashedInput) {
    return { error: 'Kata sandi salah. Silakan coba lagi.' }
  }

  return { error: null, username: user.username }
}

export const persistLogin = (username: string): void => {
  localStorage.setItem(ACTIVE_USER_KEY, username)
  localStorage.setItem(LOGGED_IN_KEY, 'true')
}

export const clearLogin = (): void => {
  localStorage.removeItem(ACTIVE_USER_KEY)
  localStorage.removeItem(LOGGED_IN_KEY)
}
export const getPersistedLogin = (): { username: string; isLoggedIn: boolean } => {
  const username = localStorage.getItem(ACTIVE_USER_KEY) || ''
  const isLoggedIn = localStorage.getItem(LOGGED_IN_KEY) === 'true'
  return { username, isLoggedIn }
}
