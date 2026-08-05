export type AdminEnv = {
  ADMIN_EMAIL?: string
  ADMIN_PASSWORD?: string
  ADMIN_SESSION_SECRET?: string
}

const encoder = new TextEncoder()
const sessionLifetimeSeconds = 60 * 60 * 24

function base64Url(bytes: Uint8Array): string {
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/u, '')
}

function stringToBase64Url(value: string): string {
  return base64Url(encoder.encode(value))
}

function base64UrlToString(value: string): string | null {
  try {
    const base64 = value.replaceAll('-', '+').replaceAll('_', '/')
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')
    return new TextDecoder().decode(
      Uint8Array.from(atob(padded), (character) => character.charCodeAt(0)),
    )
  } catch {
    return null
  }
}

async function hmac(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  return base64Url(
    new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(value))),
  )
}

function sameValue(left: string, right: string): boolean {
  const leftBytes = encoder.encode(left)
  const rightBytes = encoder.encode(right)
  let difference = leftBytes.length ^ rightBytes.length
  const size = Math.max(leftBytes.length, rightBytes.length)

  for (let index = 0; index < size; index += 1) {
    difference |= (leftBytes[index] ?? 0) ^ (rightBytes[index] ?? 0)
  }

  return difference === 0
}

export function hasAdminConfiguration(env: AdminEnv): boolean {
  return Boolean(env.ADMIN_EMAIL && env.ADMIN_PASSWORD && env.ADMIN_SESSION_SECRET)
}

export function validAdminCredentials(
  email: string,
  password: string,
  env: AdminEnv,
): boolean {
  return (
    hasAdminConfiguration(env) &&
    sameValue(email.trim().toLowerCase(), env.ADMIN_EMAIL!.trim().toLowerCase()) &&
    sameValue(password, env.ADMIN_PASSWORD!)
  )
}

export async function createAdminSession(env: AdminEnv): Promise<string> {
  const expiresAt = Math.floor(Date.now() / 1000) + sessionLifetimeSeconds
  const payload = 'v1.' + expiresAt
  const signature = await hmac(payload, env.ADMIN_SESSION_SECRET!)
  return stringToBase64Url(payload) + '.' + signature
}

export async function hasValidAdminSession(
  cookieHeader: string | null,
  env: AdminEnv,
): Promise<boolean> {
  if (!hasAdminConfiguration(env) || !cookieHeader) return false

  const session = cookieHeader
    .split(';')
    .map((item) => item.trim())
    .find((item) => item.startsWith('kouponly_admin_session='))
    ?.slice('kouponly_admin_session='.length)
  if (!session) return false

  const [encodedPayload, signature] = session.split('.')
  if (!encodedPayload || !signature) return false
  const payload = base64UrlToString(encodedPayload)
  if (!payload) return false

  const [version, expiresAt] = payload.split('.')
  if (
    version !== 'v1' ||
    !/^\d+$/u.test(expiresAt ?? '') ||
    Number(expiresAt) <= Math.floor(Date.now() / 1000)
  ) {
    return false
  }

  return sameValue(signature, await hmac(payload, env.ADMIN_SESSION_SECRET!))
}

export function sessionCookie(token: string, requestUrl: string): string {
  const secure = new URL(requestUrl).protocol === 'https:' ? '; Secure' : ''
  return (
    'kouponly_admin_session=' +
    token +
    '; HttpOnly; SameSite=Strict; Path=/api/admin; Max-Age=' +
    sessionLifetimeSeconds +
    secure
  )
}

export function clearSessionCookie(requestUrl: string): string {
  const secure = new URL(requestUrl).protocol === 'https:' ? '; Secure' : ''
  return (
    'kouponly_admin_session=; HttpOnly; SameSite=Strict; Path=/api/admin; Max-Age=0' +
    secure
  )
}
