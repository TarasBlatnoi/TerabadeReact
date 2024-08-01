import { Outlet } from "react-router-dom"
import styles from "./Products.module.css"

function ProductsLayout() {
  return (
    <div className={styles.container}>
      <section className={styles.sectionFilters}>
        <h1>Filters</h1>
      </section>
      <section className={styles.sectionProducts}>
        <Outlet />
      </section>
    </div>
  )
}

export default ProductsLayout
