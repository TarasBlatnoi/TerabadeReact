import styles from "./SortSelection.module.css"
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
      <div
        className={`${styles.imageContainer} ${isOpen ? styles.open : ""}`}
      ></div>
      {isOpen && <SortDropDown />}
    </div>
  )
}

export default SortSelection
