import Offer from "../../components/Offer/Offer"
import styles from "./Home.module.css"
import sneakersPhoto from "../../assets/images/Sneakers1.png"

import whiteArea from "../../assets/images/whiteArea1.png"
import footSteps1 from "../../assets/images/Foot1.svg"
import PreviewImgList from "../../components/PreviewImgList/PreviewImgList"

const Home = () => {
  return (
    <>
      <section className={styles.heroSection}>
        <Offer />
        <div>
          <img src={sneakersPhoto} alt="sneakers" className={styles.sneakers} />

          {/* <img src={whiteArea} alt="area-steps" className={styles.whiteArea} />
        <img src={footSteps1} alt="steps" className={styles.footSteps} />
        <img src={footSteps1} alt="steps" className={styles.footStepsRotated} /> */}
        </div>
      </section>
      <PreviewImgList />
    </>
  )
}

export default Home
