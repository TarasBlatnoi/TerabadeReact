import styles from "./HideFiltersButton.module.css"
import filterSVG from "../../assets/images/Filter.svg"
import { useDispatch, useSelector } from "react-redux"
import { storeType } from "../../store/store"
import { updateVisibility } from "../../store/Features/FiltersSlice/FiltersSlice"

function HideFiltersButton() {
  const isOpenFilters = useSelector(
    (store: storeType) => store.filters.visibility
  )
  const dispatch = useDispatch()

  return (
    <div
      className={styles.container}
      onClick={() => dispatch(updateVisibility())}
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
