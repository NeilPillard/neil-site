export type RetryOptions = {
  maxAttempts?: number
  baseDelayMs?: number
  wait?: (delayMs: number) => Promise<void>
}

const defaultWait = (delayMs: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, delayMs))

export async function retryOperation<T>(
  operation: () => Promise<T>,
  { maxAttempts = 3, baseDelayMs = 25, wait = defaultWait }: RetryOptions = {},
): Promise<T> {
  let lastError: unknown

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    try {
      return await operation()
    } catch (error) {
      lastError = error
      if (attempt === maxAttempts - 1) break

      const delay = baseDelayMs * 2 ** attempt + Math.floor(Math.random() * baseDelayMs)
      await wait(delay)
    }
  }

  throw lastError
}
