import NavbarItem from "../NavbarItem/NavbarItem"
import styles from "./NavbarItemList.module.css"

const NavbarItemList = () => {
  const links = [
    { name: "Чоловіки", href: "/Catalog.html" },
    { name: "Жінки", href: "#" },
    { name: "Діти", href: "#" },
    { name: "Розпродаж", href: "#" },
    { name: "Про нас", href: "#" },
  ]

  return (
    <ul className={styles.ulNavbarSmall}>
      {links.map((link, index) => (
        <NavbarItem key={index} children={link.name} href={link.href} />
      ))}
    </ul>
  )
}

export default NavbarItemList
