import NavbarLogo from "./NavbarLogo/NavbarLogo"
import NavbarSearch from "./NavbarSearch/NavbarSearch"
import NavbarItemList from "./NavbarItemList/NavbarItemList"
import NavbarIcons from "./NavbarIcons/NavbarIcons"
import styles from "./Navbar.module.css"

const Navbar = () => {
  return (
    <nav className={styles.navbarSmall}>
      <NavbarLogo />
      <NavbarSearch />
      <NavbarItemList />
      <NavbarIcons />
      <p className={styles.language}>UA</p>
    </nav>
  )
}

export default Navbar
