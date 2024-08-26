import styles from "./Sizes.module.css"

interface SizesProps {
  begin: number
  end: number
  step: number
  chosedSize: number
  setChoseSize: (value: number) => void
  addToCartClicked: boolean
  sizes: Array<{ SizeLabel: string; InStock: number }>
  gridLayout?: { gridTemplateColumns: string }
  sizeRect: string
  sizeRectFilled: string
  sizeNotAvailable: string
}

const Sizes = ({
  begin,
  end,
  step,
  chosedSize,
  setChoseSize,
  addToCartClicked,
  sizes,
  gridLayout,
  sizeRect,
  sizeRectFilled,
  sizeNotAvailable,
}: SizesProps) => {
  const availableSizes = sizes
    .filter(({ InStock }) => Boolean(InStock))
    .map(({ SizeLabel }) => +SizeLabel)

  const sizesElements = []
  for (let i = begin; i < end; i += step) {
    sizesElements.push(
      <div
        className={`${sizeRect} ${
          chosedSize === i ? sizeRectFilled : ""
        } ${!availableSizes.includes(i) ? sizeNotAvailable : ""}`}
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
        className={`${styles.sizeRectContainer} ${addToCartClicked && !chosedSize ? styles.warning : ""} `}
        style={gridLayout}
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
