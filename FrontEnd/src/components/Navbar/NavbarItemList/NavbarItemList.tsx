import React, { Dispatch, SetStateAction, useEffect, useRef } from "react"
import NavbarItem from "../NavbarItem/NavbarItem"
import styles from "./NavbarItemList.module.css"

type PropsType = {
  setUlHovered: Dispatch<SetStateAction<boolean>>
  setHasHovered: Dispatch<SetStateAction<boolean>>
  setNavInteractiveHovered: Dispatch<SetStateAction<boolean>>
  navInteractiveHovered: boolean
}

const NavbarItemList = ({
  setUlHovered,
  navInteractiveHovered,
  setHasHovered,
  setNavInteractiveHovered,
}: PropsType) => {
  const ulRef = useRef<HTMLUListElement>(null)

  const links = [
    { name: "Чоловіки", href: "/Catalog.html" },
    { name: "Жінки", href: "#" },
    { name: "Діти", href: "#" },
    { name: "Розпродаж", href: "#" },
    { name: "Про нас", href: "#" },
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
  }, [setUlHovered])

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
        <NavbarItem key={index} children={link.name} href={link.href} />
      ))}
    </ul>
  )
}

export default NavbarItemList
