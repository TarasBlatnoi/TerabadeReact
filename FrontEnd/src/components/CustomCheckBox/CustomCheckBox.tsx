import { useState } from "react"
import styles from "./CustomCheckBox.module.css"

interface CustomCheckBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  callBack?: (checked: boolean) => void
  className?: string
  children?: React.ReactElement
  checkedExt?: boolean | undefined
}

function CustomCheckBox({
  checkedExt,
  callBack,
  children,
  ...props
}: CustomCheckBoxProps) {
  const [checkedInternal, setChecked] = useState(false)
  const checked = checkedExt !== undefined ? checkedExt : checkedInternal
  return (
    <div
      className={`${styles.inputContainer}  ${children && checked ? styles.checkedSize : !children && checked ? styles.checked : ""}`}
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
