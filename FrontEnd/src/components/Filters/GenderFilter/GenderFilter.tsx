import CustomCheckBox from "../../CustomCheckBox/CustomCheckBox"
import styles from "./GenderFilter.module.css"
import { useSearchParams } from "react-router-dom"

function GenderFilter() {
  const [searchParams, setSearchParams] = useSearchParams()
  const gendersQuery = searchParams.get("gender")?.split(",")

  function handler(gender: "men" | "women" | "children", checked: boolean) {
    setSearchParams((searchParams) => {
      const gendersQuery = searchParams.get("gender")?.split(",")
      if (!gendersQuery) searchParams.set("gender", gender)
      else if (gendersQuery && checked) {
        searchParams.set("gender", [...gendersQuery, gender].join(","))
      } else if (gendersQuery && !checked) {
        const queryParam = gendersQuery.filter(
          (genderValue) => genderValue !== gender,
        )
        if (!queryParam.length) searchParams.delete("gender")
        else searchParams.set("gender", queryParam.join(","))
      }
      return searchParams
    })
  }

  function isIncluded(gender: "men" | "women" | "children") {
    return gendersQuery?.includes(gender)
  }

  return (
    <div className={styles.container}>
      <h1>Стать</h1>
      <ul className={styles.list}>
        <li>
          <CustomCheckBox
            id="men"
            callBack={(checked) => handler("men", checked)}
            checkedExt={isIncluded("men")}
          />
          <label htmlFor="men">Чоловікам</label>
        </li>
        <li>
          <CustomCheckBox
            id="women"
            callBack={(checked) => handler("women", checked)}
            checkedExt={isIncluded("women")}
          />
          <label htmlFor="women">Жінкам</label>
        </li>
        <li className={styles.listItem}>
          <CustomCheckBox
            id="children"
            callBack={(checked) => handler("children", checked)}
            checkedExt={isIncluded("children")}
          />
          <label htmlFor="children">Дітям</label>
        </li>
      </ul>
    </div>
  )
}

export default GenderFilter
