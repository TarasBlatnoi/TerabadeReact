import styles from "./CardItem.module.css"
import { ProductType } from "../../types"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { storeType } from "../../store/store"
import { useImages } from "../../context/ImageContext"
import { forwardRef, ReactNode } from "react"

type CardItemProps = {
  product: ProductType
  className?: string
  style?: any
  children?: ReactNode
  edit?: boolean
  button?: ReactNode
}

export const formaterCurrency = Intl.NumberFormat("fr-FR", {
  maximumFractionDigits: 1,
})

const CardItem = forwardRef<HTMLLIElement, CardItemProps>(
  (
    { product, className, style, children, edit, button }: CardItemProps,
    ref,
  ) => {
    const navigate = useNavigate()
    const { setActiveImage } = useImages()
    const location = useLocation()
    const isOpenFilters = useSelector(
      (store: storeType) => store.filters.visibility,
    )
    const [searchParams] = useSearchParams()
    const searchParamsString = searchParams.toString()
    console.log(`/product/`)
    return (
      <li
        className={`${styles.item} ${className} ${
          !isOpenFilters ? styles.itemExpanded : ""
        }`}
        style={style}
        onClick={() => {
          setActiveImage(product.ImageURL)
          window.scrollTo(0, 0)
          navigate(`/product/${product.ProductID}`, {
            state: {
              previousLocationPathname: `${location.pathname}?${searchParamsString}`,
            },
          })
        }}
        ref={ref}
      >
        {edit ? children : null}
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
              {formaterCurrency.format(product.price)} <span>UAH</span>
            </p>
          </div>
        </div>
        {button}
      </li>
    )
  },
)

export default CardItem
