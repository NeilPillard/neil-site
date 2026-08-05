import { validateWaitlistInput } from '../../../src/lib/waitlist'

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

function response(body: Record<string, unknown>, status = 200): Response {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  })
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

  const inserted = await env.WAITLIST_DB.prepare(
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
    .run()

  if (inserted.meta.changes !== 1) {
    return response(
      { message: 'That email address or mobile number is already on the waitlist.' },
      409,
    )
  }

  const total = await env.WAITLIST_DB.prepare(
    'SELECT COUNT(*) AS count FROM waitlist_entries',
  ).first<CountRow>()

  return response({ count: Number(total?.count ?? 0) }, 201)
}
