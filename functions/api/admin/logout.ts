import { clearSessionCookie, type AdminEnv } from '../../../src/lib/admin-auth'

export const onRequestPost: PagesFunction<AdminEnv> = async ({ request }) =>
  Response.json(
    { authenticated: false },
    {
      headers: {
        'Cache-Control': 'no-store',
        'Set-Cookie': clearSessionCookie(request.url),
      },
    },
  )
