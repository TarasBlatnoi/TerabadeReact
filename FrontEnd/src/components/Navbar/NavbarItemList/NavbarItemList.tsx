import NavbarItem from "../NavbarItem/NavbarItem"
import styles from "./NavbarItemList.module.css"

const NavbarItemList = () => {
  return (
    <ul className={styles.ulNavbarSmall}>
      <NavbarItem href="/Catalog.html">Чоловіки</NavbarItem>
      <NavbarItem href="#">Жінки</NavbarItem>
      <NavbarItem href="#">Діти</NavbarItem>
      <NavbarItem href="#">Розпродаж</NavbarItem>
      <NavbarItem href="#">Про нас</NavbarItem>
    </ul>
  )
}

export default NavbarItemList
