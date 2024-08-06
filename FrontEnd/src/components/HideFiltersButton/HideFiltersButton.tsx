import styles from "./HideFiltersButton.module.css"
import filterSVG from "../../assets/images/Filter.svg"
import { MouseEventHandler } from "react"
type HideFiltersButtonProps = {
  onClick: MouseEventHandler<HTMLDivElement>
}

function HideFiltersButton({ onClick }: HideFiltersButtonProps) {
  return (
    <div className={styles.container} onClick={onClick}>
      <h2>Приховати фільтр</h2>
      <div className={styles.svgContainer}>
        <img src={filterSVG} alt="sort" />
      </div>
    </div>
  )
}

export default HideFiltersButton
