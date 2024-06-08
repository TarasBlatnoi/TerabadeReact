import React, { Dispatch, SetStateAction, forwardRef } from "react"
import NavbarItem from "../NavbarItem/NavbarItem"
import styles from "./NavbarItemList.module.css"

type PropsType = {
  setUlHovered: Dispatch<SetStateAction<boolean>>
  setHasHovered: Dispatch<SetStateAction<boolean>>
  navInteractiveHovered: boolean
}

const NavbarItemList = forwardRef<HTMLUListElement, PropsType>(
  ({ setUlHovered, navInteractiveHovered, setHasHovered }, ref) => {
    const links = [
      { name: "Чоловіки", href: "/Catalog.html" },
      { name: "Жінки", href: "#" },
      { name: "Діти", href: "#" },
      { name: "Розпродаж", href: "#" },
      { name: "Про нас", href: "#" },
    ]

    const handleMouseLeave = (
      event: React.MouseEvent<HTMLUListElement, MouseEvent>
    ) => {
      if (ref && "current" in ref && ref.current) {
        const bounds = ref.current.getBoundingClientRect()
        const mouseX = event.clientX
        const mouseY = event.clientY

        if (mouseY < bounds.top) {
          setUlHovered(false)
          ref.current.style.height = "30%"
        }

        if (mouseX < bounds.left || mouseX > bounds.right) {
          setUlHovered(false)
          ref.current.style.height = "30%"
        }
      }
    }
    const heightDefault = {
      height: "30%",
    }

    const heightHovered = {
      height: "100%",
    }
    return (
      <ul
        className={styles.ulNavbarSmall}
        onMouseEnter={() => {
          setHasHovered(true)
          setUlHovered(true)
        }}
        onMouseLeave={handleMouseLeave}
        style={navInteractiveHovered ? heightHovered : heightDefault}
        ref={ref}
      >
        {links.map((link, index) => (
          <NavbarItem key={index} children={link.name} href={link.href} />
        ))}
      </ul>
    )
  }
)

export default NavbarItemList
