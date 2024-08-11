import styles from "./HideFiltersButton.module.css"
import filterSVG from "../../assets/images/Filter.svg"
import { useFilters } from "../../context/FiltersContext"

function HideFiltersButton() {
  const { isOpenFilters, setIsOpenFilters } = useFilters()

  return (
    <div
      className={styles.container}
      onClick={() => setIsOpenFilters((curr: boolean) => !curr)}
    >
      <h2>{`${isOpenFilters ? "Приховати" : "Показати"} фільтр`}</h2>
      <div className={styles.svgContainer}>
        <img
          src={filterSVG}
          alt="sort"
          className={`${styles.image} ${isOpenFilters ? styles.open : ""} `}
        />
      </div>
    </div>
  )
}

export default HideFiltersButton
