import Navbar from "./Navbar/Navbar"
import NavbarInteractive from "./NavbarInteractive/NavbarInteractive"
import styles from "./Header.module.css"
import WhiteSpot from "./WhiteSpot/WhiteSpot"
import HeaderOffer from "./HeaderOffer/HeaderOffer"

const Header = () => {
  return (
    <>
      <HeaderOffer />
      <header className={styles.header}>
        <Navbar />
        <NavbarInteractive />
        <WhiteSpot />
      </header>
    </>
  )
}

export default Header
