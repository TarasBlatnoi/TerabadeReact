import styles from "./CustomCheckBox.module.css"

interface CustomCheckBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  callBack?: (checked: boolean) => void
  className?: string
  children?: React.ReactElement
  checked: boolean
}

function CustomCheckBox({
  callBack,
  children,
  checked,
  ...props
}: CustomCheckBoxProps) {
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
        }}
        checked={checked}
      />
      {children}
    </div>
  )
}

export default CustomCheckBox
