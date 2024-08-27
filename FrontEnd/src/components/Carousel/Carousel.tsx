import AdventureCarousel from "../../assets/images/AdventureCarousel.jpg"
import styles from "./Caroutsel.module.css"
import Button from "../../components/UI/Button/Button"

const Carousel = () => {
  return (
    <div className={styles.carousel}>
      <div className={styles.carouselText}>
        <h2 className={styles.carouselTitle}>
          Nike Air Zoom Pegasus 38 Shield
        </h2>
        <div className={styles.carouselTextSubSections}>
          <h3>Призначеня</h3>
          <p>Біг</p>
          <p>Повсякденне життя</p>
          <h3>Кількість проданних пар</h3>
          <p>353</p>
          <h3>Залишилось</h3>
          <p>27</p>
        </div>
        <p className={styles.carouselTextP}></p>
        <div className={styles.orderContainer}>
          <h3 className={`${styles.priceHeading} nowrap`}>Ціна: 3780 грн</h3>
          <Button className={styles.orderButton} variant="primary">
            Замовити
          </Button>
        </div>
      </div>
      <div className={styles.carouselPhoto}>
        <img
          src={AdventureCarousel}
          alt="Shoes with nice background"
          className={styles.carouselImg}
        />
        <div className={styles.dots}>
          <button className={`${styles.dot} ${styles.dotFilled}`}>
            &nbsp;
          </button>
          <button className={`${styles.dot}`}>&nbsp;</button>
          <button className={`${styles.dot}`}>&nbsp;</button>
        </div>
      </div>
    </div>
  )
}

export default Carousel
