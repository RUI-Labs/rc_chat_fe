import { l as lucia, c as createUser } from './auth_gncWJJpk.mjs';
import { nanoid } from 'nanoid';

const generateNonce = () => {
  return nanoid();
};
const POST = async ({ cookies, request }) => {
  console.log("nonce");
  let { address } = await request.json();
  console.log(address);
  if (!address) {
    return new Response(JSON.stringify({
      "error": "missing address"
    }), {
      status: 400,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  let nonce = generateNonce();
  let session = void 0;
  let createSession = async (address2) => {
    try {
      const _session = await lucia.createSession(address2, {
        nonce
      });
      console.log(_session);
      return _session;
    } catch (err) {
      console.log(err);
      if (err.code == 23503) {
        await createUser(address2);
        await createSession(address2);
      }
    }
  };
  session = await createSession(address);
  console.log(session);
  const sessionCookie = lucia.createSessionCookie(session?.id);
  cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  return new Response(JSON.stringify({
    "nonce": nonce
  }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export { POST };
