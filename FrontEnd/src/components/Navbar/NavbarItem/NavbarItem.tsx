import { ReactNode } from "react"
import styles from "./NavbarItem.module.css"
type PropsType = {
  href: string
  children: ReactNode
}

const NavbarItem = ({ href, children }: PropsType) => {
  return (
    <li className={styles.liNavbarSmall}>
      <a href={href}>
        <p>{children}</p>
      </a>
    </li>
  )
}

export default NavbarItem
