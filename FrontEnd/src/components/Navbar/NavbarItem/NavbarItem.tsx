import styles from "./NavbarItem.module.css"
import { NavLink } from "react-router-dom"
import {
  useHeaderContext,
  hoverType,
  actions,
} from "../../../context/HeaderContext"

type PropsType = {
  href: string
  name: string
}

const NavbarItem = ({ href, name }: PropsType) => {
  const { dispatch } = useHeaderContext() as hoverType

  return (
    <li
      className={styles.liNavbarSmall}
      onMouseEnter={() =>
        dispatch({ type: actions.linkHovered, payload: name })
      }
    >
      <NavLink to={href}>
        <p>{name}</p>
      </NavLink>
    </li>
  )
}

export default NavbarItem
