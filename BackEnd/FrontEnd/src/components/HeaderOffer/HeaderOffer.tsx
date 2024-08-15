import styles from "./HeaderOffer.module.css"
import { useEffect, useState } from "react"

function calculateTime(timer: NodeJS.Timeout) {
  const endDate = new Date("2026-06-30T00:00:00").getTime()
  const now = Date.now()
  const timeDiff = endDate - now
  if (timeDiff < 0) {
    clearInterval(timer)
    return "Розпродаж закінчено"
  }
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  )
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)

  const countdownText = `До кінця розпродажу ${days}д. ${hours}год. ${minutes}хв. ${seconds}сек. Дізнатись більше`
  return countdownText
}

const HeaderOffer = () => {
  const [counterText, setCounterText] = useState(``)
  useEffect(() => {
    const timer: ReturnType<typeof setInterval> = setInterval(
      () => setCounterText(calculateTime(timer)),
      1000,
    )

    setCounterText(calculateTime(timer))
    return () => clearInterval(timer)
  }, [])
  return (
    <div className={styles.header__offer}>
      <p>{counterText}</p>
    </div>
  )
}

export default HeaderOffer
