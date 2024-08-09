import CustomCheckBox from "../../CustomCheckBox/CustomCheckBox"
import styles from "../GenderFilter/GenderFilter.module.css"

function PriceFilter() {
  return (
    <div className={styles.container}>
      <h1>Ціна</h1>
      <ul className={styles.list}>
        <li>
          <CustomCheckBox id="1000-2000" />
          <label htmlFor="1000-2000">1000-2500 UAH</label>
        </li>
        <li>
          <CustomCheckBox id="2500-3500" />
          <label htmlFor="2500-3500">2500-3500 UAH</label>
        </li>
        <li className={styles.listItem}>
          <CustomCheckBox id="3500-5000" />
          <label htmlFor="3500-5000">3500-5000 UAH</label>
        </li>
      </ul>
    </div>
  )
}

export default PriceFilter
