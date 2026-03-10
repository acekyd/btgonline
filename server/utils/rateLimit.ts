interface AttemptRecord {
  count: number
  windowStart: number
}

const attempts = new Map<string, AttemptRecord>()
const WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const MAX_ATTEMPTS = 5

export function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = attempts.get(ip)
  if (!record) return false
  if (now - record.windowStart > WINDOW_MS) {
    attempts.delete(ip)
    return false
  }
  return record.count >= MAX_ATTEMPTS
}

export function recordFailedAttempt(ip: string): void {
  const now = Date.now()
  const record = attempts.get(ip)
  if (!record || now - record.windowStart > WINDOW_MS) {
    attempts.set(ip, { count: 1, windowStart: now })
  } else {
    record.count++
  }
}

export function resetAttempts(ip: string): void {
  attempts.delete(ip)
}
