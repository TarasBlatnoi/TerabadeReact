import { useMemo } from "react"
import styles from "./SizeFilter.module.css"
import stylesFilter from "../GenderFilter/GenderFilter.module.css"

function SizeFilter() {
  const sizes = useMemo(() => {
    const arr = Array.from({ length: 24 }).fill(3.5) as number[]
    const results = arr.reduce(
      (prev: number[], v, i) => {
        return i === 0
          ? [v]
          : [...prev, prev[i - 1] + (prev[i - 1] < 13 ? 0.5 : 1)]
      },
      [3]
    )
    return results
  }, [])

  return (
    <div className={stylesFilter.container}>
      <h1>Розмір</h1>
      <ul className={styles.list}>
        {sizes.map((size) => {
          return (
            <li className={styles.item} key={size}>
              <span>{size}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SizeFilter
