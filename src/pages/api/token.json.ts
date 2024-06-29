import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const token = context.url.searchParams.get('token')
  if (!token) {
    return new Response('Token address is required', { status: 400 })
  }
  const metadata = await fetchTokenMetadata(token)

  return new Response(JSON.stringify(metadata))
}

async function fetchTokenMetadata(tokenAddress: string) {
  return fetch('https://base-mainnet.g.alchemy.com/v2/cOI6YkiomPgpNGs89aF2LTMS50_vpRr2', {
    method: "POST",
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      "id": 1,
      "jsonrpc": "2.0",
      "method": "alchemy_getTokenMetadata",
      "params": [
        tokenAddress
      ]
    })
  })
    .then(res => res.json())
    .then(res => res.result)
}
