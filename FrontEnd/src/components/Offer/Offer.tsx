import styles from "./Offer.module.css"
import Button from "../../components/UI/Button/Button"
import skaterPhoto from "../../assets/images/Boy1.svg"
import { useNavigate } from "react-router-dom"
function Offer() {
  const navigate = useNavigate()
  return (
    <div className={styles.offer}>
      <h1 className={styles.offerText}>
        ХІТ
        <br />
        ПРОДАЖУ
      </h1>
      <div className={styles.orderButtonWrapper}>
        <Button
          variant="primary"
          className={styles.orderButton}
          onClick={() => navigate("/products")}
        >
          Замовити
        </Button>
        <img src={skaterPhoto} alt="skater" className={styles.skater} />
      </div>
    </div>
  )
}

export default Offer
