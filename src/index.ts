/* eslint-disable @typescript-eslint/no-unused-vars */
import * as dotenv from 'dotenv'
import settings from '../config/settings.json'
import { type scrapedData, type Manga } from './types/types'
import axiosInstance from './libs/axios'

dotenv.config()
const axios = axiosInstance()

async function getData (): Promise<void> {

}

async function getProductUrls (): Promise<string[]> {
  return ['']
}

function getMangaVolumesUrls (manga: Manga): string[] {
  const urls = []
  const volumesToSearch = manga.volumeInfo.volumesToSearch
  if (volumesToSearch.length > 0) {
    for (const volume of volumesToSearch) {
      let url = `${settings.source.url}/${settings.source.searchParam}`
      url += manga.name.replace(/ /g, '+') + `+Vol.${volume}`

      urls.push(url)
    }
  } else {
    for (let index = 1; index < manga.volumeInfo.max; index++) {
      if (manga.volumeInfo.volumesToIgnore.includes(index)) continue

      let url = `${settings.source.searchParam}`
      url += manga.name.replace(/ /g, '+') + `+Vol.${index}`

      urls.push(url)
    }
  }

  return urls
}

async function hadleVolumes (volumeUrls: string[]): Promise<void> {
  for (const url of volumeUrls) {
    const rawData = (await axios.get(url)).data
  }
}

function scrapData (html: string): scrapedData {
  return {
    name: '',
    volume: 0,
    discount: '',
    referenceDate: '',
    publisher: '',
    isCraveVolume: false
  }
}

async function main (): Promise<void> {
  const mangasMetadata = settings.mangas

  for (const manga of mangasMetadata) {
    const volumeUrls = getMangaVolumesUrls(manga)
    console.log(volumeUrls)
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async function () { await main() }())
