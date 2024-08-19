import styles from "./Sizes.module.css"

interface SizesProps {
  begin: number
  end: number
  step: number
  chosedSize: number
  setChoseSize: (value: number) => void
  addToCartClicked: boolean
  sizes: Array<{ SizeLabel: string; InStock: number }>
}

const Sizes = ({
  begin,
  end,
  step,
  chosedSize,
  setChoseSize,
  addToCartClicked,
  sizes,
}: SizesProps) => {
  const availableSizes = sizes
    .filter(({ InStock }) => Boolean(InStock))
    .map(({ SizeLabel }) => +SizeLabel)

  console.log(availableSizes)
  const sizesElements = []
  for (let i = begin; i < end; i += step) {
    sizesElements.push(
      <div
        className={`${styles.sizeRect} ${
          chosedSize === i ? styles.sizeRectFilled : undefined
        } ${!availableSizes.includes(i) ? styles.sizeNotAvailable : ""}`}
        onClick={() => {
          if (!availableSizes.includes(i)) return
          setChoseSize(i)
        }}
        key={i}
      >
        {i}
      </div>,
    )
  }
  return (
    <div className={styles.sizesContainer}>
      <div className={styles.sizesTextConteiner}>
        <p>Обрати розмір</p>
        <p>Довідник розмірів</p>
      </div>
      <div
        className={`${styles.sizeRectContainer} ${addToCartClicked && !chosedSize ? styles.warning : ""}`}
      >
        {sizesElements}
      </div>
      {!chosedSize && addToCartClicked ? (
        <p className={styles.warningText}>Будь ласка, оберіть розмір</p>
      ) : null}
    </div>
  )
}

export default Sizes
