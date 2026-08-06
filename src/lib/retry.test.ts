import { describe, expect, it, vi } from 'vitest'
import { retryOperation } from './retry'

describe('retryOperation', () => {
  it('retries transient failures and returns the successful result', async () => {
    const operation = vi
      .fn<() => Promise<string>>()
      .mockRejectedValueOnce(new Error('temporary failure'))
      .mockRejectedValueOnce(new Error('temporary failure'))
      .mockResolvedValue('saved')
    const wait = vi.fn<(delayMs: number) => Promise<void>>().mockResolvedValue()

    await expect(retryOperation(operation, { baseDelayMs: 1, wait })).resolves.toBe(
      'saved',
    )
    expect(operation).toHaveBeenCalledTimes(3)
    expect(wait).toHaveBeenCalledTimes(2)
  })

  it('stops after the configured number of attempts', async () => {
    const error = new Error('database unavailable')
    const operation = vi.fn<() => Promise<never>>().mockRejectedValue(error)
    const wait = vi.fn<(delayMs: number) => Promise<void>>().mockResolvedValue()

    await expect(
      retryOperation(operation, { maxAttempts: 3, baseDelayMs: 1, wait }),
    ).rejects.toBe(error)
    expect(operation).toHaveBeenCalledTimes(3)
    expect(wait).toHaveBeenCalledTimes(2)
  })
})
