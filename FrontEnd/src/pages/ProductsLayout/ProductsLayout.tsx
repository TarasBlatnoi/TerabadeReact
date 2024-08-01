import { Outlet, useParams } from "react-router-dom"
import styles from "./ProductsLayout.module.css"

function ProductsLayout() {
  const params = useParams()

  if (Object.keys(params).length > 0) return <Outlet />

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
