import styles from "./Offer.module.css"

function Offer() {
  return (
    <div className={styles.offer}>
      <h1 className={styles.offerText}>
        ХІТ
        <br />
        ПРОДАЖУ
      </h1>
      <button className={styles.orderButton}>ЗАМОВИТИ</button>
    </div>
  )
}

export default Offer
