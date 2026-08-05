export type WaitlistField = 'email' | 'phone'

export type WaitlistInput = {
  name: string
  email: string
  phone: string
  instagramHandle: string
}

export type ValidationResult =
  { ok: true; value: WaitlistInput } | { ok: false; message: string }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase()
}

export function normalizePhone(value: string): string | null {
  const compact = value.trim().replace(/[\s().-]/g, '')

  if (!/^\+[1-9]\d{7,14}$/.test(compact)) return null

  return compact
}

export function normalizeInstagramHandle(value: string): string | null {
  const handle = value.trim().replace(/^@+/, '').toLowerCase()

  if (!/^[a-z0-9._]{1,30}$/.test(handle)) return null

  return handle
}

export function validateWaitlistInput(input: WaitlistInput): ValidationResult {
  const name = input.name.trim().replace(/\s+/g, ' ')
  const email = normalizeEmail(input.email)
  const phone = normalizePhone(input.phone)
  const instagramHandle = normalizeInstagramHandle(input.instagramHandle)

  if (name.length < 2 || name.length > 100) {
    return { ok: false, message: 'Enter a name between 2 and 100 characters.' }
  }

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return { ok: false, message: 'Enter a valid email address.' }
  }

  if (!phone) {
    return {
      ok: false,
      message: 'Enter a mobile number with its country code, for example +974 5555 1234.',
    }
  }

  if (!instagramHandle) {
    return {
      ok: false,
      message: 'Enter a valid Instagram handle, without the @ sign.',
    }
  }

  return { ok: true, value: { name, email, phone, instagramHandle } }
}
