import styles from "./CardItem.module.css"
import { ProductType } from "../../types/Product"

type CardItemProps = {
  product: ProductType
}

const CardItem = ({ product }: CardItemProps) => {
  function handleClick() {}
  return (
    <div className={styles.item}>
      <h3 style={{ margin: "auto", width: "80%", textAlign: "center" }}>
        {product.name}
      </h3>
      <img
        src={`data:image/jpeg;base64,${product.image}`}
        alt={product.name}
        style={{ width: "90%", height: "80%" }}
      />
      <button onClick={handleClick}>
        <i> додати в кошик</i>
      </button>
    </div>
  )
}

export default CardItem
