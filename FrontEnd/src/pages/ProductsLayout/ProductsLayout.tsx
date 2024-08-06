import { Outlet, useParams } from "react-router-dom"
import styles from "./ProductsLayout.module.css"
import { useState } from "react"
import HideFiltersButton from "../../components/HideFiltersButton/HideFiltersButton"

function ProductsLayout() {
  const params = useParams()
  const [isOpenFilters, setIsOpenFilters] = useState(true)

  if (Object.keys(params).length > 0) return <Outlet />

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <HideFiltersButton
          onClick={() => setIsOpenFilters((currState) => !currState)}
        />
      </div>
      <div className={styles.mainContainer}>
        <section
          className={`${styles.sectionFilters} ${
            !isOpenFilters ? styles.hidden : ""
          }`}
        >
          <h1>Filters</h1>
        </section>
        <section className={styles.sectionProducts}>
          <Outlet />
        </section>
      </div>
    </div>
  )
}

export default ProductsLayout
