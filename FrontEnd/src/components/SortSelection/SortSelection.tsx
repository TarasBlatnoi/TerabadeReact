import { useSort, sortingOptions } from "../../context/SortContext"
import styles from "./SortSelection.module.css"
import sortSVG from "../../assets/images/Caret-Sort.svg"

function SortSelection() {
  const { setProductsSortMethod, productsSortMethod } = useSort()
  return (
    <div className={styles.container}>
      <h2>Сортування</h2>
      <div className={styles.imageContainer}>
        <img src={sortSVG} alt="sort" />
      </div>
      <select
        value={productsSortMethod}
        onChange={(ev) => setProductsSortMethod(ev.target.value)}
        className={styles.selection}
      >
        <option value={sortingOptions.standard}>
          {sortingOptions.standard}
        </option>
        <option value={sortingOptions.priceAscending}>
          {sortingOptions.priceAscending}
        </option>
        <option value={sortingOptions.priceDescending}>
          {sortingOptions.priceDescending}
        </option>
      </select>
    </div>
  )
}

export default SortSelection
