import { useMemo } from "react"
import styles from "./SizeFilter.module.css"
import stylesFilter from "../GenderFilter/GenderFilter.module.css"
import CustomCheckBox from "../../CustomCheckBox/CustomCheckBox"
import { useDispatch } from "react-redux"
import { updateSize } from "../../../store/Features/FiltersSlice/FiltersSlice"

function SizeFilter() {
  const sizes = useMemo(() => {
    const arr = Array.from({ length: 24 }).fill(3.5) as number[]
    const results = arr.reduce(
      (prev: number[], v, i) => {
        return i === 0
          ? [v]
          : [...prev, prev[i - 1] + (prev[i - 1] < 13 ? 0.5 : 1)]
      },
      [3],
    )
    return results
  }, [])

  const dispatch = useDispatch()

  function handler(size: number, checked: boolean) {
    dispatch(updateSize({ size, action: checked ? "add" : "delete" }))
  }

  return (
    <div className={stylesFilter.container}>
      <h1>Розмір</h1>
      <ul className={styles.list}>
        {sizes.map((size) => {
          return (
            <li className={styles.item} key={size}>
              <CustomCheckBox
                style={{ width: "100%", height: "100%" }}
                callBack={(checked) => handler(size, checked)}
              >
                <div className={styles.sizeContainer}>
                  <span>{size}</span>
                </div>
              </CustomCheckBox>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SizeFilter
