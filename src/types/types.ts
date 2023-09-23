export interface MangaSettings {
  name: string
  volumeInfo: VolumeInfo
  craveVolumes?: any[]
}

interface VolumeInfo {
  max: number
  searchType: string
  volumesToIgnore: number[]
  volumesToSearch: number[]
  craveVolumes?: any[]
}

export interface Volume {
  number: number
  name: string
  path: string
}
