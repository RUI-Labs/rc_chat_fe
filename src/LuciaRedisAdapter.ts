import { type Adapter, type DatabaseSession, type DatabaseUser } from "lucia";
import { Redis } from "@upstash/redis";

export class RedisAdapter implements Adapter{

	redis: Redis;

	constructor(url: string, token:string) {
	  this.redis = new Redis({
		url: url,
		token: token
	  })
	}
  
	async deleteExpiredSessions(): Promise<void> {
		const now = Math.floor(Date.now() / 1000);
		await this.redis.zremrangebyscore("session_expirations", 0, now);
	}
  
	async deleteSession(sessionId:string) {
	  await this.redis.del(`session:${sessionId}`);
	}
  
	async deleteUserSessions(userId:string) {
	  const sessions = await this.redis.smembers(`user_sessions:${userId}`);
	  sessions.forEach(async (session) => {
		await this.redis.del(`session:${session}`);
	  });
	  await this.redis.del(`user_sessions:${userId}`);
	}
  
	async getSessionAndUser(sessionId: string): Promise<[DatabaseSession | null, DatabaseUser | null]> {

		const sessionData:any = await this.redis.hgetall(`session:${sessionId}`);
		if (!sessionData?.id) {
		  return [null, null];
		}
		const userData:any = await this.redis.hgetall(`user:${sessionData.userId}`);
		const session: DatabaseSession = {
		  id: sessionData.id,
		  userId: sessionData.userId,
		  expiresAt: new Date(sessionData.expiresAt),
		  attributes: sessionData.attributes
		};


		const user: DatabaseUser = {
		  id: userData.id,
		  attributes: userData,
		};
		return [session, user];
	  }
  
	async getUserSessions(userId:string): Promise<DatabaseSession[]> {

	  const sessionIds = await this.redis.smembers(`user_sessions:${userId}`);
	  const sessions: DatabaseSession[] = [];
	  for (const id of sessionIds) {
		const sessionData:any = await this.redis.hgetall(`session:${id}`);
		
		let _sessionData:DatabaseSession = {
			id: sessionData.id,
			userId: sessionData.userId,
			expiresAt: new Date(sessionData.expiresAt),
			attributes: sessionData.attributes
		}
		
		sessions.push(_sessionData);
	  }
	  return sessions;
	}
  
	async setSession(session:any) {

		let user:any = await this.redis.hgetall(`user:${session.userId}`)

		if(!user?.id){
			await this.redis.hmset(`user:${session.userId}`, {
				id: session.userId,
			});
		}

		await this.redis.hmset(`session:${session.id}`,{
			id: session.id,
			userId: session.userId,
			expiresAt: session.expiresAt,
			attributes: session.attributes
		});

		await this.redis.sadd(`user_sessions:${session.userId}`, session.id);
		await this.redis.expire(`session:${session.id}`, Math.floor((session.expiresAt.getTime() - Date.now()) / 1000));
		await this.redis.zadd('session_expirations', { score: session.expiresAt.getTime() / 1000, member: session.id });

	}
  
	async updateSessionExpiration(sessionId:any, expiresAt:any) {
	  await this.redis.expire(`session:${sessionId}`, Math.floor((expiresAt.getTime() - Date.now()) / 1000));
	}
}