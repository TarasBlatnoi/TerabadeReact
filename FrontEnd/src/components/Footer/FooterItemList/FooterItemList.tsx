import styles from "./FooterItemList.module.css"
import FooterItem from "../FooterItem/FooterItem"

const FooterItemList = function () {
  const firstListInfo: Array<{ itemName: string; href: string }> = [
    { itemName: "Твій акаунт", href: "" },
    { itemName: "Повернення", href: "" },
    { itemName: "Статус замовлення", href: "" },
    { itemName: "Контакти", href: "" },
    { itemName: "Центр допомоги", href: "" },
  ]

  const secondListInfo: Array<{ itemName: string; href: string }> = [
    { itemName: "Твій акаунт", href: "" },
    { itemName: "Повернення", href: "" },
    { itemName: "Статус замовлення", href: "" },
    { itemName: "Контакти", href: "" },
    { itemName: "Центр допомоги", href: "" },
  ]

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Допомога</h2>
      <ul className={styles.list}>
        {firstListInfo.map((itemInfo, index) => (
          <FooterItem
            itemName={itemInfo.itemName}
            href={itemInfo.href}
            key={index}
          />
        ))}
      </ul>
      <h2 className={styles.title}>Інформація</h2>
      <ul className={styles.list}>
        {secondListInfo.map((itemInfo, index) => (
          <FooterItem
            itemName={itemInfo.itemName}
            href={itemInfo.href}
            key={index}
          />
        ))}
      </ul>
    </div>
  )
}

export { FooterItemList as default }
