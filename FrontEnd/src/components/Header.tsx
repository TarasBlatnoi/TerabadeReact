import Navbar from "./Navbar/Navbar"
import NavbarInteractive from "./NavbarInteractive/NavbarInteractive"
import styles from "./Header.module.css"
import WhiteSpot from "./WhiteSpot/WhiteSpot"
import HeaderOffer from "./HeaderOffer/HeaderOffer"
import { useState } from "react"

const Header = () => {
  const [ulHovered, setUlHovered] = useState(false)
  const [navInteractiveHovered, setNavInteractiveHovered] = useState(false)
  const [hasHovered, setHasHovered] = useState(false)
  return (
    <>
      <HeaderOffer />
      <header className={styles.header}>
        <Navbar
          navInteractiveHovered={navInteractiveHovered}
          setUlHovered={setUlHovered}
          setHasHovered={setHasHovered}
          setNavInteractiveHovered={setNavInteractiveHovered}
        />
        <NavbarInteractive
          ulHovered={ulHovered}
          hasHovered={hasHovered}
          setUlHovered={setUlHovered}
          setNavInteractiveHovered={setNavInteractiveHovered}
        />
        <WhiteSpot />
      </header>
    </>
  )
}

export default Header
