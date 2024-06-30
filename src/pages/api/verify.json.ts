import { lucia } from '@/auth'
import type { APIRoute } from 'astro';
// import { SiweMessage } from 'siwe'
// import { verifyMessage } from 'ethers'

import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})

export const POST: APIRoute = async ({cookies,request}) => {

    let { message, signature, address } = await request.json()

    console.log(message, signature, address)

    // console.log("VERIFY")

    // validate the session first
    let sessionId = String(cookies.get(lucia.sessionCookieName)?.value)
    let session:any = undefined
    
    try{
        session = await lucia.validateSession(sessionId)
        console.log(session)
    } catch (error) {
        console.log(error)
    }

    let siweMessageValid = false

    try {

        siweMessageValid = await publicClient.verifyMessage({
            address: address,
            message: message,
            signature: signature
        })

        // console.log("SIWE", siweMessageValid)
    } catch (error) {
        console.log(error)
    }
    
    // const fields = await siweMessage.verify({signature})
 
    if (!siweMessageValid) {
        // return res.status(422).json({ message: 'Invalid nonce.' })
        return new Response(JSON.stringify({
            "error": "Invalid nonce"
        }), {
            status: 422,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    
    /// if matched, invalidate all sessions
    //. and create a new session

    try {
        await lucia.invalidateUserSessions(address);
    } catch (error) {
        console.log(error)
    }

    let new_session:any = undefined

    let createSession = async (address:any) => {
        try {
            const _session = await lucia.createSession(address, {
                nonce: session.session?.nonce,
                siwe: signature
            });

            console.log(_session)

            return _session
        }catch(err:any){
            console.log(err.code)
        }
    }

    new_session = await createSession(address)

    const sessionCookie = lucia.createSessionCookie(new_session.id);
    cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

    // console.log(new_session)
    

    return new Response(JSON.stringify(new_session), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })

}