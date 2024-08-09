import { useState } from "react"
import styles from "./CustomCheckBox.module.css"

interface CustomCheckBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  callBack?: (checked: boolean) => any
  className?: string
}

function CustomCheckBox({ callBack, ...props }: CustomCheckBoxProps) {
  const [checked, setChecked] = useState(false)

  return (
    <div
      className={`${styles.inputContainer} ${checked ? styles.checked : ""}`}
    >
      <input
        {...props}
        type="checkbox"
        onChange={(ev) => {
          callBack?.(ev.target.checked)
          setChecked(ev.target.checked)
        }}
        checked={checked}
      />
    </div>
  )
}

export default CustomCheckBox
