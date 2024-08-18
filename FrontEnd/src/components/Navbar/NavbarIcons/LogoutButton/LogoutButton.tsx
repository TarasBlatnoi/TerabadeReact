import { json, useNavigate } from "react-router-dom"
import AuthAPI from "../../../../api/Auth/AuthAPI"
import { useContext, useState } from "react"
import { AuthContext } from "../../../../context/AuthContext"
import styles from "./LogoutButton.module.css"
import logout from "../../../../assets/images/logout.png"

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
    <div
      className={`${styles.container} ${logoutButtonClicked ? styles.clicked : ""}`}
      onClick={() => {
        if (!logoutButtonClicked) handleLogout()
      }}
    >
      <img src={logout} alt="logout" />
    </div>
  )
}

export default LogoutButton
