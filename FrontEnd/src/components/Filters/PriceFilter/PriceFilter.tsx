import { useDispatch } from "react-redux"
import CustomCheckBox from "../../CustomCheckBox/CustomCheckBox"
import styles from "../GenderFilter/GenderFilter.module.css"
import { useNavigate, useSearchParams } from "react-router-dom"

function PriceFilter() {
  const dispath = useDispatch()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  function handler(min: string, max: string, checked: boolean) {
    setSearchParams((prev) => {
      const minQuery = prev.getAll("min")
      const maxQuery = prev.getAll("max")
      console.log(minQuery, maxQuery)
      if (!minQuery && !maxQuery && checked) return { max: max, min: min }
      else if (maxQuery && minQuery && checked)
        return {
          max: [...maxQuery, max],
          min: [...minQuery, min],
        }
      else if (maxQuery && minQuery && !checked) {
        return {
          max: [...maxQuery.filter((maxValue) => maxValue !== max)],
          min: [...minQuery.filter((minValue) => minValue !== min)],
        }
      }
    })
  }

  return (
    <div className={styles.container}>
      <h1>Ціна</h1>
      <ul className={styles.list}>
        <li>
          <CustomCheckBox
            id="1000-2500"
            callBack={(checked) => handler("1000", "2500", checked)}
          />
          <label htmlFor="1000-2500" className={styles.priceLabel}>
            <span>1000</span> <span>-</span> <span>2500</span> UAH
          </label>
        </li>
        <li>
          <CustomCheckBox
            id="2500-3500"
            callBack={(checked) => handler("2500", "3500", checked)}
          />
          <label htmlFor="2500-3500" className={styles.priceLabel}>
            <span>2500</span> <span>-</span> <span>3500</span> UAH
          </label>
        </li>
        <li className={styles.listItem}>
          <CustomCheckBox
            id="3500-5000"
            callBack={(checked) => handler("3500", "5000", checked)}
          />
          <label htmlFor="3500-5000" className={styles.priceLabel}>
            <span>3500</span> <span>-</span> <span>5000</span> UAH
          </label>
        </li>
        <li className={styles.listItem}>
          <CustomCheckBox
            id=">5000"
            callBack={(checked) => handler("5000", "Infinity", checked)}
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
