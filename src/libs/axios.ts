import axios, { type AxiosInstance } from 'axios'
import settings from '../../config/settings.json'

export function axiosInstance (): AxiosInstance {
  return axios.create({
    baseURL: settings.source.url,
    headers: settings.source.headers
  })
}
