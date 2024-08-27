import styles from "./ThreePoints.module.css"
import firstShoe from "../../assets/images/Mask group.jpg"
import secondShoe from "../../assets/images/Mask group (2).jpg"
import thirdShoe from "../../assets/images/Mask group (1).jpg"
import ropeFirst from "../../assets/images/Мотузка№1 1.png"
import ropeSecond from "../../assets/images/Мотузка№1 2.png"

interface ThreePointsProps {
  isLoading: boolean
}

const ThreePoints = ({ isLoading }: ThreePointsProps) => {
  return (
    <div
      className={styles.threePointContainer}
      style={{ visibility: isLoading ? "hidden" : "visible" }}
    >
      <div>
        <img
          className={styles.imageShoe}
          src={firstShoe}
          alt="Picture of shoe"
        />
      </div>
      <div>
        <h2 className={styles.title}>Сміливість</h2>
      </div>
      <div>
        <img
          className={styles.imageShoe}
          src={secondShoe}
          alt="Picture of shoe"
        />
      </div>
      <div>
        <h2 className={styles.title}>Комфорт</h2>
      </div>
      <div>
        <img
          className={styles.imageShoe}
          src={thirdShoe}
          alt="Picture of shoe"
        />
      </div>
      <div>
        <h2 className={styles.title}>Стиль</h2>
      </div>
      <img src={ropeFirst} alt="rope first" className={styles.firstRope} />
      <img src={ropeSecond} alt="rope second" className={styles.secondRope} />
    </div>
  )
}

export default ThreePoints
