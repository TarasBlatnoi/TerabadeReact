import NavbarImg from "../../assets/images/WhiteSpot.png"
import styles from "./WhiteSpot.module.css"
import { useLocation } from "react-router-dom"
const WhiteSpot = () => {
  const location = useLocation()
  const isHomeLocation = location.pathname === "/"
  return (
    <>
      {isHomeLocation ? (
        <>
          <div className={styles.whiteRect}></div>
          <img
            className={styles.whiteSpotImg}
            src={NavbarImg}
            alt="white-spot"
          />
        </>
      ) : (
        <div className={styles.whiteRect}></div>
      )}
    </>
  )
}

export default WhiteSpot
