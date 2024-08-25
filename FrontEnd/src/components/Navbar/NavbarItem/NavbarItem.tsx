import styles from "./NavbarItem.module.css"
import { useLocation, useNavigate } from "react-router-dom"
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
  const location = useLocation()
  const navigate = useNavigate()
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
      <div
        onClick={() => {
          if (href.includes("products")) {
            const genderStr = "gender"
            const hrefGender = href
              .slice(href.indexOf(genderStr))
              .split("=")
              .at(-1)

            const searchParams = new URLSearchParams(location.search)
            searchParams.set("gender", hrefGender!)
            navigate("/products?" + searchParams.toString())
          } else {
            navigate(href)
          }
        }}
        className={styles.itemLink}
      >
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
      </div>
    </li>
  )
}

export default NavbarItem
