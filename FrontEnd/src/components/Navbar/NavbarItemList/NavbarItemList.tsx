import { SyntheticEvent, act, useEffect, useRef } from "react"
import NavbarItem from "../NavbarItem/NavbarItem"
import styles from "./NavbarItemList.module.css"
import {
  useHeaderContext,
  hoverType,
  actions,
} from "../../../context/HeaderContext"

const NavbarItemList = () => {
  const { hoverObj, dispatch } = useHeaderContext() as hoverType

  const ulRef = useRef<HTMLUListElement>(null)
  const links = [
    { name: "Чоловіки", href: "/men" },
    { name: "Жінки", href: "/woman" },
    { name: "Діти", href: "/children" },
    { name: "Розпродаж", href: "/sale" },
    { name: "Про нас", href: "/about" },
  ]

  function navListClickHandler(event: React.MouseEvent) {
    const target = event.target as HTMLElement
    if (target.tagName === "P") {
      dispatch({ type: actions.navListClick, payload: target.innerText })
    }
  }

  useEffect(() => {
    function handleMouseLeave(event: MouseEvent) {
      if (ulRef.current) {
        const bounds = ulRef.current.getBoundingClientRect()
        const mouseX = event.clientX
        const mouseXForRight = mouseX + 0.2
        const mouseXForLeft = mouseX
        const mouseY = event.clientY
        if (
          mouseY < bounds.top ||
          mouseXForLeft < bounds.left ||
          mouseXForRight > bounds.right
        ) {
          dispatch({ type: actions.mouseLeave })
        }
        if (mouseY > bounds.bottom) {
          dispatch({ type: actions.navInteractiveHovered, payload: true })
        }
      }
    }

    const ulElement = ulRef.current
    if (ulElement) {
      ulElement.addEventListener("mouseout", handleMouseLeave)
    }

    return () => {
      if (ulElement) {
        ulElement.removeEventListener("mouseout", handleMouseLeave)
      }
    }
  }, [dispatch])

  function handleMouseEnterList() {
    if (!hoverObj.linkClicked) {
      dispatch({ type: actions.mouseEnterList })
    } else {
      dispatch({ type: actions.linkClicked, payload: "" })
    }
  }

  return (
    <ul
      className={`${styles.ulNavbarSmall} ${
        hoverObj.navInteractiveHovered
          ? styles.heightHovered
          : styles.heightDefault
      }`}
      onMouseEnter={handleMouseEnterList}
      ref={ulRef}
      onClick={navListClickHandler}
    >
      {links.map((link, index) => (
        <NavbarItem key={index} name={link.name} href={link.href} />
      ))}
    </ul>
  )
}

export default NavbarItemList
