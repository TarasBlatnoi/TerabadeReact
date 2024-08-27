import { Outlet, useLocation } from "react-router-dom"
import styles from "./ProductsLayout.module.css"
import HideFiltersButton from "../../components/HideFiltersButton/HideFiltersButton"
import { SortProvider } from "../../context/SortContext"
import SortSelection from "../../components/SortSelection/SortSelection"
import Filters from "../../components/Filters/Filters"
import { useSelector } from "react-redux"
import { storeType } from "../../store/store"
import { useProductsCount } from "../../context/ProductsContext"

function ProductsLayout() {
  const location = useLocation()
  const isOpenFilters = useSelector(
    (store: storeType) => store.filters.visibility,
  )
  const { productsAmount } = useProductsCount()

  const pathname = location.pathname.replace("/", "")
  const gender =
    pathname === "men"
      ? "Чоловічий одяг"
      : pathname === "women"
        ? "Жіночий одяг"
        : pathname === "children"
          ? "Дитячий одяг"
          : pathname === "products"
            ? "Одяг"
            : "Одяг"

  return (
    <SortProvider>
      <div className={styles.container}>
        <div className={styles.topContainer}>
          <div className={styles.genderNameContainer}>
            <h2>
              {`${gender} `}
              <span>({productsAmount})</span>
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
            <Outlet />
          </section>
        </div>
      </div>
    </SortProvider>
  )
}

export default ProductsLayout
