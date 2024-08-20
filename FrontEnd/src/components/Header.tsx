import Navbar from "./Navbar/Navbar"
import NavbarInteractive from "./NavbarInteractive/NavbarInteractive"
import styles from "./Header.module.css"
import WhiteSpot from "./WhiteSpot/WhiteSpot"
import HeaderOffer from "./HeaderOffer/HeaderOffer"
import { HeaderProvider } from "../context/HeaderContext"
import { useState } from "react"

const Header = () => {
  const [menuIconClicked, setMenuIconClicked] = useState(false)

  return (
    <>
      <header className={styles.header}>
        <HeaderOffer />
        <HeaderProvider>
          <Navbar
            menuIconClicked={menuIconClicked}
            setMenuIconClicked={setMenuIconClicked}
          />
          <NavbarInteractive />
        </HeaderProvider>
        {!menuIconClicked && (
          <button
            className={styles.buttonIconsMenu}
            onClick={() => setMenuIconClicked((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              fill="#1C1C1C"
              className={styles.menuIcon}
            >
              <path d="M120-240v-66.67h720V-240H120Zm0-206.67v-66.66h720v66.66H120Zm0-206.66V-720h720v66.67H120Z" />
            </svg>
          </button>
        )}
      </header>
      <WhiteSpot />
    </>
  )
}

export default Header
