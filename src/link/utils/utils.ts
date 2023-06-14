export function isValidUrl(url: string): boolean {
  try {
    const valid = new URL(url)
    return valid.protocol === 'http:' || valid.protocol === 'https:'
  } catch (error) {
    return false
  }
}