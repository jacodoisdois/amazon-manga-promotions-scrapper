/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from '../libs/axios'
import * as cheerio from 'cheerio'
import fs from 'fs'
import settings from '../../config/settings.json'
import { getProductMangasRaw, searchMangaByVolume } from '../scraping/utils'
import { assert } from 'console'
const axios = axiosInstance()

test('Should return all available volumes for Record of Ragnarok volume 09 ', async () => {
  const response = await axios.get('/s?k=Record+of+Ragnarok+Vol.9')
  const mangas = getProductMangasRaw(response.data)
  const searchResults = searchMangaByVolume(mangas, 'Record of Ragnarok', 9)

  expect(searchResults.length).toEqual(2)
})
