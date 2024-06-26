import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {

  const body = await request.json()
  await fetch('https://ojvozirqgxgiztlmasrm.supabase.co/rest/v1/xmtp_keys', {
    method: "POST",
    headers: {
      "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qdm96aXJxZ3hnaXp0bG1hc3JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4OTE2OTksImV4cCI6MjAyODQ2NzY5OX0.67EZHcTdMsVFc9XF2BC1AlrcV-I-H5ho9G_9HiqzO4E",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qdm96aXJxZ3hnaXp0bG1hc3JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4OTE2OTksImV4cCI6MjAyODQ2NzY5OX0.67EZHcTdMsVFc9XF2BC1AlrcV-I-H5ho9G_9HiqzO4E",
      "Content-Type": "application/json",
      "Prefer": "resolution=ignore-duplicates",
    },
    body: JSON.stringify(body)
  })
  .then(res => res.json())
  .then(console.log)

  return new Response(JSON.stringify(
    body
  ))
}
