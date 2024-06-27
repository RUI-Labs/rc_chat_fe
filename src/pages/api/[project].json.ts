import type { APIRoute } from 'astro';
import { $projectData } from '@/stores/stamp';
export const GET: APIRoute = async (context) => {

    const resp = await fetch(`https://ojvozirqgxgiztlmasrm.supabase.co/rest/v1/projects?token_symbol=eq.${context.params.project?.toUpperCase()}&select=*,campaigns(*)`, {
        method: "GET",
        headers: {
            "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qdm96aXJxZ3hnaXp0bG1hc3JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4OTE2OTksImV4cCI6MjAyODQ2NzY5OX0.67EZHcTdMsVFc9XF2BC1AlrcV-I-H5ho9G_9HiqzO4E",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qdm96aXJxZ3hnaXp0bG1hc3JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4OTE2OTksImV4cCI6MjAyODQ2NzY5OX0.67EZHcTdMsVFc9XF2BC1AlrcV-I-H5ho9G_9HiqzO4E",
        }
    })
    const result = await resp.json();
    return new Response(JSON.stringify(result[0]))
}
