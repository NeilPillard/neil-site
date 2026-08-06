import { validateWaitlistInput } from '../../../src/lib/waitlist'
import { retryOperation } from '../../../src/lib/retry'

type Env = {
  WAITLIST_DB?: D1Database
  TURNSTILE_SECRET_KEY?: string
}

type CountRow = {
  count: number
}

type SignupPayload = {
  name?: unknown
  email?: unknown
  phone?: unknown
  instagramHandle?: unknown
  website?: unknown
  turnstileToken?: unknown
}

type InsertResult = {
  meta: { changes?: number }
}

function response(
  body: Record<string, unknown>,
  status = 200,
  headers?: HeadersInit,
): Response {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store', ...headers },
  })
}

async function getWaitlistCount(database: D1Database): Promise<number | null> {
  try {
    const total = await database
      .prepare("SELECT value AS count FROM waitlist_stats WHERE metric = 'total'")
      .first<CountRow>()
    return Number(total?.count ?? 0)
  } catch {
    return null
  }
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.WAITLIST_DB) {
    return response({ message: 'Waitlist storage is not configured.' }, 503)
  }

  let payload: SignupPayload

  try {
    payload = (await request.json()) as SignupPayload
  } catch {
    return response({ message: 'Send the form details as JSON.' }, 400)
  }

  if (typeof payload.website === 'string' && payload.website.trim()) {
    return response({ message: 'Unable to submit this form.' }, 400)
  }

  if (
    typeof payload.name !== 'string' ||
    typeof payload.email !== 'string' ||
    typeof payload.phone !== 'string' ||
    typeof payload.instagramHandle !== 'string'
  ) {
    return response(
      { message: 'Enter your name, email, mobile number, and Instagram handle.' },
      400,
    )
  }

  const validated = validateWaitlistInput({
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    instagramHandle: payload.instagramHandle,
  })

  if (!validated.ok) return response({ message: validated.message }, 400)

  if (!env.TURNSTILE_SECRET_KEY) {
    return response({ message: 'Waitlist verification is not configured.' }, 503)
  }

  if (typeof payload.turnstileToken !== 'string' || !payload.turnstileToken) {
    return response(
      { message: 'Complete the verification before joining the waitlist.' },
      400,
    )
  }

  let turnstileResult: { success?: boolean }
  try {
    const verification = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        body: new URLSearchParams({
          secret: env.TURNSTILE_SECRET_KEY,
          response: payload.turnstileToken,
        }),
      },
    )
    turnstileResult = (await verification.json()) as { success?: boolean }
  } catch {
    return response(
      { message: 'Unable to verify this submission. Please try again.' },
      503,
    )
  }

  if (!turnstileResult.success) {
    return response(
      { message: 'Complete the verification before joining the waitlist.' },
      400,
    )
  }

  let inserted: InsertResult
  try {
    inserted = await retryOperation(() =>
      env
        .WAITLIST_DB!.prepare(
          `INSERT INTO waitlist_entries (name, email, phone, instagram_handle)
         VALUES (?, ?, ?, ?)
         ON CONFLICT DO NOTHING`,
        )
        .bind(
          validated.value.name,
          validated.value.email,
          validated.value.phone,
          validated.value.instagramHandle,
        )
        .run(),
    )
  } catch {
    return response(
      { message: 'Unable to save your place right now. Please try again.' },
      503,
      { 'Retry-After': '2' },
    )
  }

  if (Number(inserted.meta.changes ?? 0) < 1) {
    const existing = await env.WAITLIST_DB.prepare(
      'SELECT id FROM waitlist_entries WHERE email = ? AND phone = ? LIMIT 1',
    )
      .bind(validated.value.email, validated.value.phone)
      .first<{ id: number }>()

    if (existing) {
      const count = await getWaitlistCount(env.WAITLIST_DB)
      return response(count === null ? {} : { count })
    }

    return response(
      { message: 'That email address or mobile number is already on the waitlist.' },
      409,
    )
  }

  const count = await getWaitlistCount(env.WAITLIST_DB)
  return response(count === null ? {} : { count }, 201)
}
