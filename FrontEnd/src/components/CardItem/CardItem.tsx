import styles from "./CardItem.module.css"
import { ProductType } from "../../types"
import { useNavigate } from "react-router-dom"
import Button from "../UI/Button/Button"
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
        <h1 className={styles.productName}>{product.name}</h1>
        <p className={styles.productType}>{product.type}</p>
        <p className={styles.favoriteText}>
          <span className={styles.heart}>&#x2661;</span>
          додати до улюбленого
        </p>
        <p className={styles.price}>
          {formaterCurrency.format(5000 + product.price)} <span>UAH</span>{" "}
        </p>
      </div>
      <div className={styles.buttonContainer}>
        <Button variant="secondary" className={styles.addButton}>
          Додати в кошик
        </Button>
      </div>
    </li>
  )
}

export default CardItem
