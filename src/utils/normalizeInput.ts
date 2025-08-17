/**
 * Normalizes a user-provided search string so that:
 * - leading and trailing whitespace is removed
 * - multiple internal spaces are collapsed into a single space
 * - everything is lower-cased
 */
export function normalizeInput(query: string): string {
  return query.trim().replace(/\s+/g, ' ').toLowerCase()
}
