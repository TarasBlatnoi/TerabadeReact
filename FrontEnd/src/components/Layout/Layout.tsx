import { Outlet } from "react-router-dom"
import Header from "../Header"
import Footer from "../Footer/Footer"
import styles from "./Layout.module.css"
import Cart from "../Cart/Cart"

export default function Layout() {
  return (
    <>
      <div id="modal"></div>
      <div className={styles.siteWrapper}>
        <Header />
        <main>
          <Outlet />
          <Cart />
        </main>
        <Footer />
      </div>
    </>
  )
}
