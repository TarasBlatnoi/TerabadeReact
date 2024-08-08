import CustomCheckBox from "../../CustomCheckBox/CustomCheckBox"
import styles from "../GenderFilter/GenderFilter.module.css"

function TypeFilter() {
  return (
    <div className={styles.container}>
      <h1>Ціна</h1>
      <ul className={styles.list}>
        <li>
          <CustomCheckBox id="every-day" />
          <label htmlFor="every-day">Щоденний біг</label>
        </li>
        <li>
          <CustomCheckBox id="road-runner" />
          <label htmlFor="road-runner">Дорожній біг</label>
        </li>
      </ul>
    </div>
  )
}

export default TypeFilter
