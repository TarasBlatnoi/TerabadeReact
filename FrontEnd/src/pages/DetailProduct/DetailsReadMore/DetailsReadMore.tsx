import { useState } from "react"
import styles from "./DetailsReadMore.module.css"
import Star from "../../../assets/images/star-fall-minimalistic-svgrepo-com 1.svg"

interface DetailsReadMoreProps {
  text: string
}

const DetailsReadMore = ({ text }: DetailsReadMoreProps) => {
  const [readMore, setReadMore] = useState(false)
  return (
    <>
      <div className={styles.descriptionTitleContainer}>
        <img src={Star} alt="star" className={styles.star} />
        <h2>Опис</h2>
      </div>
      <p className={styles.details}>
        {` ${text} also this is just a PLACEHOLDER SO
              ${
                readMore
                  ? `DON'T pay attention to it maybe once we will add some more data to
              db that will make some sense Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Ipsam doloribus adipisci voluptates
              facere animi magnam, quis aliquam reprehenderit recusandae,
              deserunt, suscipit ex temporibus impedit hic molestias tempore
              placeat fugiat dolores.`
                  : ""
              }`}
      </p>
      <p
        className={styles.readMore}
        onClick={() => setReadMore((prev) => !prev)}
      >
        {readMore ? "Читати менше" : "Читати більше"}
      </p>
    </>
  )
}

export default DetailsReadMore
