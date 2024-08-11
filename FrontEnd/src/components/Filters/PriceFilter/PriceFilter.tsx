import CustomCheckBox from "../../CustomCheckBox/CustomCheckBox"
import styles from "../GenderFilter/GenderFilter.module.css"

function PriceFilter() {
  return (
    <div className={styles.container}>
      <h1>Ціна</h1>
      <ul className={styles.list}>
        <li>
          <CustomCheckBox id="1000-2500" />
          <label htmlFor="1000-2500" className={styles.priceLabel}>
            <span>1000</span> <span>-</span> <span>2500</span> UAH
          </label>
        </li>
        <li>
          <CustomCheckBox id="2500-3500" />
          <label htmlFor="2500-3500" className={styles.priceLabel}>
            <span>2500</span> <span>-</span> <span>3500</span> UAH
          </label>
        </li>
        <li className={styles.listItem}>
          <CustomCheckBox id="3500-5000" />
          <label htmlFor="3500-5000" className={styles.priceLabel}>
            <span>3500</span> <span>-</span> <span>5000</span> UAH
          </label>
        </li>
      </ul>
    </div>
  )
}

export default PriceFilter
