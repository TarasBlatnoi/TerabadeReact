import React from "react"
import styles from "./Button.module.css"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
  disabled?: boolean
}

const Button = ({
  variant = "primary",
  children,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${
        disabled ? "disabled" : ""
      }`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
