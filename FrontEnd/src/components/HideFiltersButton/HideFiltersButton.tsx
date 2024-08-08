import styles from "./HideFiltersButton.module.css"
import filterSVG from "../../assets/images/Filter.svg"

type HideFiltersButtonProps = {
  isOpenFilters: boolean
  setIsOpenFilters: Function
}

function HideFiltersButton({
  isOpenFilters,
  setIsOpenFilters,
}: HideFiltersButtonProps) {
  return (
    <div
      className={styles.container}
      onClick={() => setIsOpenFilters((curr: boolean) => !curr)}
    >
      <h2>Приховати фільтр</h2>
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
