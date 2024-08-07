import { useEffect, useRef } from "react"
import NavbarItem from "../NavbarItem/NavbarItem"
import styles from "./NavbarItemList.module.css"
import {
  useHeaderContext,
  hoverType,
  actions,
} from "../../../context/HeaderContext"
import useWindowSize from "../../../hooks/useWindowSize"

const NavbarItemList = () => {
  const { hoverObj, dispatch } = useHeaderContext() as hoverType

  const ulRef = useRef<HTMLUListElement>(null)
  const windowSize = useWindowSize()
  const links = [
    { name: "Чоловіки", href: "/men" },
    { name: "Жінки", href: "/women" },
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
        if (mouseY > bounds.bottom) {
          dispatch({ type: actions.navInteractiveHovered, payload: true })
        }
        if (
          mouseY < bounds.top ||
          mouseXForLeft < bounds.left ||
          mouseXForRight > bounds.right - 1
        ) {
          dispatch({ type: actions.mouseLeave })
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
        hoverObj.navInteractiveHovered ? styles.heightHovered : ""
      }`}
      onMouseEnter={handleMouseEnterList}
      ref={ulRef}
      onClick={navListClickHandler}
    >
      {links.map((link, index) => {
        if (windowSize < 1400 && link.name === "Про нас") {
          return null
        }
        if (windowSize < 1200) {
          if (link.name === "Розпродаж" || link.name === "Про нас") {
            return null
          }
        }
        return <NavbarItem key={index} name={link.name} href={link.href} />
      })}
    </ul>
  )
}

export default NavbarItemList
