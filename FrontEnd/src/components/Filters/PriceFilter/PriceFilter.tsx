import CustomCheckBox from "../../CustomCheckBox/CustomCheckBox"
import styles from "../GenderFilter/GenderFilter.module.css"
import { useSearchParams } from "react-router-dom"

function PriceFilter() {
  const [searchParams, setSearchParams] = useSearchParams()
  const minSearchQuery = searchParams.get("min")?.split(",") || []
  const maxSearchQuery = searchParams.get("max")?.split(",") || []

  function handler(min: string, max: string, checked: boolean) {
    setSearchParams((searchParams) => {
      const minQuery = searchParams.get("min")?.split(",")
      const maxQuery = searchParams.get("max")?.split(",")
      console.log(minQuery, maxQuery)
      if (!minQuery && !maxQuery && checked) {
        searchParams.set("max", max)
        searchParams.set("min", min)
      } else if (maxQuery && minQuery && checked) {
        searchParams.set("max", [...maxQuery, max].join(","))
        searchParams.set("min", [...minQuery, min].join(","))
      } else if (maxQuery && minQuery && !checked) {
        const queryParam = [
          ...maxQuery.filter((maxValue) => maxValue !== max),
        ].join(",")
        if (!queryParam) {
          searchParams.delete("max")
          searchParams.delete("min")
        } else {
          searchParams.set("max", queryParam)
          searchParams.set(
            "min",
            [...minQuery.filter((minValue) => minValue !== min)].join(","),
          )
        }
      }
      return searchParams
    })
  }
  function isIncluded(min: string, max: string) {
    return minSearchQuery.includes(min) && maxSearchQuery.includes(max)
  }

  return (
    <div className={styles.container}>
      <h1>Ціна</h1>
      <ul className={styles.list}>
        <li>
          <CustomCheckBox
            id="1000-2500"
            callBack={(checked) => handler("1000", "2500", checked)}
            checkedExt={isIncluded("1000", "2500")}
          />
          <label htmlFor="1000-2500" className={styles.priceLabel}>
            <span>1000</span> <span>-</span> <span>2500</span> UAH
          </label>
        </li>
        <li>
          <CustomCheckBox
            id="2500-3500"
            callBack={(checked) => handler("2500", "3500", checked)}
            checkedExt={isIncluded("2500", "3500")}
          />
          <label htmlFor="2500-3500" className={styles.priceLabel}>
            <span>2500</span> <span>-</span> <span>3500</span> UAH
          </label>
        </li>
        <li className={styles.listItem}>
          <CustomCheckBox
            id="3500-5000"
            callBack={(checked) => handler("3500", "5000", checked)}
            checkedExt={isIncluded("3500", "5000")}
          />
          <label htmlFor="3500-5000" className={styles.priceLabel}>
            <span>3500</span> <span>-</span> <span>5000</span> UAH
          </label>
        </li>
        <li className={styles.listItem}>
          <CustomCheckBox
            id=">5000"
            callBack={(checked) => handler("5000", "Infinity", checked)}
            checkedExt={isIncluded("5000", "Infinity")}
          />
          <label htmlFor=">5000" className={styles.priceLabel}>
            <span>більше</span> <span>5000</span> UAH
          </label>
        </li>
      </ul>
    </div>
  )
}

export default PriceFilter
