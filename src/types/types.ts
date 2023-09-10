export interface scrapedData {
  name: string
  volume: number
  discount: string
  referenceDate: string
  publisher: string
  isCraveVolume: boolean
}

export interface Settings {
  source: Source
  selectors: Selectors
  mangas: Manga[]
}

export interface Manga {
  name: string
  volumeInfo: VolumeInfo
  craveVolumes?: any[]
}

interface VolumeInfo {
  max: number
  searchType: string
  volumesToIgnore: number[]
  volumesToSearch: number[]
  craveVolumes?: any[]
}

interface Selectors {
  name: Name
  price: Name
  short_description: Name
  images: Images
  rating: Name
  number_of_reviews: Name
  variants: Variants
  product_description: Name
  sales_rank: Name
  link_to_all_reviews: Name
}

interface Variants {
  css: string
  multiple: boolean
  type: string
  children: Children
}

interface Children {
  name: Images
  asin: Images
}

interface Images {
  css: string
  type: string
  attribute: string
}

interface Name {
  css: string
  type: string
}

interface Source {
  url: string
  searchParam: string
  headers: Headers
}

interface Headers {
  dnt: string
  'upgrade-insecure-requests': string
  'user-agent': string
  accept: string
  'sec-fetch-site': string
  'sec-fetch-mode': string
  'sec-fetch-user': string
  'sec-fetch-dest': string
  referer: string
  'accept-language': string
}
