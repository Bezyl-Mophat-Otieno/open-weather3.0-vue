import type { Location } from '@/types/geo-coding'

export const getLocationName = (location: Location) => {
  return `${location.name} ${location.state ?? ''} (${location.country})`
}
