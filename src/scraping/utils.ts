/* eslint-disable @typescript-eslint/no-unused-vars */
// import fs from 'fs'
import * as cheerio from 'cheerio'
import { type AnyNode, type Cheerio } from 'cheerio'
import settings from '../../config/settings.json'
import { type Manga } from './types'

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
      title: getMangaAttribute($(element), 'title'),
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
    `^(${mangaName})\\s*(?:\\(Vol(?:\\.|s*ume)?\\s*0?${volumeNumber}\\)|,\\s*Vol(?:\\.|s*ume)?\\s*0?${volumeNumber})(?:\\s*\\(.*\\))?$`,
    'i'
  )

  const results: Manga[] = []

  mangaList.forEach((item) => {
    const match = item.title.match(regex)
    if (match) {
      results.push(item)
    }
  })

  return results
}
