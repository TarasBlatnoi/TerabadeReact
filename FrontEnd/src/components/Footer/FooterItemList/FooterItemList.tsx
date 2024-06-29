import styles from "./FooterItemList.module.css"
import FooterItem from "../FooterItem/FooterItem"

const FooterItemList = function () {
  const itemsInfo: Array<{ itemName: string; href: string }> = [
    { itemName: "About", href: "" },
    { itemName: "Pricing", href: "" },
    { itemName: "Privacy Policy", href: "" },
    { itemName: "Blog", href: "" },
    { itemName: "Contant us", href: "" },
  ]

  return (
    <ul className={styles.list}>
      {itemsInfo.map((itemInfo, index) => (
        <FooterItem
          itemName={itemInfo.itemName}
          href={itemInfo.href}
          key={index}
        />
      ))}
    </ul>
  )
}

export { FooterItemList as default }
