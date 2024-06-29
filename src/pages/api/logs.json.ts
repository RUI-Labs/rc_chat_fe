import type { APIRoute } from 'astro';

import supabase from "@/supabase";

export const POST: APIRoute = async ({ request }) => {

    const body = await request.json()
    await supabase.from("logs").insert(body)
    return new Response(body);
  
}

