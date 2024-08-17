import { useNavigate } from "react-router-dom"
import styles from "./GoBackLogin.module.css"

function GoBackLogin() {
  const navigate = useNavigate()
  return (
    <div className={styles.returnContainer} onClick={() => navigate("/")}>
      <span>&larr;</span>
      <h2> Повернутись</h2>
    </div>
  )
}

export default GoBackLogin
