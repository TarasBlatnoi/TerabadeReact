import { Link } from "react-router-dom"
import styles from "./PreviewImg.module.css"

type PreviewImgProps = {
  imgSrc: string
  linkTo: string
  genderName: string
}

function PreviewImg({ imgSrc, linkTo, genderName }: PreviewImgProps) {
  return (
    <Link to={linkTo} className={styles.imageContainer}>
      <span style={{ color: genderName === "Чоловіки" ? "black" : "white" }}>
        {genderName}
      </span>
      <img src={imgSrc} alt={imgSrc} />
    </Link>
  )
}

export default PreviewImg
