import styles from "./GenderFilter.module.css"

function GenderFilter() {
  return (
    <div className={styles.container}>
      <h1>Стать</h1>
      <ul className={styles.list}>
        <li>
          <input type="checkbox" id="men" />
          <label htmlFor="men">Чоловікам</label>
        </li>
        <li>
          <input type="checkbox" id="women" />
          <label htmlFor="women">Жінкам</label>
        </li>
        <li className={styles.listItem}>
          <input type="checkbox" id="children" />
          <label htmlFor="children">Дітям</label>
        </li>
      </ul>
    </div>
  )
}

export default GenderFilter
