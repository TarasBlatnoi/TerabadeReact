import { SetStateAction, useEffect, Dispatch, RefObject } from "react"
import NavbarItem from "../NavbarItem/NavbarItem"
import styles from "./NavbarItemList.module.css"
import {
  useHeaderContext,
  hoverType,
  actions,
} from "../../../context/HeaderContext"
import useWindowSize from "../../../hooks/useWindowSize"
import useOutsideClick from "../../../hooks/useOutsideClick"

interface NavbarItemListProps {
  menuIconClicked: boolean
  setMenuIconClicked: Dispatch<SetStateAction<boolean>>
}

const NavbarItemList = ({
  menuIconClicked,
  setMenuIconClicked,
}: NavbarItemListProps) => {
  const { hoverObj, dispatch } = useHeaderContext() as hoverType
  const ulRef = useOutsideClick(() =>
    setMenuIconClicked(false),
  ) as RefObject<HTMLUListElement>
  const windowSize = useWindowSize()
  const links = [
    { name: "Чоловіки", href: "/products?gender=men" },
    { name: "Жінки", href: "/products?gender=women" },
    { name: "Діти", href: "/products?gender=children" },
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
  }, [dispatch, ulRef])

  function handleMouseEnterList() {
    if (!hoverObj.linkClicked) {
      dispatch({ type: actions.mouseEnterList })
    } else {
      dispatch({ type: actions.linkClicked, payload: "" })
    }
  }
  const ul = (
    <ul
      className={`${styles.ulNavbarSmall} ${
        hoverObj.navInteractiveHovered ? styles.heightHovered : ""
      } ${menuIconClicked ? styles.transformInitial : ""}`}
      onMouseEnter={windowSize > 1200 ? handleMouseEnterList : () => {}}
      ref={ulRef}
      onClick={windowSize > 1200 ? navListClickHandler : () => {}}
    >
      {links.map((link, index) => {
        if (windowSize < 1600 && link.name === "Про нас" && windowSize > 1400) {
          return null
        }
        if (windowSize < 1400 && windowSize > 1200) {
          if (link.name === "Розпродаж" || link.name === "Про нас") {
            return null
          }
        }
        return <NavbarItem key={index} name={link.name} href={link.href} />
      })}
    </ul>
  )
  return windowSize <= 1200 ? (
    <div
      className={`${styles.ulWrapper} ${menuIconClicked ? styles.visible : ""}`}
    >
      {menuIconClicked && (
        <button
          className={styles.buttonIconsMenu}
          onClick={() => setMenuIconClicked((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            fill="#1C1C1C"
            className={styles.closeMenuIcon}
          >
            <path d="m251.33-204.67-46.66-46.66L433.33-480 204.67-708.67l46.66-46.66L480-526.67l228.67-228.66 46.66 46.66L526.67-480l228.66 228.67-46.66 46.66L480-433.33 251.33-204.67Z" />
          </svg>
        </button>
      )}
      {ul}
    </div>
  ) : (
    ul
  )
}

export default NavbarItemList
