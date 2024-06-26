import type { APIRoute } from 'astro';

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

async function createProject(project) {
  return fetch('https://ojvozirqgxgiztlmasrm.supabase.co/rest/v1/projects', {
    method: "POST",
    headers: {
      "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qdm96aXJxZ3hnaXp0bG1hc3JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4OTE2OTksImV4cCI6MjAyODQ2NzY5OX0.67EZHcTdMsVFc9XF2BC1AlrcV-I-H5ho9G_9HiqzO4E",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qdm96aXJxZ3hnaXp0bG1hc3JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4OTE2OTksImV4cCI6MjAyODQ2NzY5OX0.67EZHcTdMsVFc9XF2BC1AlrcV-I-H5ho9G_9HiqzO4E",
      "Content-Type": "application/json",
      "Prefer": "resolution=merge-duplicates",
    },
    body: JSON.stringify(project)
  })
  .then(res => res.json())

}

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json()

  const tokenMetadata = await fetchTokenMetadata(body.token)
  console.log(tokenMetadata)
  console.log({
    name: tokenMetadata.name,
    token_address: tokenMetadata.value,
    owner_address: body.owner

  })

  const project = await createProject({
    token_address: body.token,
    token_name: tokenMetadata.name,
    token_symbol: tokenMetadata.symbol,
    owner_address: body.owner
  })

  return new Response(JSON.stringify(project))
}
