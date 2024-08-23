import styles from "./SortSelection.module.css"
import { useState } from "react"
import SortDropDown from "../SortDropDown/SortDropDown"
import { useSort } from "../../context/SortContext"

function SortSelection() {
  const [isOpen, setIsOpen] = useState(false)
  const { productsSortMethod } = useSort()

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
      <p>{productsSortMethod}</p>
    </div>
  )
}

export default SortSelection
