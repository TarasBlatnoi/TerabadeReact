import { useState } from "react"
import { ImageObject, DetailProductType } from "../../../types"
import styles from "./ImagesContainer.module.css"

interface ImagesContainerProps {
  detailProduct: DetailProductType
}

const ImagesContainer = ({ detailProduct }: ImagesContainerProps) => {
  const [activeImage, setActiveImage] = useState<string>(
    detailProduct.images[0].ImageURL
  )

  return (
    <div className={styles.productImagesContainer}>
      <div className={styles.smallImages}>
        {detailProduct.images.map((image: ImageObject) => (
          <img
            key={image.ImageOrder}
            src={image.ImageURL}
            alt={detailProduct.name}
            onMouseEnter={() => {
              setActiveImage(image.ImageURL)
            }}
            className={styles.smallImage}
          />
        ))}
      </div>
      {detailProduct.images.map((image: ImageObject) => (
        <img
          key={image.ImageOrder}
          src={image.ImageURL}
          alt={detailProduct.name}
          onMouseEnter={() => {
            setActiveImage(image.ImageURL)
          }}
          className={`${
            activeImage === image.ImageURL ? styles.mainImage : styles.hidden
          }`}
        />
      ))}
    </div>
  )
}

export default ImagesContainer