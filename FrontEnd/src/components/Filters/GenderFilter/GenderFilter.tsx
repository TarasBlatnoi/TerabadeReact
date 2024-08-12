import { useDispatch } from "react-redux"
import CustomCheckBox from "../../CustomCheckBox/CustomCheckBox"
import styles from "./GenderFilter.module.css"
import { updateGender } from "../../../store/Features/FiltersSlice/FiltersSlice"

function GenderFilter() {
  const dispatch = useDispatch()

  function handler(gender: "men" | "women" | "children") {
    dispatch(updateGender({ gender }))
  }

  return (
    <div className={styles.container}>
      <h1>Стать</h1>
      <ul className={styles.list}>
        <li>
          <CustomCheckBox id="men" callBack={() => handler("men")} />
          <label htmlFor="men">Чоловікам</label>
        </li>
        <li>
          <CustomCheckBox id="women" callBack={() => handler("women")} />
          <label htmlFor="women">Жінкам</label>
        </li>
        <li className={styles.listItem}>
          <CustomCheckBox id="children" callBack={() => handler("children")} />
          <label htmlFor="children">Дітям</label>
        </li>
      </ul>
    </div>
  )
}

export default GenderFilter
