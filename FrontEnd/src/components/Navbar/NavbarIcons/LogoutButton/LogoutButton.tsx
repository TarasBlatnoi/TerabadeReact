import { json, useNavigate } from "react-router-dom"
import AuthAPI from "../../../../api/Auth/AuthAPI"
import { useContext, useState } from "react"
import { AuthContext } from "../../../../context/AuthContext"

const LogoutButton = () => {
  const navigate = useNavigate()
  const [logoutButtonClicked, setLogoutButtonClicked] = useState(false)
  const { setIsLoggedIn } = useContext(AuthContext)
  async function handleLogout() {
    setLogoutButtonClicked(true)
    try {
      await AuthAPI.logoutUser()
      setIsLoggedIn(false)
      navigate("/")
    } catch (err) {
      throw json({ errors: ["Couldn't logout"] }, { status: 500 })
    }
  }
  return (
    <button onClick={handleLogout} disabled={logoutButtonClicked}>
      {logoutButtonClicked ? "logging out..." : "logout"}
    </button>
  )
}

export default LogoutButton
