import styles from "./HideFiltersButton.module.css"

type HideFiltersButtonProps = {
  onClick: Function
}

function HideFiltersButton({ onClick }: HideFiltersButtonProps) {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={() => onClick()}>
        Hide filters
      </button>
    </div>
  )
}

export default HideFiltersButton
