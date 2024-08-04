import Navbar from "./Navbar/Navbar"
import NavbarInteractive from "./NavbarInteractive/NavbarInteractive"
import styles from "./Header.module.css"
import WhiteSpot from "./WhiteSpot/WhiteSpot"
import HeaderOffer from "./HeaderOffer/HeaderOffer"
import { HeaderProvider } from "../context/HeaderContext"

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <HeaderOffer />
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
