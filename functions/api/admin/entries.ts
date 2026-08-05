import {
  hasAdminConfiguration,
  hasValidAdminSession,
  type AdminEnv,
} from '../../../src/lib/admin-auth'

type Env = AdminEnv & {
  WAITLIST_DB?: D1Database
}

type Entry = {
  id: number
  name: string
  email: string
  phone: string
  instagram_handle: string
  created_at: string
}

function response(body: Record<string, unknown>, status = 200): Response {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  })
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  if (!hasAdminConfiguration(env)) {
    return response({ message: 'Admin access is not configured.' }, 503)
  }

  if (!(await hasValidAdminSession(request.headers.get('Cookie'), env))) {
    return response({ message: 'Sign in to view waitlist entries.' }, 401)
  }

  if (!env.WAITLIST_DB) {
    return response({ message: 'Waitlist storage is not configured.' }, 503)
  }

  const url = new URL(request.url)
  const offset = Math.max(
    0,
    Number.parseInt(url.searchParams.get('offset') ?? '0', 10) || 0,
  )
  const limit = Math.min(
    100,
    Math.max(1, Number.parseInt(url.searchParams.get('limit') ?? '100', 10) || 100),
  )
  let entries: D1Result<Entry>
  let count: { count?: number } | null
  try {
    entries = await env.WAITLIST_DB.prepare(
      'SELECT id, name, email, phone, instagram_handle, created_at ' +
        'FROM waitlist_entries ORDER BY id DESC LIMIT ? OFFSET ?',
    )
      .bind(limit, offset)
      .all<Entry>()
    count = await env.WAITLIST_DB.prepare(
      'SELECT COUNT(*) AS count FROM waitlist_entries',
    ).first<{ count?: number }>()
  } catch {
    return response({ message: 'Unable to load waitlist entries.' }, 500)
  }

  return response({
    entries: entries.results,
    count: Number(count?.count ?? 0),
  })
}
