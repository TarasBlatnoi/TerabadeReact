import styles from "./CardItem.module.css"
import { ProductType } from "../../types/Product"
import { Link } from "react-router-dom"

type CardItemProps = {
  product: ProductType
}

const CardItem = ({ product }: CardItemProps) => {
  return (
    <div className={styles.item}>
      <Link to={`${product.ProductID}`}>
        <h3 style={{ margin: "auto", width: "80%", textAlign: "center" }}>
          {product.name}
        </h3>
        <img
          src={`data:image/jpeg;base64,${product.image}`}
          alt={product.name}
          style={{ width: "90%", height: "80%" }}
        />
      </Link>
    </div>
  )
}

export default CardItem
