import { createContext, ReactNode, useEffect, useState } from "react"
import AuthAPI from "../api/Auth/AuthAPI"

export const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (value: boolean) => {
    console.log(value)
  },
})

interface AuthProviderProps {
  children: ReactNode
}

const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    async function sendReqCheckAuth() {
      try {
        const res = await AuthAPI.checkAuth()
        if (res.authenticated) {
          setIsLoggedIn(true)
        } else {
          setIsLoggedIn(false)
        }
      } catch (err) {
        setIsLoggedIn(false)
        throw err
      }
    }

    sendReqCheckAuth()
  }, [])
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
