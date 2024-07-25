import { useEffect, useRef, useState } from "react"
import NavbarItem from "../NavbarItem/NavbarItem"
import styles from "./NavbarItemList.module.css"
import { useHeaderContext } from "../../../context/HeaderContext"

const NavbarItemList = () => {
  const {
    setUlHovered,
    navInteractiveHovered,
    setHasHovered,
    setNavInteractiveHovered,
    setLinkHovered,
  } = useHeaderContext()
  const ulRef = useRef<HTMLUListElement>(null)
  const [linkClicked, setLinkClicked] = useState(false)
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
      setUlHovered(false)
      setNavInteractiveHovered(false)
      setLinkClicked(true)
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
          setNavInteractiveHovered(false)
          setUlHovered(false)
          setLinkHovered("")
        }
        if (mouseY > bounds.bottom) {
          setNavInteractiveHovered(true)
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
  }, [setUlHovered, setNavInteractiveHovered, setLinkHovered])

  return (
    <ul
      className={`${styles.ulNavbarSmall} ${
        navInteractiveHovered ? styles.heightHovered : styles.heightDefault
      }`}
      onMouseEnter={() => {
        if (!linkClicked) {
          setHasHovered(true)
          setUlHovered(true)
        } else {
          setLinkClicked(false)
        }
      }}
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
