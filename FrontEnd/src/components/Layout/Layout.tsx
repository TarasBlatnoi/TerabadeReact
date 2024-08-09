import { Outlet } from "react-router-dom"
import Header from "../Header"
import Footer from "../Footer/Footer"
import Cart from "../Cart/Cart"
import styles from "./Layout.module.css"

export default function Layout() {
  return (
    <>
      <div id="modal"></div>
      <Header />
      <main className={styles.main}>
        <Outlet />
        <Cart />
      </main>
      <Footer />
    </>
  )
}
