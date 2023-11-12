export interface MangaSettings {
  name: string
  volumeInfo: VolumeInfo
}

interface VolumeInfo {
  max: number
  volumesToIgnore: number[]
  volumesToSearch: number[]
}

export interface Volume {
  number: number
  name: string
  path: string
}

export interface Manga {
  productTitle: string
  volume?: number
  name?: string
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
