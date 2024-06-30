
import supabase from '@/supabase';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const owner_address = context.url.searchParams.get('owner')
  const resp = await fetch(`https://ojvozirqgxgiztlmasrm.supabase.co/rest/v1/projects?owner_address=eq.${owner_address?.toLowerCase()}&select=*`, {
    method: "GET",
    headers: {
      "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qdm96aXJxZ3hnaXp0bG1hc3JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4OTE2OTksImV4cCI6MjAyODQ2NzY5OX0.67EZHcTdMsVFc9XF2BC1AlrcV-I-H5ho9G_9HiqzO4E",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qdm96aXJxZ3hnaXp0bG1hc3JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4OTE2OTksImV4cCI6MjAyODQ2NzY5OX0.67EZHcTdMsVFc9XF2BC1AlrcV-I-H5ho9G_9HiqzO4E",
    }
  })
  const result = await resp.json();
  return new Response(JSON.stringify(result))
}

export const POST: APIRoute = async (context) => {
  const body = await context.request.json()
  const project = await supabase.from('projects').insert(body).select().single().then(res => res.data)
  return new Response(JSON.stringify(project))
}
