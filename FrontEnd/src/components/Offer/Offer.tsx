import styles from "./Offer.module.css"
import Button from "../UI/Button/Button"
function Offer() {
  return (
    <div className={styles.offer}>
      <h1 className={styles.offerText}>
        ХІТ
        <br />
        ПРОДАЖУ
      </h1>
      <Button variant="primary">Замовити</Button>
    </div>
  )
}

export default Offer
