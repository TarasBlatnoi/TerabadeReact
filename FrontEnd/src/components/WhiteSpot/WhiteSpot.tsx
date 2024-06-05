import NavbarImg from "../../assets/images/WhiteSpot.png"
import styles from "./WhiteSpot.module.css"
const WhiteSpot = () => {
  return (
    <div className={styles.whiteSpotContainer}>
      <img className={styles.whiteSpotImg} src={NavbarImg} alt="white-spot" />
    </div>
  )
}

export default WhiteSpot
