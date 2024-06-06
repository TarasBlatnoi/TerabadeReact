import { ReactNode } from "react"
import SubItem from "./SubItem/SubItem"
import styles from "./Item.module.css"

type PropsType = {
  mainLinkName: string
  linksNames: ReactNode[]
}
const NavbarInteractiveItem = ({ mainLinkName, linksNames }: PropsType) => {
  return (
    <li className={styles.liNavbarInteractive}>
      <p>
        <a href="">{mainLinkName}</a>
      </p>
      <div className={styles.wrapperSubLiNavbarInteractive}>
        {linksNames.map((subItem, index) => (
          <SubItem children={subItem} key={index} />
        ))}
      </div>
    </li>
  )
}

export default NavbarInteractiveItem
