export function formatDate(ts: number): string {
  return new Date(ts * 1000).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}
