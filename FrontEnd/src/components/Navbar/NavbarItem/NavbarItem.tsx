import styles from "./NavbarItem.module.css"
import { NavLink } from "react-router-dom"
import { useHeaderContext } from "../../../context/HeaderContext"

type PropsType = {
  href: string
  name: string
}

const NavbarItem = ({ href, name }: PropsType) => {
  const { setLinkHovered } = useHeaderContext()

  return (
    <li
      className={styles.liNavbarSmall}
      onMouseEnter={() => setLinkHovered(name)}
    >
      <NavLink to={href}>
        <p>{name}</p>
      </NavLink>
    </li>
  )
}

export default NavbarItem
