import NavbarInteractiveItem from "./Item/Item"
import styles from "./NavbarInteractive.module.css"
import manImage from "../../assets/images/ManHeader.svg"
import womanImage from "../../assets/images/WomanHeader.svg"
import boyImage from "../../assets/images/BoyHeader.svg"
import girlImage from "../../assets/images/GirlHeader.svg"
import { useHeaderContext } from "../../context/HeaderContext"

const NavbarInteractive = () => {
  const {
    ulHovered,
    setNavInteractiveHovered,
    setUlHovered,
    hasHovered,
    linkHovered,
  } = useHeaderContext()
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
      {linkHovered === "Жінки" && (
        <img src={womanImage} alt="Male" className={styles.womanImage} />
      )}
      {linkHovered === "Діти" && (
        <img src={girlImage} alt="Male" className={styles.girlImage} />
      )}

      <ul className={styles.ulNavbarInteractive}>
        {listItems.map((item, index) => (
          <NavbarInteractiveItem
            key={index}
            mainLinkName={item.mainLinkName}
            linksNames={item.linksNames}
          />
        ))}
      </ul>
      {linkHovered === "Чоловіки" && (
        <img src={manImage} alt="Male" className={styles.manImage} />
      )}
      {linkHovered === "Діти" && (
        <img src={boyImage} alt="Male" className={styles.boyImage} />
      )}
    </nav>
  )
}

export default NavbarInteractive
