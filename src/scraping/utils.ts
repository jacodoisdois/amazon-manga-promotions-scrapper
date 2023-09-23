import * as cheerio from 'cheerio'
import { type AnyNode, type Cheerio } from 'cheerio'
import settings from '../../config/settings.json'
import { type Manga } from './types'
import { type Volume, type MangaSettings } from '../types/types'

function getMangaAttribute<T extends keyof typeof settings.selectors.card.attributes> (
  mangaHtml: Cheerio<AnyNode>,
  attributeName: T
): Manga[T] {
  const { css, type, slice } = settings.selectors.card.attributes[attributeName]
  let attributeContent = mangaHtml.find(css).text().trim()

  if (slice && slice > 0) attributeContent = attributeContent.slice(slice)

  if (type === 'number') {
    if (!attributeContent) return 0 as Manga[T]
    const parsedValue = parseFloat(attributeContent.replace('R$', '').replace(',', '.'))
    return parsedValue as Manga[T]
  }

  return attributeContent as Manga[T]
}

export function getProductMangasRaw (html: string): Manga[] {
  const $ = cheerio.load(html)
  const mangas: Manga[] = []

  $(settings.selectors.card.css).each((index, element) => {
    const manga: Manga = {
      productTitle: getMangaAttribute($(element), 'productTitle'),
      language: getMangaAttribute($(element), 'language'),
      material: getMangaAttribute($(element), 'material'),
      price_discounted: getMangaAttribute($(element), 'price_discounted'),
      current_price: getMangaAttribute($(element), 'current_price'),
      thereIsDiscount: !!getMangaAttribute($(element), 'price_discounted')
    }
    mangas.push(manga)
  })

  return mangas
}

export function searchMangaByVolume (
  mangaList: Manga[],
  mangaName: string,
  volumeNumber: number
): Manga[] {
  const regex = new RegExp(
    `(${mangaName.toLowerCase()})\\D*(0?${volumeNumber})\\b`,
    'i'
  )

  const results: Manga[] = []

  mangaList.forEach((item) => {
    const match = item.productTitle.toLowerCase().match(regex)
    if (match) {
      item.volume = volumeNumber
      item.name = mangaName
      results.push(item)
    }
  })

  return results
}

export function getVolumesWithDiscount (mangaList: Manga[]): Manga[] {
  return mangaList.filter((manga) => manga.thereIsDiscount)
}

export function getMangaVolumes (manga: MangaSettings): Volume[] {
  const volumes: Volume[] = []
  const volumesToSearch = manga.volumeInfo.volumesToSearch
  if (volumesToSearch.length > 0) {
    for (const volume of volumesToSearch) {
      let path = `${settings.source.searchParam}`
      path += manga.name.replace(/ /g, '+') + `+Vol.${volume}`

      volumes.push({
        name: manga.name,
        number: volume,
        path
      })
    }
  } else {
    for (let index = 1; index < manga.volumeInfo.max; index++) {
      if (manga.volumeInfo.volumesToIgnore.includes(index)) continue

      let path = `${settings.source.searchParam}`
      path += manga.name.replace(/ /g, '+') + `+Vol.${index}`

      volumes.push({
        name: manga.name,
        number: index,
        path
      })
    }
  }

  return volumes
}

export async function sleep (time: number): Promise<void> {
  await new Promise<void>(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

export function getRandomUserAgent (): string {
  const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Firefox/89.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/91.0.864.59 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Opera/77.0.4054.146'
  ]

  const randomIndex = Math.floor(Math.random() * userAgents.length)
  return userAgents[randomIndex]
}
