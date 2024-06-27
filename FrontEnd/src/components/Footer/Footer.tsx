import styles from "./Footer.module.css"

import FooterItemList from "./FooterItemList/FooterItemList"
import Copyright from "./Copyright/Copyright"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <FooterItemList />
      <Copyright />
    </footer>
  )
}

export default Footer
