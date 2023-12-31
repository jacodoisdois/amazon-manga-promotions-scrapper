import axiosInstance from '../libs/axios'
import { getProductMangasRaw, getRandomUserAgent, searchMangaByVolume } from '../scraping/utils'
const axios = axiosInstance()

test('Should return all available volumes for Record of Ragnarok volume 09 ', async () => {
  const response = await axios.get('/s?k=Record+of+Ragnarok+Vol.9')
  const mangas = getProductMangasRaw(response.data)
  const searchResults = searchMangaByVolume(mangas, 'Record of Ragnarok', 9)
  expect(searchResults.length).toEqual(2)
})

test('Should return all available volumes for That time i got reincarnated as a slime volume 18 ', async () => {
  const response = await axios.get('/s?k=That+time+i+got+reincarnated+as+a+slime+Vol.18', { headers: { 'User-Agent': getRandomUserAgent() } })
  const mangas = getProductMangasRaw(response.data)
  const searchResults = searchMangaByVolume(mangas, 'That time i got reincarnated as a slime', 18)
  expect(searchResults.length).toEqual(2)
})
