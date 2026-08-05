import {
  createAdminSession,
  hasAdminConfiguration,
  sessionCookie,
  validAdminCredentials,
  type AdminEnv,
} from '../../../src/lib/admin-auth'

type LoginPayload = {
  email?: unknown
  password?: unknown
}

function response(body: Record<string, unknown>, status = 200, headers?: HeadersInit) {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store', ...headers },
  })
}

export const onRequestPost: PagesFunction<AdminEnv> = async ({ request, env }) => {
  if (!hasAdminConfiguration(env)) {
    return response({ message: 'Admin access is not configured.' }, 503)
  }

  let payload: LoginPayload
  try {
    payload = (await request.json()) as LoginPayload
  } catch {
    return response({ message: 'Enter your email and password.' }, 400)
  }

  if (typeof payload.email !== 'string' || typeof payload.password !== 'string') {
    return response({ message: 'Enter your email and password.' }, 400)
  }

  if (!validAdminCredentials(payload.email, payload.password, env)) {
    return response({ message: 'Email or password is incorrect.' }, 401)
  }

  const token = await createAdminSession(env)
  return response({ authenticated: true }, 200, {
    'Set-Cookie': sessionCookie(token, request.url),
  })
}
