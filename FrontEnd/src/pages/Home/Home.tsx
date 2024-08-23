import Offer from "../../components/Offer/Offer"
import styles from "./Home.module.css"
import sneakersPhoto from "../../assets/images/Sneakers1.png"

import middleWhiteSpot from "../../assets/images/HomePageFixed.png"
import PreviewImgList from "../../components/PreviewImgList/PreviewImgList"
import Carousel from "../../components/Carousel/Carousel"
import ThreePoints from "../../components/ThreePoints/ThreePoints"
import Partners from "../../components/Partnerns/Partners"
import ImageStateful from "../../components/UI/ImageStateful/ImageStateful"
import { useState } from "react"

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  return (
    <>
      <div className={styles.mainDivWrapper}>
        <section className={styles.heroSection}>
          <Offer />

          <div className={styles.offerSneakers}>
            <ImageStateful
              src={sneakersPhoto}
              className={styles.sneakers}
              alt="sneakers"
              height={"71rem"}
            />
          </div>
        </section>
        <PreviewImgList />

        <div className={styles.bgImage}>
          <ImageStateful
            src={middleWhiteSpot}
            alt="area-steps"
            className={styles.whiteArea}
            height="89rem"
            setIsLoading={setIsLoading}
          />
          <div
            className={styles.rectangleBgCover}
            style={{ visibility: isLoading ? "hidden" : "visible" }}
          ></div>
          <div className={styles.rectangle}>
            <h2 className={styles.bestHeading}>Найкращі</h2>
          </div>
        </div>

        <Carousel />
        <h2 className={styles.sneakersText}>
          Кросівки - це не просто взуття, це стиль життя, що дозволяє крокувати
          вперед з комфортом та впевненістю
        </h2>
        <ThreePoints />
        <Partners />
      </div>
    </>
  )
}

export default Home
