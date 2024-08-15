import styles from "./Footer.module.css"
import footerImg from "../../assets/images/Vector 5.svg"

import FooterItemList from "./FooterItemList/FooterItemList"
import Copyright from "./Copyright/Copyright"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <img
        className={styles.footerImg}
        alt="Image for footer"
        src={footerImg}
      />
      <FooterItemList />
      <Copyright />
    </footer>
  )
}

export default Footer
