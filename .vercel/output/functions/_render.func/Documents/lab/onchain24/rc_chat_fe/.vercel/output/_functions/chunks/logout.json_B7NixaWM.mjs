import { l as lucia } from './auth_gncWJJpk.mjs';

const GET = async ({ cookies }) => {
  let sessionId = String(cookies.get(lucia.sessionCookieName)?.value);
  let { user } = await lucia.validateSession(sessionId);
  await lucia.invalidateUserSessions(String(user?.id));
  cookies.delete(lucia.sessionCookieName);
  return new Response(JSON.stringify({
    "message": "Successfully logged out"
  }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export { GET };
