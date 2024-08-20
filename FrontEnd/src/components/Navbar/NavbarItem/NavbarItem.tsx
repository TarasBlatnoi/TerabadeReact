import styles from "./NavbarItem.module.css"
import { NavLink } from "react-router-dom"
import {
  useHeaderContext,
  hoverType,
  actions,
} from "../../../context/HeaderContext"
import useWindowSize from "../../../hooks/useWindowSize"

type PropsType = {
  href: string
  name: string
}

const NavbarItem = ({ href, name }: PropsType) => {
  const { hoverObj, dispatch } = useHeaderContext() as hoverType
  const windowSize = useWindowSize()
  return (
    <li
      className={styles.liNavbarSmall}
      onMouseEnter={
        windowSize > 1200
          ? () => dispatch({ type: actions.linkHovered, payload: name })
          : () => {}
      }
    >
      <NavLink to={href}>
        <p
          onMouseEnter={
            windowSize > 1200
              ? (event: React.MouseEvent) => {
                  const target = event.target as HTMLElement
                  if (hoverObj.linkClicked !== target.innerText) {
                    dispatch({ type: actions.mouseEnterNavBarItem })
                  }
                }
              : () => {}
          }
        >
          {name}
        </p>
      </NavLink>
    </li>
  )
}

export default NavbarItem
