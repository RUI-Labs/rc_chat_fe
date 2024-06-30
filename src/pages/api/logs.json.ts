import type { APIRoute } from 'astro';

import supabase from "@/supabase";

export const POST: APIRoute = async ({ request }) => {

    const body = await request.json()
    const res = await supabase.from("logs").insert(body).select()
    return new Response(JSON.stringify(body));
  
}

