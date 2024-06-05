import Navbar from "./Navbar/Navbar"
import NavbarInteractive from "./NavbarInteractive/NavbarInteractive"
import styles from "./Header.module.css"
import WhiteSpot from "./WhiteSpot/WhiteSpot"

const Header = () => {
  return (
    <header className={styles.header}>
      <Navbar />
      <NavbarInteractive />
      <WhiteSpot />
    </header>
  )
}

export default Header
