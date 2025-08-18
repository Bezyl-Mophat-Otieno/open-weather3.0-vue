export function formatDate(ts: number): string {
  return new Date(ts * 1000).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
}
