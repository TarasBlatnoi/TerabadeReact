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
  const { states } = useSelector((state: ReduxState) => state.filters)

  const navigate = useNavigate()
  function handler(gender: "men" | "women" | "children") {
    dispatch(updateGender({ gender }))
    let filter = ""
    const filters = []
    for (const genderState in states.gender) {
      if (states.gender[genderState as "men" | "women" | "children"]) {
        filter = genderState
        filters.push(genderState)
      }
    }
    console.log("filter", filter)
    console.log("filters", filters)
    console.log("gender", gender)

    if (filter !== gender && filters.length === 1) {
      navigate("/all")
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
            initialChecked={pathname === "/men"}
          />
          <label htmlFor="men">Чоловікам</label>
        </li>
        <li>
          <CustomCheckBox
            id="women"
            callBack={() => handler("women")}
            initialChecked={pathname === "/women"}
          />
          <label htmlFor="women">Жінкам</label>
        </li>
        <li className={styles.listItem}>
          <CustomCheckBox
            id="children"
            callBack={() => handler("children")}
            initialChecked={pathname === "/children"}
          />
          <label htmlFor="children">Дітям</label>
        </li>
      </ul>
    </div>
  )
}

export default GenderFilter
