import styles from "../GenderFilter/GenderFilter.module.css"

function TypeFilter() {
  return (
    <div className={styles.container}>
      <h1>Ціна</h1>
      <ul className={styles.list}>
        <li>
          <input type="checkbox" id="every-day" />
          <label htmlFor="every-day">Щоденний біг</label>
        </li>
        <li>
          <input type="checkbox" id="2500-3500" />
          <label htmlFor="2500-3500">Дорожній біг</label>
        </li>
      </ul>
    </div>
  )
}

export default TypeFilter
