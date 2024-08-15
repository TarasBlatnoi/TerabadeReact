import React from "react"
import styles from "./Arrow.module.css"

interface ArrowProps extends React.HTMLAttributes<HTMLButtonElement> {
  inverted?: boolean
}

function Arrow({ inverted = false, ...props }: ArrowProps) {
  return (
    <button
      {...props}
      style={{ transform: inverted ? "rotateZ(180deg)" : "none" }}
    >
      <div className={styles.icon}>
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 24 24"
          role="img"
          width="3rem"
          height="3rem"
          fill="none"
        >
          <path
            stroke="currentColor"
            strokeWidth="1.5"
            d="M8.474 18.966L15.44 12 8.474 5.033"
          ></path>
        </svg>
      </div>
    </button>
  )
}

export default Arrow
