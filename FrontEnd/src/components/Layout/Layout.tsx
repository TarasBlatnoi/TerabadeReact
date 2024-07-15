import { Outlet } from "react-router-dom"
import Header from "../Header"
import Footer from "../Footer/Footer"
import styles from "./Layout.module.css"
import Cart from "../Cart/Cart"

export default function Layout() {
  return (
    <div className={styles.siteWrapper}>
      <Header />
      <div id="modal"></div>
      <main>
        <Outlet />
        <Cart />
      </main>
      <Footer />
    </div>
  )
}
