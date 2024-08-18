import { Outlet, useLocation } from "react-router-dom"
import Header from "../Header"
import Footer from "../Footer/Footer"
import Cart from "../Cart/Cart"
import styles from "./Layout.module.css"
import { Suspense } from "react"
import ScrollToTop from "../UI/ScrollToTop/ScrollToTop"
import Spinner from "../LoadingSpinner/Spinner"

export default function Layout() {
  const pathname = useLocation().pathname
  return (
    <>
      <ScrollToTop />
      <Header />
      <div id="modal" className={styles.modalDiv}></div>
      <main className={styles.main}>
        <Suspense fallback={<Spinner />} key={pathname}>
          <Outlet />
        </Suspense>
        <Cart />
      </main>
      <Footer />
    </>
  )
}
