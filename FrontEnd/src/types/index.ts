export interface ProductType {
  ProductID: number
  color: string
  createdAt: string
  ImageURL: string
  name: string
  price: number
  productDetails: string
  sex: string
  type: string
  updatedAt: string
}

export interface ImageObject {
  ImageURL: string
  ImageOrder: number
  ProductID: number
}

export interface DetailProductType {
  ProductID: number
  color: string
  createdAt: string
  images: ImageObject[]
  name: string
  price: number
  productDetails: string
  sizes: Array<{ SizeLabel: string; InStock: number }>
  sex: "men" | "women" | "children"
  type: string
  updatedAt: string
}

export interface UserBodyType {
  email: FormDataEntryValue | null
  password: FormDataEntryValue | null
}

export interface FavProductBodyType {
  ProductID: number
}

export interface Review {
  text: string
  ProductID: number
}
