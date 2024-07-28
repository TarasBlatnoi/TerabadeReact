import styles from "./NavbarItem.module.css"
import { NavLink } from "react-router-dom"
import { useHeaderContext } from "../../../context/HeaderContext"

type PropsType = {
  href: string
  name: string
}

const NavbarItem = ({ href, name }: PropsType) => {
  const {
    setLinkHovered,
    setLinkClicked,
    linkClicked,
    setHasHovered,
    setUlHovered,
  } = useHeaderContext()

  return (
    <li
      className={styles.liNavbarSmall}
      onMouseEnter={() => setLinkHovered(name)}
    >
      <NavLink to={href}>
        <p
          onMouseEnter={(event: React.MouseEvent) => {
            const target = event.target as HTMLElement
            if (linkClicked !== target.innerText) {
              setLinkClicked("")
              setHasHovered(true)
              setUlHovered(true)
            }
          }}
        >
          {name}
        </p>
      </NavLink>
    </li>
  )
}

export default NavbarItem
