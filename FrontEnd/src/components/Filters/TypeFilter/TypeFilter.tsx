import { useSearchParams } from "react-router-dom"
import CustomCheckBox from "../../CustomCheckBox/CustomCheckBox"
import styles from "../GenderFilter/GenderFilter.module.css"

function TypeFilter() {
  const [searchParams, setSearchParams] = useSearchParams()
  const styleQuery = searchParams.get("style")?.split(",") || []

  function handler(style: string, checked: boolean) {
    setSearchParams((searchParams) => {
      const stylePrev = searchParams.get("style")?.split(",")
      if (!stylePrev) {
        searchParams.set("style", style)
      } else if (stylePrev && checked) {
        searchParams.set("style", [...stylePrev, style].join(","))
      } else if (stylePrev && !checked) {
        const queryParam = stylePrev
          .filter((styleValue) => styleValue !== style)
          .join(",")

        if (!queryParam) searchParams.delete("style")
        else {
          searchParams.set(
            "style",
            stylePrev.filter((styleValue) => styleValue !== style).join(","),
          )
        }
      }
      return searchParams
    })
  }

  function isIncluded(style: string) {
    return styleQuery.includes(style)
  }

  return (
    <div className={styles.container}>
      <h1>Ціна</h1>
      <ul className={styles.list}>
        <li>
          <CustomCheckBox
            id="every-day"
            callBack={(checked) => handler("every-day", checked)}
            checkedExt={isIncluded("every-day")}
          />
          <label htmlFor="every-day">Щоденний біг</label>
        </li>
        <li>
          <CustomCheckBox
            id="road-runners"
            callBack={(checked) => handler("road-runners", checked)}
            checkedExt={isIncluded("road-runners")}
          />
          <label htmlFor="road-runner">Дорожній біг</label>
        </li>
      </ul>
    </div>
  )
}

export default TypeFilter
