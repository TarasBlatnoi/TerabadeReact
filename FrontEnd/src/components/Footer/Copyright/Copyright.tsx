import styles from "./Copyright.module.css"

const Copyright = function () {
  const currentYear = new Date().getFullYear()
  return (
    <p className={styles.copyright}>
      <span>
        Copyright &copy; <time id="year">{currentYear}</time>
      </span>
      <span>Terabade</span>
    </p>
  )
}

export { Copyright as default }
