import styles from "./CardItem.module.css"
import { ProductType } from "../../types"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { storeType } from "../../store/store"
import { useImages } from "../../context/ImageContext"

type CardItemProps = {
  product: ProductType
  className?: string
  style?: any
}

export const formaterCurrency = Intl.NumberFormat("fr-FR", {
  maximumFractionDigits: 1,
})

const CardItem = ({ product, className, style }: CardItemProps) => {
  const navigate = useNavigate()
  const { setActiveImage } = useImages()
  const isOpenFilters = useSelector(
    (store: storeType) => store.filters.visibility,
  )

  return (
    <li
      className={`${styles.item} ${className} ${
        !isOpenFilters ? styles.itemExpanded : ""
      }`}
      style={style}
      onClick={() => {
        setActiveImage(product.ImageURL)
        window.scrollTo(0, 0)
        navigate(`/product/${product.ProductID}`)
      }}
    >
      <div className={styles.imageContainer}>
        <img
          src={product.ImageURL || "https://picsum.photos/200"}
          alt={product.name}
        />
      </div>
      <div className={styles.infoDetailsContainer}>
        <div className={styles.detailsContainer}>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.productType}>{product.type}</p>
          <p className={styles.price}>
            {formaterCurrency.format(product.price)} <span>UAH</span>{" "}
          </p>
        </div>
      </div>
    </li>
  )
}

export default CardItem
