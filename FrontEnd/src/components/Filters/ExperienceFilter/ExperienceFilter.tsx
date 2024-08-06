import styles from "../GenderFilter/GenderFilter.module.css"

function ExperienceFilter() {
  return (
    <div className={styles.container}>
      <h1>Ціна</h1>
      <ul className={styles.list}>
        <li>
          <input type="checkbox" id="loose-flexible" />
          <label htmlFor="loose-flexible">Вільне і гнучке</label>
        </li>
        <li>
          <input type="checkbox" id="soft-supportive" />
          <label htmlFor="soft-supportive">М`яке і підтримує</label>
        </li>
        <li>
          <input type="checkbox" id="elastic" />
          <label htmlFor="elastic">Пружнє</label>
        </li>
        <li>
          <input type="checkbox" id="light" />
          <label htmlFor="light">Легке</label>
        </li>
      </ul>
    </div>
  )
}

export default ExperienceFilter
