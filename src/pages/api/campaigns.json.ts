import type { APIRoute } from 'astro';

async function createCampaign(campaign) {
  return fetch('https://ojvozirqgxgiztlmasrm.supabase.co/rest/v1/campaigns?select=*', {
    method: "POST",
    headers: {
      "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qdm96aXJxZ3hnaXp0bG1hc3JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4OTE2OTksImV4cCI6MjAyODQ2NzY5OX0.67EZHcTdMsVFc9XF2BC1AlrcV-I-H5ho9G_9HiqzO4E",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qdm96aXJxZ3hnaXp0bG1hc3JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4OTE2OTksImV4cCI6MjAyODQ2NzY5OX0.67EZHcTdMsVFc9XF2BC1AlrcV-I-H5ho9G_9HiqzO4E",
      "Content-Type": "application/json",
      "Prefer": "resolution=merge-duplicates",
    },
    body: JSON.stringify(campaign)
  })

}


export const POST: APIRoute = async ({ request }) => {
  const body = await request.json()

  const campaign = {
    project_id: body.project_id,
    tag: body.tag,
    message: body.message,
  }

  await createCampaign(campaign)

  return new Response(JSON.stringify(campaign))
}
