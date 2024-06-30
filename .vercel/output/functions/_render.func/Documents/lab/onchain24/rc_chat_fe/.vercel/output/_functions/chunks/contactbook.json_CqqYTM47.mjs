import { s as supabase } from './supabase_BGO4UJOO.mjs';

const POST = async ({ request }) => {
  const body = await request.json();
  await supabase.from("contact_books").upsert(body, { onConflict: "wallet_address" }).select();
  return new Response(body);
};

export { POST };
