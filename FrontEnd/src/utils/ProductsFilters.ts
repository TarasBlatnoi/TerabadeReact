import { ProductType } from "@/types"
export class Products {
  data: ProductType[] = []
  searchParams: URLSearchParams = new URLSearchParams()
  constructor(data: ProductType[], searchParams: URLSearchParams) {
    this.data = data
    this.searchParams = searchParams
  }
  filteByPrice() {
    this.data = this.data.filter((product) => {
      const [min, max] = ["min", "max"].map((queryParam) => {
        return (
          this.searchParams
            .get(queryParam)
            ?.split(",")
            .map((value) => +value)
            .sort((a, b) => a - b) || []
        )
      })

      if (min.length && max.length) {
        const inRange = Array.from({ length: min.length }, (_, index) => ({
          min: min[index],
          max: max[index],
        }))
          .map(({ min, max }) => product.price >= min && product.price <= max)
          .includes(true)
        if (inRange) return true
        else return false
      }
      return true
    })
    return this
  }
  filterByStyle() {
    this.data = this.data.filter((product) => {
      const styles = this.searchParams.get("style")?.split(",") || []
      if (!styles.length) return true
      return styles.includes(product.type)
    })
    return this
  }
  filterBySize() {
    this.data = this.data.filter((product) => {
      const sizeParam = this.searchParams.get("size")?.split(",") || []
      if (!sizeParam.length) return true
      const inRange = !!product.Sizes.filter((size: string) => {
        if (sizeParam.includes(size)) return true
        else return false
      }).length

      if (inRange) return true
      else return false
    })
    return this
  }

  sortByPrice(productsSortMethod, sortingOptions) {
    this.data.sort((a, b) => {
      switch (productsSortMethod) {
        case sortingOptions.standard:
          return 0
        case sortingOptions.priceAscending:
          return b.price - a.price
        case sortingOptions.priceDescending:
          return a.price - b.price
      }
    })
    return this
  }
}
