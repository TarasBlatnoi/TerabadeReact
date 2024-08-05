import { Outlet } from "react-router-dom"
import Header from "../Header"
import Footer from "../Footer/Footer"
import Cart from "../Cart/Cart"

export default function Layout() {
  return (
    <>
      <div id="modal"></div>
      <Header />
      <main>
        <Outlet />
        <Cart />
      </main>
      <Footer />
    </>
  )
}
