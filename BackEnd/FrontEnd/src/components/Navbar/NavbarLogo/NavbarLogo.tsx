import logo from "../../../assets/images/Terabade.svg"
import styles from "./NavbarLogo.module.css"
import { Link } from "react-router-dom"

const NavbarLogo = () => {
  return (
    <Link to="/">
      <img className={styles.logo} src={logo} alt="TerabadeLogo" />
    </Link>
  )
}

export default NavbarLogo
