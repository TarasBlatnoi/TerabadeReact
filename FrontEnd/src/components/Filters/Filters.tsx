import ExperienceFilter from "./ExperienceFilter/ExperienceFilter"
import GenderFilter from "./GenderFilter/GenderFilter"
import PriceFilter from "./PriceFilter/PriceFilter"
import TypeFilter from "./TypeFilter/TypeFilter"

function Filters() {
  return (
    <>
      <GenderFilter />
      <PriceFilter />
      <TypeFilter />
      <ExperienceFilter />
    </>
  )
}

export default Filters
