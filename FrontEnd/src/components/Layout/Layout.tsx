import { Outlet } from "react-router-dom"
import Header from "../Header"
import Footer from "../Footer/Footer"
import styles from "./Layout.module.css"

export default function Layout() {
  return (
    <div className={styles.siteWrapper}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
