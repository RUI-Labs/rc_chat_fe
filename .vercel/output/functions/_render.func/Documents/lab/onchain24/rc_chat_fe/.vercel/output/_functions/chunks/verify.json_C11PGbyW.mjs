import { l as lucia } from './auth_gncWJJpk.mjs';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
});
const POST = async ({ cookies, request }) => {
  let { message, signature, address } = await request.json();
  let sessionId = String(cookies.get(lucia.sessionCookieName)?.value);
  let session = void 0;
  try {
    session = await lucia.validateSession(sessionId);
    console.log(session);
  } catch (error) {
    console.log(error);
  }
  const siweMessageValid = await publicClient.verifyMessage({
    address,
    message,
    signature
  });
  if (!siweMessageValid) {
    return new Response(JSON.stringify({
      "error": "Invalid nonce"
    }), {
      status: 422,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  try {
    await lucia.invalidateUserSessions(address);
  } catch (error) {
    console.log(error);
  }
  let new_session = void 0;
  let createSession = async (address2) => {
    try {
      const _session = await lucia.createSession(address2, {
        nonce: session.session?.nonce,
        siwe: signature
      });
      console.log(_session);
      return _session;
    } catch (err) {
      console.log(err.code);
    }
  };
  new_session = await createSession(address);
  const sessionCookie = lucia.createSessionCookie(new_session.id);
  cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  return new Response(JSON.stringify(new_session), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export { POST };
