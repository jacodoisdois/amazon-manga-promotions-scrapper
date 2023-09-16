// import fs from 'fs'
import * as cheerio from 'cheerio'
import settings from '../../config/settings.json'
import { type AnyNode, type Cheerio } from 'cheerio'

type mangaAttributes = 'title' | 'language' | 'material' | 'price_discounted' | 'current_price' | 'thereIsDiscount'

type MangaAttributes = {
  [key in mangaAttributes]: string | number | boolean;
}

function getMangaAttribute (mangaHtml: Cheerio<AnyNode>, attributeName: mangaAttributes): MangaAttributes[mangaAttributes] {
  const { css, type, slice } = settings.selectors.card.attributes[attributeName]
  let attributeContent = mangaHtml.find(css).text().trim()

  if (slice > 0) attributeContent = attributeContent.slice(slice)

  if (type === 'number') {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!attributeContent) return 0
    const parsedValue = parseFloat(attributeContent.replace('R$', '').replace(',', '.'))

    return parsedValue
  }

  return attributeContent
}

export function getProductMangasRaw (html: string): MangaAttributes[] {
  const $ = cheerio.load(html)
  const mangas: MangaAttributes[] = []

  $(settings.selectors.card.css).each((index, element) => {
    const manga: MangaAttributes = {
      title: getMangaAttribute($(element), 'title'),
      language: getMangaAttribute($(element), 'language'),
      material: getMangaAttribute($(element), 'material'),
      price_discounted: getMangaAttribute($(element), 'price_discounted'),
      current_price: getMangaAttribute($(element), 'current_price'),
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      thereIsDiscount: !!getMangaAttribute($(element), 'price_discounted')
    }
    mangas.push(manga)
  })

  return mangas
}
