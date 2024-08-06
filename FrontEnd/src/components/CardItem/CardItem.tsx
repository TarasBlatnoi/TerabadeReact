import styles from "./CardItem.module.css"
import { ProductType } from "../../types"
import { useNavigate } from "react-router-dom"

type CardItemProps = {
  product: ProductType
}

const CardItem = ({ product }: CardItemProps) => {
  const navigate = useNavigate()

  return (
    <li
      className={styles.item}
      onClick={() => {
        navigate(`${product.ProductID}`)
      }}
    >
      <div className={styles.imageContainer}>
        <img
          src={`${product.image}?random=${Math.random() * 10000}`}
          alt={product.name}
        />
      </div>
      <div className={styles.detailsContainer}>
        <h2>{product.name}</h2>
        <h3>{product.productDetails}</h3>
        <p>
          <span>&#x2661;</span>
          додати до улюбленого
        </p>
        <span className={styles.price}>{product.price} $</span>
      </div>
      <div className={styles.buttonContainer}>
        <button>Додати в кошик</button>
      </div>
    </li>
  )
}

export default CardItem
