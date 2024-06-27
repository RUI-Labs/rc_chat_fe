// src/auth.ts
import { Lucia } from "lucia";
import { RedisAdapter } from "./LuciaRedisAdapter";
import { Redis } from "@upstash/redis";


let adapter = new RedisAdapter('https://natural-dragon-44463.upstash.io','Aa2vAAIncDE4NTM0NDE1NDAwMGQ0OTkwYTZmYzlmY2UyNzViNGJjZHAxNDQ0NjM')

export const lucia = new Lucia( adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: true
		}
	},
	getSessionAttributes: (attributes:any) => {
		return {
			nonce: attributes.nonce,
			siwe: attributes.siwe
		};
	}
});

export const createUser = async (userId: string) => {

	// let redis = new Redis("rediss://default:Aa2vAAIncDE4NTM0NDE1NDAwMGQ0OTkwYTZmYzlmY2UyNzViNGJjZHAxNDQ0NjM@primary-macaw-52276.upstash.io:6379")
	const redis = new Redis({
		url: 'https://natural-dragon-44463.upstash.io',
		token: 'Aa2vAAIncDE4NTM0NDE1NDAwMGQ0OTkwYTZmYzlmY2UyNzViNGJjZHAxNDQ0NjM',
	  })
	  
	// insert user into redis

	let result = await redis.hmset(`user:${userId}`, {
		id: userId
	});

	console.log(result)

	return

	// const users = await sql`INSERT INTO lucia_auth_user (id) VALUES (${userId}) RETURNING *`
	
	// return users

} 

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
	}
}