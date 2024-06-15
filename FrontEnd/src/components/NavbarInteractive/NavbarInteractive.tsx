import NavbarInteractiveItem from "./Item/Item"
import styles from "./NavbarInteractive.module.css"
import manImage from "../../assets/images/ManHeader.svg"
import { useHeaderContext } from "../../context/HeaderContext"

const NavbarInteractive = () => {
  const { ulHovered, setNavInteractiveHovered, setUlHovered, hasHovered } =
    useHeaderContext()
  const listItems = [
    {
      mainLinkName: "Нові надходження",
      linksNames: ["Дивитися всі"],
    },
    {
      mainLinkName: "Обране",
      linksNames: [
        "Трендові",
        "Лідери продажу",
        "Набори",
        "Розпродаж",
        "Новинка",
      ],
    },
    {
      mainLinkName: "Обмежений час",
      linksNames: [
        <>
          Знижка <span className={styles.spanCourier}>20%</span>
        </>,
      ],
    },
    {
      mainLinkName: "Взуття",
      linksNames: [
        "Повсякденні",
        "Jordan",
        "Air Max",
        <>
          Air Force <span className={styles.spanCourier}>1</span>
        </>,
        "Новинка",
        "Dunks & Blazers",
      ],
    },
    {
      mainLinkName: "Спорт",
      linksNames: [
        "Футбол",
        "Баскетбол",
        "Теніс",
        "Гольф",
        "Спорт-зал",
        "Біг",
        "Плавання",
        "Йога",
      ],
    },
  ]

  const handleMouseLeave = () => {
    setNavInteractiveHovered(false)
    setUlHovered(false)
  }

  const handleMouseEnter = () => {
    setNavInteractiveHovered(true)
  }

  return (
    <nav
      role="navigation"
      aria-label="Interactive navigation"
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={` ${styles.navbarInteractive} ${
        ulHovered ? styles.animatedShow : hasHovered ? styles.animatedHide : ""
      } ${hasHovered ? styles.navStyleFlex : styles.navStyleNone}`}
    >
      <ul className={styles.ulNavbarInteractive}>
        {listItems.map((item, index) => (
          <NavbarInteractiveItem
            key={index}
            mainLinkName={item.mainLinkName}
            linksNames={item.linksNames}
          />
        ))}
      </ul>
      <img src={manImage} alt="Male" className={styles.manImage} />
    </nav>
  )
}

export default NavbarInteractive
