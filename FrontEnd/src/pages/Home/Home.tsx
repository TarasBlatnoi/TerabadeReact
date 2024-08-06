import Offer from "../../components/Offer/Offer"
import styles from "./Home.module.css"
import sneakersPhoto from "../../assets/images/Sneakers1.png"

import middleWhiteSpot from "../../assets/images/middleWhiteSpot.svg"
import footSteps from "../../assets/images/Foot1.svg"
import footStepsSmall from "../../assets/images/Foot2.svg"
import PreviewImgList from "../../components/PreviewImgList/PreviewImgList"
import Carousel from "../../components/Carousel/Carousel"
import ThreePoints from "../../components/ThreePoints/ThreePoints"
import Partners from "../../components/Partnerns/Partners"

const Home = () => {
  return (
    <>
      <section className={styles.heroSection}>
        <Offer />
        <div>
          <img src={sneakersPhoto} alt="sneakers" className={styles.sneakers} />
        </div>
      </section>
      <PreviewImgList />

      <img
        src={middleWhiteSpot}
        alt="area-steps"
        className={styles.whiteArea}
      />

      <div className={styles.rectangle}>
        <h2 className={styles.bestHeading}>Найкращі</h2>
      </div>

      <img src={footSteps} alt="steps" className={styles.footSteps} />

      <img src={footStepsSmall} alt="steps" className={styles.footStepsSmall} />

      <Carousel />
      <h2 className={styles.sneakersText}>
        Кросівки - це не просто взуття, це стиль життя, що дозволяє крокувати
        вперед з комфортом та впевненістю
      </h2>
      <ThreePoints />
      <Partners />
    </>
  )
}

export default Home
