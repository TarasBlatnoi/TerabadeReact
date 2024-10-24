import { ImageObject, DetailProductType } from "../../../types"
import styles from "./ImagesContainer.module.css"
import { useImages } from "../../../context/ImageContext"

interface ImagesContainerProps {
  detailProduct: DetailProductType
}

const ImagesContainer = ({ detailProduct }: ImagesContainerProps) => {
  const { activeImage, setActiveImage } = useImages()
  return (
    <div className={styles.productImagesContainer}>
      <div className={styles.smallImages}>
        {detailProduct.images.map((image: ImageObject) => (
          <img
            key={image.ImageOrder}
            src={image.ImageURL || "https://picsum.photos/200"}
            alt={detailProduct.name}
            onMouseEnter={() => {
              setActiveImage(image.ImageURL)
            }}
            className={`${styles.smallImage} ${activeImage === image.ImageURL ? styles.activeSmallImage : ""}`}
          />
        ))}
      </div>
      {detailProduct.images.map((image: ImageObject) => (
        <img
          key={image.ImageOrder}
          src={image.ImageURL || "https://picsum.photos/200"}
          alt={detailProduct.name}
          className={`${
            activeImage === image.ImageURL ? styles.mainImage : styles.hidden
          }`}
        />
      ))}
    </div>
  )
}

export default ImagesContainer
