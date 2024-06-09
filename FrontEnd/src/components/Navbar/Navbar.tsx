import NavbarLogo from "./NavbarLogo/NavbarLogo"
import NavbarSearch from "./NavbarSearch/NavbarSearch"
import NavbarItemList from "./NavbarItemList/NavbarItemList"
import NavbarIcons from "./NavbarIcons/NavbarIcons"
import styles from "./Navbar.module.css"
import { Dispatch, SetStateAction } from "react"

type PropsType = {
  navInteractiveHovered: boolean
  setUlHovered: Dispatch<SetStateAction<boolean>>
  setHasHovered: Dispatch<SetStateAction<boolean>>
}

const Navbar = ({
  setUlHovered,
  navInteractiveHovered,
  setHasHovered,
}: PropsType) => {
  return (
    <nav className={styles.navbarSmall}>
      <NavbarLogo />
      <NavbarSearch />
      <NavbarItemList
        navInteractiveHovered={navInteractiveHovered}
        setUlHovered={setUlHovered}
        setHasHovered={setHasHovered}
      />
      <NavbarIcons />
      <p className={styles.language}>UA</p>
    </nav>
  )
}

export default Navbar
