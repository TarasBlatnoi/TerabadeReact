import styles from "./NavbarIcons.module.css"
import userIcon from "../../../assets/images/user.svg"
import heartIcon from "../../../assets/images/heart.svg"
import baskerIcon from "../../../assets/images/Basket.svg"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { CartContext } from "../../../context/CartContext"
import { AuthContext } from "../../../context/AuthContext"
import LogoutButton from "./LogoutButton/LogoutButton"

const NavbarIcons = () => {
  const { openCart, cartItems } = useContext(CartContext)
  const { isLoggedIn, isLoading } = useContext(AuthContext)

  return (
    <div className={styles.header__icons}>
      <Link to="favorites">
        <img className={styles.icon} src={heartIcon} alt="heart" />
      </Link>
      <div className={styles.cartBtn} onClick={openCart}>
        <span className="nav-icon">
          <img className={styles.icon} src={baskerIcon} alt="basket" />
        </span>
        <div className={styles.cartItems}>{cartItems.length}</div>
      </div>
      {isLoading ? (
        <div className={`${styles.userIcon} ${styles.loadingPlaceholder}`}>
          <img className={styles.icon} src={userIcon} alt="user" />
        </div>
      ) : isLoggedIn ? (
        <LogoutButton />
      ) : (
        <div className={styles.userIcon}>
          <Link to="login">
            <img className={styles.icon} src={userIcon} alt="user" />
          </Link>
        </div>
      )}
    </div>
  )
}

export default NavbarIcons
