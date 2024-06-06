import { ReactNode } from "react"
import styles from "./SubItem.module.css"
type PropsType = {
  children: ReactNode
}

const SubItem = ({ children }: PropsType) => {
  return (
    <p className={styles.subLiNavbarInteractive}>
      <a href="">{children}</a>
    </p>
  )
}

export default SubItem
