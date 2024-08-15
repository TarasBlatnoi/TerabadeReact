import GenderFilter from "./GenderFilter/GenderFilter"
import PriceFilter from "./PriceFilter/PriceFilter"
import SizeFilter from "./SizeFilter/SizeFilter"
import TypeFilter from "./TypeFilter/TypeFilter"

function Filters() {
  return (
    <>
      <GenderFilter />
      <PriceFilter />
      <TypeFilter />
      <SizeFilter />
    </>
  )
}

export default Filters
