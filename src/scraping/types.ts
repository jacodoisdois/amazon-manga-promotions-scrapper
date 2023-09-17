export interface Manga {
  title: string
  language: string
  material: string
  price_discounted: number
  current_price: number
  thereIsDiscount: boolean
  discountPercentual?: string
}

export interface jsonAttributes {
  css?: string
  type: string
  slice?: number
}
