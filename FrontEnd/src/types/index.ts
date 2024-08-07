export interface ProductType {
  ProductID: number
  color: string
  createdAt: string
  image: string
  name: string
  price: number
  productDetails: string
  sex: string
  size: number
  type: string
  updatedAt: string
}

export interface UserBodyType {
  email: FormDataEntryValue | null
  password: FormDataEntryValue | null
}
