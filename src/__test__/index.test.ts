/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from '../libs/axios'
import * as cheerio from 'cheerio'
import fs from 'fs'
import settings from '../../config/settings.json'
import { getProductMangasRaw } from '../scraping/utils'
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
  const mangas = getProductMangasRaw(response.data)
  // const $ = cheerio.load(mangas.text())
  // const spansProductTitles = $(settings.selectors.manga.attributes.name.css)

  // let content: string[] = []
  // spansProductTitles.each((index, element) => {
  //   content.push($(element).text())
  // })

  // console.log(mangas.text())
  console.log(mangas)
  // fs.writeFileSync('teste2.txt', mangas.text())
})
