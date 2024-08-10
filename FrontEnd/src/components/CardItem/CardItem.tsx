import styles from "./CardItem.module.css"
import { ProductType } from "../../types"
import { useNavigate } from "react-router-dom"
import { useFilters } from "../../context/FiltersContext"

type CardItemProps = {
  product: ProductType
}

const formaterCurrency = Intl.NumberFormat("fr-FR", {
  maximumFractionDigits: 0,
})

const CardItem = ({ product }: CardItemProps) => {
  const navigate = useNavigate()

  const { isOpenFilters } = useFilters()

  return (
    <li
      className={`${styles.item} ${!isOpenFilters ? styles.itemExpanded : ""}`}
      onClick={() => {
        navigate(`/product/${product.ProductID}`)
      }}
    >
      <div className={styles.imageContainer}>
        <img
          src={`${product.image}?random=${Math.random() * 10000}`}
          alt={product.name}
        />
      </div>
      <div className={styles.infoDetailsContainer}>
        <div className={styles.detailsContainer}>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.productType}>{product.type}</p>
          <p className={styles.price}>
            {formaterCurrency.format(5000 + product.price)} <span>UAH</span>{" "}
          </p>
        </div>
      </div>
    </li>
  )
}

export default CardItem
