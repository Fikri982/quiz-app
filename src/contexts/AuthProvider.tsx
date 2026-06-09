import { useState, type ReactNode } from 'react'
import { AuthContext } from './AuthContext'
import { loginUser, registerUser, persistLogin, clearLogin, getPersistedLogin } from '../utils/auth'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState(() => getPersistedLogin())

  const login = async (username: string, password: string): Promise<string | null> => {
    const result = await loginUser(username, password)
    if (result.error) return result.error

    const canonicalUsername = result.username || username.trim()

    setAuthState({
      username: canonicalUsername,
      isLoggedIn: true,
    })
    persistLogin(canonicalUsername)
    return null
  }

  const register = async (username: string, password: string): Promise<string | null> => {
    return registerUser(username, password)
  }

  const logout = () => {
    setAuthState({
      username: '',
      isLoggedIn: false,
    })
    clearLogin()
  }

  return (
    <AuthContext.Provider
      value={{
        username: authState.username,
        isLoggedIn: authState.isLoggedIn,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
