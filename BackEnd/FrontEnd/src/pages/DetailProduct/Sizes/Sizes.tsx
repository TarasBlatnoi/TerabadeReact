import { useState } from "react"
import styles from "./Sizes.module.css"

interface SizesProps {
  begin: number
  end: number
  step: number
}

const Sizes = ({ begin, end, step }: SizesProps) => {
  const sizesElements = []
  const [chosedSize, setChoseSize] = useState(0)
  for (let i = begin; i < end; i += step) {
    sizesElements.push(
      <div
        className={`${styles.sizeRect} ${
          chosedSize === i ? styles.sizeRectFilled : undefined
        }`}
        onClick={() => {
          setChoseSize(i)
        }}
        key={i}
      >
        {i}
      </div>
    )
  }
  return (
    <div className={styles.sizesContainer}>
      <div className={styles.sizesTextConteiner}>
        <p>Обрати розмір</p>
        <p>Довідник розмірів</p>
      </div>
      <div className={styles.sizeRectContainer}>{sizesElements}</div>
    </div>
  )
}

export default Sizes
