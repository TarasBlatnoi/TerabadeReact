import NavbarLogo from "./NavbarLogo/NavbarLogo"
import NavbarSearch from "./NavbarSearch/NavbarSearch"
import NavbarItemList from "./NavbarItemList/NavbarItemList"
import NavbarIcons from "./NavbarIcons/NavbarIcons"
import styles from "./Navbar.module.css"
import useWindowSize from "../../hooks/useWindowSize"

import { SetStateAction, Dispatch } from "react"

interface NavbarProps {
  menuIconClicked: boolean
  setMenuIconClicked: Dispatch<SetStateAction<boolean>>
}

const Navbar = ({ menuIconClicked, setMenuIconClicked }: NavbarProps) => {
  const windowSize = useWindowSize()
  return (
    <nav className={styles.navbarSmall}>
      <NavbarLogo />
      {windowSize > 1200 ? <NavbarSearch /> : null}
      <NavbarItemList
        menuIconClicked={menuIconClicked}
        setMenuIconClicked={setMenuIconClicked}
      />
      <NavbarIcons />
      {windowSize > 1200 ? <p className={styles.language}>UA</p> : null}
    </nav>
  )
}

export default Navbar
