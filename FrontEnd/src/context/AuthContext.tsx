import { createContext, ReactNode, useEffect, useState } from "react"
import AuthAPI from "../api/Auth/AuthAPI"

export const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (value: boolean) => {
    console.log(value)
  },
  isLoading: false,
})

interface AuthProviderProps {
  children: ReactNode
}

const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    async function sendReqCheckAuth() {
      try {
        setIsLoading(true)
        const res = await AuthAPI.checkAuth()
        if (res.authenticated) {
          setIsLoggedIn(true)
        } else {
          setIsLoggedIn(false)
        }
      } catch (err) {
        setIsLoggedIn(false)
        throw err
      } finally {
        setIsLoading(false)
      }
    }

    sendReqCheckAuth()
  }, [])
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
