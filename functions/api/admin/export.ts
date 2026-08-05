import {
  hasAdminConfiguration,
  hasValidAdminSession,
  type AdminEnv,
} from '../../../src/lib/admin-auth'

type Env = AdminEnv & { WAITLIST_DB?: D1Database }

function csvCell(value: unknown): string {
  return `"${String(value ?? '').replaceAll('"', '""')}"`
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  if (!hasAdminConfiguration(env)) {
    return new Response('Admin access is not configured.', { status: 503 })
  }

  if (!(await hasValidAdminSession(request.headers.get('Cookie'), env))) {
    return new Response('Sign in to export waitlist entries.', { status: 401 })
  }

  if (!env.WAITLIST_DB) {
    return new Response('Waitlist storage is not configured.', { status: 503 })
  }

  try {
    const result = await env.WAITLIST_DB.prepare(
      'SELECT name, email, phone, instagram_handle, created_at ' +
        'FROM waitlist_entries ORDER BY id DESC',
    ).all<{
      name: string
      email: string
      phone: string
      instagram_handle: string
      created_at: string
    }>()

    const rows = [
      ['Name', 'Email', 'Mobile', 'Instagram', 'Joined'],
      ...result.results.map((entry) => [
        entry.name,
        entry.email,
        entry.phone,
        entry.instagram_handle ? `@${entry.instagram_handle}` : '',
        entry.created_at,
      ]),
    ]
    const csv = rows.map((row) => row.map(csvCell).join(',')).join('\r\n') + '\r\n'

    return new Response(csv, {
      headers: {
        'Cache-Control': 'no-store',
        'Content-Disposition': 'attachment; filename="kouponly-waitlist.csv"',
        'Content-Type': 'text/csv; charset=utf-8',
      },
    })
  } catch {
    return new Response('Unable to export waitlist entries.', { status: 500 })
  }
}
