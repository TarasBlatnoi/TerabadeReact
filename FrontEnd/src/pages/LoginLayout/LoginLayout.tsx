import { Outlet } from "react-router-dom"
import styles from "./LoginLayot.module.css"

function LoginLayout() {
  return (
    <div className={styles.loginContainer}>
      <Outlet />
    </div>
  )
}

export default LoginLayout
