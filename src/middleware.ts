// src/middleware.ts
import { lucia } from "./auth";
import { verifyRequestOrigin } from "lucia";
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {

    // if context path's has /api, then we just return next()

    if(context.url.pathname.startsWith('/api')) {
        return next()
    }

	//if the url matches 
	// /mo/<id>
	let url = context.url.pathname
	if(url.match(/\/mo\/\d+/)){
		// get the id
		let id = url.split('/')[2]
		console.log(id)

		const resp = await fetch(`https://ojvozirqgxgiztlmasrm.supabase.co/rest/v1/campaigns?id=eq.${id}&select=*,projects(*)`, {
			method: "GET",
			headers: {
			  "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qdm96aXJxZ3hnaXp0bG1hc3JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4OTE2OTksImV4cCI6MjAyODQ2NzY5OX0.67EZHcTdMsVFc9XF2BC1AlrcV-I-H5ho9G_9HiqzO4E",
			  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qdm96aXJxZ3hnaXp0bG1hc3JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4OTE2OTksImV4cCI6MjAyODQ2NzY5OX0.67EZHcTdMsVFc9XF2BC1AlrcV-I-H5ho9G_9HiqzO4E",
			}
		  })

		const result = await resp.json();
		console.log(result)

		let project = result[0].projects.token_symbol

		return context.redirect(`/project_1/${project}?campaign=${id}`)
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
