type Env = {
  ASSETS: Fetcher
}

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  const indexUrl = new URL('/', request.url)
  const assetResponse = await env.ASSETS.fetch(new Request(indexUrl, request))
  const headers = new Headers(assetResponse.headers)
  headers.set('Cache-Control', 'no-store')

  return new Response(assetResponse.body, {
    status: assetResponse.status,
    statusText: assetResponse.statusText,
    headers,
  })
}
