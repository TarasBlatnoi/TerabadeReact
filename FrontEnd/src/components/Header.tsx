import Navbar from "./Navbar/Navbar"
import NavbarInteractive from "./NavbarInteractive/NavbarInteractive"
import styles from "./Header.module.css"
import WhiteSpot from "./WhiteSpot/WhiteSpot"
import HeaderOffer from "./HeaderOffer/HeaderOffer"
import { HeaderProvider } from "../context/HeaderContext"

const Header = () => {
  return (
    <>
      <HeaderOffer />
      <header className={styles.header}>
        <HeaderProvider>
          <Navbar />
          <NavbarInteractive />
        </HeaderProvider>
      </header>
      <WhiteSpot />
    </>
  )
}

export default Header
