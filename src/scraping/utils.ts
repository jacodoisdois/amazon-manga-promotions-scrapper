// import fs from 'fs'
import * as cheerio from 'cheerio'
import settings from '../../config/settings.json'
import { type AnyNode, type Cheerio } from 'cheerio'

type cardAttributes = 'title' | 'language' | 'material' | 'price_discounted' | 'current_price'

type CardAttributes = {
  [key in cardAttributes]: string | number;
}

function getCardAttribute (cardHtml: Cheerio<AnyNode>, attributeName: cardAttributes): CardAttributes[cardAttributes] {
  const { css, type, slice } = settings.selectors.card.attributes[attributeName]
  let attributeContent = cardHtml.find(css).text().trim()

  if (slice > 0) attributeContent = attributeContent.slice(slice)

  if (type === 'number') {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!attributeContent) return 0
    const parsedValue = parseFloat(attributeContent.replace('R$', '').replace(',', '.'))

    return parsedValue
  }

  return attributeContent
}

export function getProductCardsRaw (html: string): CardAttributes[] {
  const $ = cheerio.load(html)
  const cards: CardAttributes[] = []

  $(settings.selectors.card.css).each((index, element) => {
    const card: CardAttributes = {
      title: getCardAttribute($(element), 'title'),
      language: getCardAttribute($(element), 'language'),
      material: getCardAttribute($(element), 'material'),
      price_discounted: getCardAttribute($(element), 'price_discounted'),
      current_price: getCardAttribute($(element), 'current_price')
    }
    cards.push(card)
  })

  return cards
}
