import { ImageObject, DetailProductType } from "../../../types"
import styles from "./ImagesContainer.module.css"

interface ImagesContainerProps {
  detailProduct: DetailProductType
}

const ImagesContainer = ({ detailProduct }: ImagesContainerProps) => {
  return (
    <div className={styles.productImagesContainer}>
      <div className={styles.smallImages}>
        {detailProduct.images.map((image: ImageObject) => {
          return (
            <img
              key={image.ImageOrder}
              src={`${image.ImageURL}`}
              alt={detailProduct.name}
              className={styles.smallImage}
            />
          )
        })}
      </div>
      <img
        src={`${detailProduct.images[0].ImageURL}`}
        alt={detailProduct.name}
        className={styles.mainImage}
      />
    </div>
  )
}

export default ImagesContainer
