import styles from "./FooterItem.module.css"

type PropsType = {
  href: string
  itemName: string
}

const FooterItem = function ({ href, itemName }: PropsType) {
  return (
    <li className={styles.item}>
      <a className={styles.item__link} href={href}>
        {itemName}
      </a>
    </li>
  )
}

export { FooterItem as default }
