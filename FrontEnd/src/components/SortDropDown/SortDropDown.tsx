import styles from "./SortDropDown.module.css"
import { sortingOptions, useSort } from "../../context/SortContext"

function SortDropDown() {
  const { setProductsSortMethod } = useSort()

  const sortOptions = [
    sortingOptions.standard,
    sortingOptions.priceDescending,
    sortingOptions.priceAscending,
  ]

  return (
    <div className={styles.dropDownContainer}>
      {sortOptions.map((option, i) => {
        return (
          <button
            key={i}
            onClick={() => {
              setProductsSortMethod(option)
            }}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}

export default SortDropDown
