import styles from "./CharacteristicsReadAll.module.css"
import CharacteristicsImg from "../../../assets/images/list-minus-svgrepo-com 1.svg"
import { useState } from "react"

interface CharacteristicsReadAllProps {
  text: string
}

const CharacteristicsReadAll = ({ text }: CharacteristicsReadAllProps) => {
  const [showAll, setShowAll] = useState(false)
  return (
    <>
      <div className={styles.characteristicsContainer}>
        <img
          src={CharacteristicsImg}
          alt="characteristics icon"
          className={styles.characteristicsIcon}
        />
        <h2 className={styles.characteristicsTitle}>Характеристики</h2>
      </div>
      <p className={styles.characteristics}>
        {` ${text} Lorem ipsum dolor sit, amet consectetur
              ${
                showAll
                  ? `adipisicing elit. Accusantium dolorem cupiditate maxime excepturi
              expedita provident tenetur aliquid sapiente praesentium, officiis
              ab, ullam consectetur nobis quae neque odio dolores et dolor.`
                  : ""
              }`}
      </p>
      <p className={styles.showAll} onClick={() => setShowAll((prev) => !prev)}>
        {showAll ? "Сховати все" : "Показати все"}
      </p>
    </>
  )
}

export default CharacteristicsReadAll
