import { useNavigate } from "react-router-dom"
import styles from "./PreviewImg.module.css"

type PreviewImgProps = {
  imgSrc: string
  linkTo: string
  genderName: string
}

function PreviewImg({ imgSrc, linkTo, genderName }: PreviewImgProps) {
  const navigate = useNavigate()
  return (
    <div className={styles.imageContainer} onClick={() => navigate(linkTo)}>
      <span style={{ color: genderName === "Чоловіки" ? "black" : "white" }}>
        {genderName}
      </span>
      <img src={imgSrc} alt={imgSrc} />
    </div>
  )
}

export default PreviewImg
