import { useState } from "react"
import styles from "./CustomCheckBox.module.css"

interface CustomCheckBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  callBack?: (checked: boolean) => void
  className?: string
  initialChecked: boolean
  children?: React.ReactElement
}

function CustomCheckBox({
  callBack,
  children,
  initialChecked,
  ...props
}: CustomCheckBoxProps) {
  const [checked, setChecked] = useState(initialChecked)
  return (
    <div
      className={`${styles.inputContainer} ${
        !children
          ? checked
            ? styles.checked
            : checked && children
              ? styles.checkedSize
              : ""
          : styles.sizeContainer
      }`}
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
      {children}
    </div>
  )
}

export default CustomCheckBox
