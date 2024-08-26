import { useNavigate } from "react-router-dom"
import notFoundImg from "../../assets/images/404.png"
import Button from "../../components/UI/Button/Button"
import styles from "./NotFound.module.css"

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={notFoundImg} alt="404 not found" />
      </div>
      <div className={styles.errorInfoContainer}>
        <h1 className={styles.infoError}>Not found</h1>
        <Button
          variant="primary"
          className={styles.button}
          onClick={() => navigate("/")}
        >
          Перейти на головну
        </Button>
      </div>
    </div>
  )
}

export default NotFound
