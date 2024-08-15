import { Outlet } from "react-router-dom"
import Header from "../Header"
import Footer from "../Footer/Footer"
import Cart from "../Cart/Cart"
import styles from "./Layout.module.css"
import { Suspense } from "react"
import ScrollToTop from "../UI/ScrollToTop/ScrollToTop"

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <div id="modal" className={styles.modalDiv}></div>
      <main className={styles.main}>
        <Suspense fallback={<h1>Loading.....</h1>}>
          <Outlet />
        </Suspense>
        <Cart />
      </main>
      <Footer />
    </>
  )
}
