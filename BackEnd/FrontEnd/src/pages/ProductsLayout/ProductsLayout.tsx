import { Outlet, useLocation } from "react-router-dom"
import styles from "./ProductsLayout.module.css"
import HideFiltersButton from "../../components/HideFiltersButton/HideFiltersButton"
import { SortProvider } from "../../context/SortContext"
import SortSelection from "../../components/SortSelection/SortSelection"
import Filters from "../../components/Filters/Filters"
import { Suspense } from "react"
import { useSelector } from "react-redux"
import { storeType } from "../../store/store"

function ProductsLayout() {
  const location = useLocation()
  const isOpenFilters = useSelector(
    (store: storeType) => store.filters.visibility
  )

  const pathname = location.pathname.replace("/", "")
  const gender =
    pathname === "men" ? "Чоловіче" : pathname === "women" ? "Жіноче" : "Дитяче"

  return (
    <SortProvider>
      <div className={styles.container}>
        <div className={styles.topContainer}>
          <div className={styles.genderNameContainer}>
            <h2>
              {gender} взуття <span>(67)</span>
            </h2>
          </div>
          <div className={styles.hideFiltersContainer}>
            <HideFiltersButton />
            <SortSelection />
          </div>
        </div>
        <div className={styles.mainContainer}>
          <section
            className={`${styles.sectionFilters} ${
              !isOpenFilters ? styles.hidden : ""
            }`}
          >
            <Filters />
          </section>
          <section
            className={`${styles.sectionProducts} ${
              !isOpenFilters ? styles.sectionProductsExpanded : ""
            }`}
          >
            <Suspense fallback={<h1>Loading...Suspense</h1>}>
              <Outlet />
            </Suspense>
          </section>
        </div>
      </div>
    </SortProvider>
  )
}

export default ProductsLayout
