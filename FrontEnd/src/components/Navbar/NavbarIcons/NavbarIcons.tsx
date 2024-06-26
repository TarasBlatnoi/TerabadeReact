import styles from "./NavbarIcons.module.css"
import userIcon from "../../../assets/images/user.svg"
import heartIcon from "../../../assets/images/heart.svg"
import baskerIcon from "../../../assets/images/Basket.svg"
import { Link } from "react-router-dom"

const NavbarIcons = () => {
  return (
    <div className={styles.header__icons}>
      <p className="tooltip" data-tooltip="" id="tooltipElement">
        <Link to="login">
          <img className={styles.icon} src={userIcon} alt="user" />
        </Link>
      </p>
      <Link to="favorites">
        <img className={styles.icon} src={heartIcon} alt="heart" />
      </Link>
      <div className={styles.cartBtn}>
        <span className="nav-icon">
          <img className={styles.icon} src={baskerIcon} alt="basket" />
        </span>
        <div className={styles.cartItems}>0</div>
      </div>
    </div>
  )
}

export default NavbarIcons
