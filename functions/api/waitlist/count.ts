type Env = {
  WAITLIST_DB?: D1Database
}

type CountRow = {
  count: number
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  if (!env.WAITLIST_DB) {
    return Response.json(
      { message: 'Waitlist storage is not configured.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    )
  }

  const result = await env.WAITLIST_DB.prepare(
    'SELECT COUNT(*) AS count FROM waitlist_entries',
  ).first<CountRow>()

  return Response.json(
    { count: Number(result?.count ?? 0) },
    { headers: { 'Cache-Control': 'no-store' } },
  )
}
