import * as dotenv from 'dotenv'
import settings from '../config/settings.json'
import axiosInstance from './libs/axios'
import { getMangaVolumes, getProductMangasRaw, getRandomUserAgent, getVolumesWithDiscount, searchMangaByVolume, sleep } from './scraping/utils'

dotenv.config()
const axios = axiosInstance()

async function main (): Promise<void> {
  const mangasMetadata = settings.mangas
  const mangasWithDiscount = []
  for (const manga of mangasMetadata) {
    const volumes = getMangaVolumes(manga)

    for (const volume of volumes) {
      await sleep(1000)
      const amazonData = await axios.get(volume.path, {
        headers: {
          'User-Agent': getRandomUserAgent()
        }
      })
      const mangas = getProductMangasRaw(amazonData.data)
      const searchResults = getVolumesWithDiscount(searchMangaByVolume(mangas, volume.name, volume.number))

      mangasWithDiscount.push(...searchResults)
    }
  }
  console.log(mangasWithDiscount)
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async function () { await main() }())
