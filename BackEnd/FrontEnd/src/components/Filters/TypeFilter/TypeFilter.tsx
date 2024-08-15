import { useDispatch } from "react-redux"
import CustomCheckBox from "../../CustomCheckBox/CustomCheckBox"
import styles from "../GenderFilter/GenderFilter.module.css"
import { updateStyle } from "../../../store/Features/FiltersSlice/FiltersSlice"

function TypeFilter() {
  const dispath = useDispatch()

  function handler(type: string, checked: boolean) {
    dispath(updateStyle({ style: type, action: checked ? "add" : "delete" }))
  }

  return (
    <div className={styles.container}>
      <h1>Ціна</h1>
      <ul className={styles.list}>
        <li>
          <CustomCheckBox
            id="every-day"
            callBack={(checked) => handler("every-day", checked)}
          />
          <label htmlFor="every-day">Щоденний біг</label>
        </li>
        <li>
          <CustomCheckBox
            id="road-runners"
            callBack={(checked) => handler("road-runners", checked)}
          />
          <label htmlFor="road-runner">Дорожній біг</label>
        </li>
      </ul>
    </div>
  )
}

export default TypeFilter
