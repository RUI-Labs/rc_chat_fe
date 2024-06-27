import { lucia } from "@/auth"

import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({cookies}) => {

    let sessionId = String(cookies.get(lucia.sessionCookieName)?.value)

    let { user } = await lucia.validateSession(sessionId)
    // console.log(session)
    await lucia.invalidateUserSessions(String(user?.id));

    cookies.delete(lucia.sessionCookieName)

    return new Response(JSON.stringify({
        "message": "Successfully logged out"
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })

}