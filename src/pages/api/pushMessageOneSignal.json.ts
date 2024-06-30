import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {

  const body = await request.json()

  await fetch('https://urfeq0k3k8.execute-api.ap-southeast-1.amazonaws.com/pushMessage', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  })
  .then(res => res.text())
  .then(console.log)

  return new Response(JSON.stringify(body))
}
