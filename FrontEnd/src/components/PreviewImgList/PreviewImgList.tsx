import PreviewImg from "./PreviewImg/PreviewImg"
import styles from "./PreviewImgList.module.css"
import girl from "../../assets/images/girlPreview.png"
import children from "../../assets/images/childrenPreview.png"
import man from "../../assets/images/manPreview.png"

type PreviewImgPropsType = {
  imgSrc: string
  linkTo: string
  genderName: string
  id: number
}
const info = [
  {
    imgSrc: girl,
    linkTo: "/",
    genderName: "Жінки",
    id: 2312,
  },
  {
    imgSrc: children,
    linkTo: "/",
    genderName: "Діти",
    id: 5412,
  },
  {
    imgSrc: man,
    linkTo: "/",
    genderName: "Чоловіки",
    id: 8912,
  },
]

function PreviewImgList() {
  return (
    <section className={styles.imgList}>
      {info.map(({ imgSrc, linkTo, genderName, id }: PreviewImgPropsType) => (
        <PreviewImg
          imgSrc={imgSrc}
          linkTo={linkTo}
          genderName={genderName}
          key={id}
        />
      ))}
    </section>
  )
}

export default PreviewImgList
