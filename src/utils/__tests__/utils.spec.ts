import { getIconUrl } from '@/utils/getIconUrl'
import { formatDate } from '@/utils/formatDate'
import { normalizeInput } from '@/utils/normalizeInput'
import { getLocationName } from '@/utils/getLocationName'


import { describe, it, expect } from 'vitest'

describe('getIconUrl', () => {
  it('returns correct url', () => {
    const icon = '10d'
    const result = getIconUrl(icon)
    expect(result).toBe('https://openweathermap.org/img/wn/10d@2x.png')
  })
})

describe('formatDate()', () => {
  it('returns a formatted date string', () => {
    // Unix timestamp for  August 19, 2024 00:00:00 UTC
    const timestamp = 1724025600
    const result = formatDate(timestamp)
    expect(result).toBe('Mon, Aug 19')
  })
})

describe('normalizeInput()', () => {
  it('trims leading and trailing whitespace', () => {
    const result = normalizeInput('   Nairobi   ')
    expect(result).toBe('nairobi')
  })

  it('collapses multiple internal spaces', () => {
    const result = normalizeInput('New     York    City')
    expect(result).toBe('new york city')
  })

  it('converts to lowercase', () => {
    const result = normalizeInput('LoNdOn')
    expect(result).toBe('london')
  })

  it('combines all three cases together', () => {
    const result = normalizeInput('   SAN      FRANCISCO ')
    expect(result).toBe('san francisco')
  })
})



describe('getLocationName()', () => {
  it('returns name + state + country when state is present', () => {
    const location = { name: 'Nairobi', state: 'Nairobi County', country: 'KE', lat: 45, lon:-49 }
    const result = getLocationName(location)
    expect(result).toBe('Nairobi Nairobi County (KE)')
  })

  it('omits state when state is undefined', () => {
    const location = { name: 'Lagos', country: 'NG', lat: 45, lon: 49 }
    const result = getLocationName(location)
    expect(result).toBe('Lagos  (NG)')
  })
})
