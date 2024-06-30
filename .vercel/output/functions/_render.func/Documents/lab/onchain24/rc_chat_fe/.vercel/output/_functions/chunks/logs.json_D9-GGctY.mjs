import { s as supabase } from './supabase_BGO4UJOO.mjs';

const POST = async ({ request }) => {
  const body = await request.json();
  await supabase.from("logs").insert(body);
  return new Response(body);
};

export { POST };
