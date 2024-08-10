import { useEffect, useRef, useState } from "react"
import { ProductType } from "../../types"
import CardItem from "../CardItem/CardItem"
import styles from "./YouMightAlsoLike.module.css"
import Arrow from "./Arrow/Arrow"

type YouMightAlsoLikeProps = {
  products: ProductType[]
}

function YouMightAlsoLike({ products }: YouMightAlsoLikeProps) {
  const [scrollPos, setScrollPos] = useState(0)
  const slider = useRef(null) as { current: null | HTMLUListElement }

  console.log(scrollPos)
  return (
    <section className={styles.section}>
      <div className={styles.controlButtons}>
        <Arrow
          inverted={true}
          className={styles.arrow}
          onClick={() => setScrollPos((curr) => curr + 100)}
        />
        <Arrow
          className={styles.arrow}
          onClick={() => setScrollPos((curr) => curr - 100)}
        />
      </div>
      <ul className={styles.list} ref={slider}>
        {products.map((product) => (
          <CardItem product={product} className={styles.recommendedProduct} />
        ))}
      </ul>
    </section>
  )
}

export default YouMightAlsoLike
