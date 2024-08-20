import { useDispatch, useSelector } from "react-redux"
import CustomCheckBox from "../../CustomCheckBox/CustomCheckBox"
import styles from "./GenderFilter.module.css"
import {
  resetGender,
  updateGender,
} from "../../../store/Features/FiltersSlice/FiltersSlice"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { initialStateType as FiltersStateType } from "../../../store/Features/FiltersSlice/FiltersSlice"

interface ReduxState {
  filters: FiltersStateType
}

function GenderFilter() {
  const dispatch = useDispatch()
  const genderObj = useSelector(
    (state: ReduxState) => state.filters.states.gender,
  )

  const navigate = useNavigate()
  function handler(gender: "men" | "women" | "children") {
    dispatch(updateGender({ gender }))
    let filter = ""
    const filters = []
    for (const genderState in genderObj) {
      if (genderObj[genderState as "men" | "women" | "children"]) {
        filter = genderState
        filters.push(genderState)
      }
    }
    if (filter !== gender && filters.length === 1) {
      navigate("/products")
    }

    if (filters.includes(gender) && filters.length >= 2) {
      const indexOfCurrentGender = filters.indexOf(gender)
      filters.splice(indexOfCurrentGender, 1)
      if (filters.length > 1) {
        navigate(`/products`)
      } else {
        navigate(`/${filters[0]}`)
      }
    }

    if (filters.length === 1 && filters.includes(gender)) {
      navigate(`/products`)
    }
    if (filters.length === 0) {
      navigate(`/${gender}`)
    }
  }

  const { pathname } = useLocation()

  useEffect(() => {
    const gender = pathname.slice(1) as "men" | "women" | "children"

    if (gender !== "men" && gender !== "women" && gender !== "children") return
    dispatch(resetGender())
    dispatch(updateGender({ gender }))
  }, [dispatch, pathname])

  return (
    <div className={styles.container}>
      <h1>Стать</h1>
      <ul className={styles.list}>
        <li>
          <CustomCheckBox
            id="men"
            callBack={() => handler("men")}
            checkedExt={pathname === "/men" || genderObj.men}
          />
          <label htmlFor="men">Чоловікам</label>
        </li>
        <li>
          <CustomCheckBox
            id="women"
            callBack={() => handler("women")}
            checkedExt={pathname === "/women" || genderObj.women}
          />
          <label htmlFor="women">Жінкам</label>
        </li>
        <li className={styles.listItem}>
          <CustomCheckBox
            id="children"
            callBack={() => handler("children")}
            checkedExt={pathname === "/children" || genderObj.children}
          />
          <label htmlFor="children">Дітям</label>
        </li>
      </ul>
    </div>
  )
}

export default GenderFilter
