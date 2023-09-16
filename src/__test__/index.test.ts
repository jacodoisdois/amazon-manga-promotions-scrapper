/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from '../libs/axios'
import * as cheerio from 'cheerio'
import fs from 'fs'
import settings from '../../config/settings.json'
import { getProductCardsRaw } from '../scraping/utils'
const axios = axiosInstance()

function buscarMangaPorVolume (
  lista: string[],
  nomeManga: string,
  numeroVolume: number
): string[] {
  const regex = new RegExp(
    // eslint-disable-next-line no-useless-escape
    `^(${nomeManga})\\s*(?:\\(Vol(?:\\.|\s*ume)?\\s*0?${numeroVolume}\\)|,\\s*Vol(?:\\.|\s*ume)?\\s*0?${numeroVolume})(?:\\s*\\(.*\\))?$`,
    'i'
  )

  const resultados: string[] = []

  lista.forEach((linha) => {
    const match = linha.match(regex)
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (match) {
      resultados.push(match[0])
    }
  })

  return resultados
}

test('Should ', async () => {
  const response = await axios.get('/s?k=Record+of+Ragnarok+Vol.9')
  const cards = getProductCardsRaw(response.data)
  // const $ = cheerio.load(cards.text())
  // const spansProductTitles = $(settings.selectors.card.attributes.name.css)

  // let content: string[] = []
  // spansProductTitles.each((index, element) => {
  //   content.push($(element).text())
  // })

  // console.log(cards.text())
  console.log(cards)
  // fs.writeFileSync('teste2.txt', cards.text())
})
