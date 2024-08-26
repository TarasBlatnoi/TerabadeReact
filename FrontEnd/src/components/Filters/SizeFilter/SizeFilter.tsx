import { useMemo } from "react"
import styles from "./SizeFilter.module.css"
import stylesFilter from "../GenderFilter/GenderFilter.module.css"
import CustomCheckBox from "../../CustomCheckBox/CustomCheckBox"
import { useSearchParams } from "react-router-dom"

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

  const [searchParams, setSearchParams] = useSearchParams()

  function handler(size: string, checked: boolean) {
    setSearchParams((searchParams) => {
      const sizeQuery = searchParams.get("size")?.split(",")
      if (!sizeQuery) searchParams.set("size", size)
      else if (sizeQuery && checked) {
        searchParams.set("size", [...sizeQuery, size].join(","))
      } else if (sizeQuery && !checked) {
        const queryParam = sizeQuery
          .filter((sizeValue) => sizeValue !== size)
          .join(",")
        if (!queryParam) searchParams.delete("size")
        else searchParams.set("size", queryParam)
      }
      return searchParams
    })
  }

  function isIncluded(size: string) {
    return searchParams.get("size")?.split(",").includes(size)
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
                callBack={(checked) => handler(String(size), checked)}
                checkedExt={isIncluded(String(size))}
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
