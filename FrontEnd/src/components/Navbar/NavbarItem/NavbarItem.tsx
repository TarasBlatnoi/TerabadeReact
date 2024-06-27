import { ReactNode } from "react"
import styles from "./NavbarItem.module.css"
import { NavLink } from "react-router-dom"
type PropsType = {
  href: string
  children: ReactNode
}

const NavbarItem = ({ href, children }: PropsType) => {
  return (
    <li className={styles.liNavbarSmall}>
      <NavLink to={href}>
        <p>{children}</p>
      </NavLink>
    </li>
  )
}

export default NavbarItem
