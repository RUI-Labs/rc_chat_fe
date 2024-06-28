import type { APIRoute } from 'astro';

import supabase from "@/supabase";

export const POST: APIRoute = async ({ request }) => {

    const body = await request.json()

    // const r = await fetch('https://ojvozirqgxgiztlmasrm.supabase.co/rest/v1/stamps', {
    //     method: "POST",
    //     headers: {
    //         "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qdm96aXJxZ3hnaXp0bG1hc3JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4OTE2OTksImV4cCI6MjAyODQ2NzY5OX0.67EZHcTdMsVFc9XF2BC1AlrcV-I-H5ho9G_9HiqzO4E",
    //         "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qdm96aXJxZ3hnaXp0bG1hc3JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4OTE2OTksImV4cCI6MjAyODQ2NzY5OX0.67EZHcTdMsVFc9XF2BC1AlrcV-I-H5ho9G_9HiqzO4E",
    //         "Content-Type": "application/json",
    //         "Prefer": "resolution=merge-duplicates",
    //     },
    //     body: JSON.stringify(body)
    // })
    // .then(res => res.text())
    // console.log(r)

    const { data, error } = await supabase.from("stamps").upsert(body, { onConflict: ['wallet_address', 'campaign_id', 'project_id'] }).select();
    return new Response(JSON.stringify(data));

    // return new Response(JSON.stringify(body));
}