import styles from "./Partners.module.css"
import adidas from "../../assets/images/Adidas 1.png"
import nike from "../../assets/images/Nike-Logo-PNG 1.png"
import puma from "../../assets/images/puma-logo-png-7 1.png"
import reebok from "../../assets/images/Reebok-Logo-Background-PNG-Image 1.png"

interface PartnersProps {
  isLoading: boolean
}

const Partners = ({ isLoading }: PartnersProps) => {
  return (
    <>
      {!isLoading && (
        <>
          <h1 className={styles.partnersTitle}>Наші партнери</h1>
          <div className={styles.partners}>
            <img src={adidas} alt="adidas logo" />
            <img src={nike} alt="nike logo" />
            <img src={puma} alt="puma logo" />
            <img src={reebok} alt="reebok logo" />
          </div>
        </>
      )}
    </>
  )
}

export default Partners
