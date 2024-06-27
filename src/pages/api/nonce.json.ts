// import { generateNonce } from 'siwe'
import { lucia, createUser } from '@/auth'
// import { LuciaError } from "lucia";
import type { APIRoute } from 'astro';
import { nanoid } from 'nanoid'

const generateNonce = () => {
    return nanoid()
}

export const POST: APIRoute = async ({cookies,request}) => {

    console.log('nonce')
    let {address} = await request.json()
    console.log(address)

    if(!address) {
        return new Response(JSON.stringify({
            "error": "missing address"
        }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    let nonce = generateNonce()

    let session:any = undefined

    let createSession = async (address:any) => {
        try {
            const _session = await lucia.createSession(address, {
                nonce: nonce
            });

            console.log(_session)

            return _session
        }catch(err:any){
            console.log(err)
    
            if(err.code == 23503){
                await createUser(address)
                await createSession(address)
            }
        }
    }

    session = await createSession(address)

    console.log(session)

    const sessionCookie = lucia.createSessionCookie(session?.id);
    // console.log(sessionCookie)

    cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

    return new Response(JSON.stringify({
        "nonce": nonce
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })

    /*try {
        const session = await lucia.createSession({
            userId,
            attributes: {} // expects `Lucia.DatabaseSessionAttributes`
        });
        const sessionCookie = lucia.createSessionCookie(session);
        setSessionCookie(session);
    } catch (e) {
        if (e instanceof LuciaError && e.message === `AUTH_INVALID_USER_ID`) {
            // invalid user id
        }
        // unexpected database errors
    }*/


}