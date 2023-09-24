export interface MangaSettings {
  name: string
  volumeInfo: VolumeInfo
}

interface VolumeInfo {
  max: number
  volumesToIgnore: number[]
  volumesToSearch: number[]
}

export interface Volume {
  number: number
  name: string
  path: string
}
