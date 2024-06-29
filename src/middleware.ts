// src/middleware.ts
import { lucia } from "./auth";
import { verifyRequestOrigin } from "lucia";
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {

    // if context path's has /api, then we just return next()

    if(context.url.pathname.startsWith('/api')) {
        return next()
    }

	

	// console.log(context.url.pathname)

	if(context.url.pathname.startsWith('/admin')) {
		if (context.request.method !== "GET") {
			const originHeader = context.request.headers.get("Origin");
			const hostHeader = context.request.headers.get("Host");
			if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
				return new Response(null, {
					status: 403
				});
			}
		}
	
		const sessionId = context.cookies.get(lucia.sessionCookieName)?.value ?? null;
		if (!sessionId) {
			context.locals.user = null;
			context.locals.session = null;
			return next();
		}
	
		const { session, user } = await lucia.validateSession(sessionId);

		// if(context.url.pathname == '/admin/login' && !session?.siwe){
		// 	return next()
		// }

		if(!session && context.url.pathname != '/admin/login'){
			return context.redirect('/admin/login')
		}

		console.log(session)
	
		if (!session?.siwe){
			await lucia.invalidateUserSessions(String(user?.id));
			context.locals.user = null;
			context.locals.session = null;
			
			return next();
		}
	
		if (session && session.fresh) {
			const sessionCookie = lucia.createSessionCookie(session?.id);
			context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		}
		if (!session) {
			const sessionCookie = lucia.createBlankSessionCookie();
			context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		}
		context.locals.session = session;
		context.locals.user = user;

		if(session?.siwe && context.url.pathname == '/admin/login') {
			return context.redirect('/admin')
		}
		return next();

	}

	return next();
    
});