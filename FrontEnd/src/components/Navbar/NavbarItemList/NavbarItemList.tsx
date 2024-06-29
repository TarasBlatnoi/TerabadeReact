import { useEffect, useRef } from "react"
import NavbarItem from "../NavbarItem/NavbarItem"
import styles from "./NavbarItemList.module.css"
import { useHeaderContext } from "../../../context/HeaderContext"

const NavbarItemList = () => {
  const {
    setUlHovered,
    navInteractiveHovered,
    setHasHovered,
    setNavInteractiveHovered,
  } = useHeaderContext()
  const ulRef = useRef<HTMLUListElement>(null)

  const links = [
    { name: "Чоловіки", href: "/catalog" },
    { name: "Жінки", href: "/catalog" },
    { name: "Діти", href: "/catalog" },
    { name: "Розпродаж", href: "/sale" },
    { name: "Про нас", href: "/about" },
  ]

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
  }, [setUlHovered, setNavInteractiveHovered])

  return (
    <ul
      className={`${styles.ulNavbarSmall} ${
        navInteractiveHovered ? styles.heightHovered : styles.heightDefault
      }`}
      onMouseEnter={() => {
        setHasHovered(true)
        setUlHovered(true)
      }}
      ref={ulRef}
    >
      {links.map((link, index) => (
        <NavbarItem key={index} name={link.name} href={link.href} />
      ))}
    </ul>
  )
}

export default NavbarItemList
