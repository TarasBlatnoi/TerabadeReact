import { useRef } from "react"
import { ProductType } from "../../types"
import CardItem from "../CardItem/CardItem"
import styles from "./YouMightAlsoLike.module.css"
import Arrow from "./Arrow/Arrow"

type YouMightAlsoLikeProps = {
  products: ProductType[]
}

function YouMightAlsoLike({ products }: YouMightAlsoLikeProps) {
  const ulListRef = useRef(null) as { current: null | HTMLUListElement }

  function handleScroll(forward: boolean) {
    const ulListEl = ulListRef.current
    if (ulListEl) {
      const widthOfItem =
        ulListEl.firstElementChild?.getBoundingClientRect().width

      const itemsGap = Number.parseFloat(
        document.defaultView?.getComputedStyle(ulListEl).columnGap || ""
      )

      ulListEl.scrollBy({
        left: forward ? widthOfItem! + itemsGap : -widthOfItem! - itemsGap,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.controlButtons}>
        <Arrow
          inverted={true}
          className={styles.arrow}
          onClick={() => handleScroll(false)}
        />
        <Arrow className={styles.arrow} onClick={() => handleScroll(true)} />
      </div>
      <ul className={styles.list} ref={ulListRef}>
        {products.map((product) => (
          <CardItem
            product={product}
            className={styles.recommendedProduct}
            key={product.ProductID}
          />
        ))}
      </ul>
    </section>
  )
}

export default YouMightAlsoLike
