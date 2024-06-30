import { s as supabase } from './supabase_BGO4UJOO.mjs';

const POST = async ({ request }) => {
  const body = await request.json();
  const { data } = await supabase.from("stamps").upsert(body).select();
  return new Response(JSON.stringify(data));
};

export { POST };
