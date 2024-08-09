import styles from "./SortSelection.module.css"
import sortSVG from "../../assets/images/Caret-Sort.svg"
import { useState } from "react"
import SortDropDown from "../SortDropDown/SortDropDown"

function SortSelection() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className={styles.container}
      onClick={() => setIsOpen((curr) => !curr)}
    >
      <h2>Сортування</h2>
      <div className={styles.imageContainer}>
        <img
          src={sortSVG}
          alt="sort"
          className={`${styles.image} ${isOpen ? styles.open : ""}`}
        />
      </div>
      {isOpen && <SortDropDown />}
    </div>
  )
}

export default SortSelection
