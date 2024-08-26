import Button from "../UI/Button/Button"
import styles from "./ErrorFallback.module.css"

type ErrorFallbackProps = { error: Error; resetErrorBoundary: () => void }

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className={styles.container}>
      <div className={styles.errorContainer}>
        <h1>{error.message}</h1>
        <Button onClick={resetErrorBoundary} className={styles.button}>
          Reset
        </Button>
      </div>
    </div>
  )
}

export default ErrorFallback
