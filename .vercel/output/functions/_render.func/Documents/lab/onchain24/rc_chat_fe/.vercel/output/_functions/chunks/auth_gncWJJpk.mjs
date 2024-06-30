import { Lucia } from 'lucia';
import { Redis } from '@upstash/redis';

class RedisAdapter {
  redis;
  constructor(url, token) {
    this.redis = new Redis({
      url,
      token
    });
  }
  async deleteExpiredSessions() {
    const now = Math.floor(Date.now() / 1e3);
    await this.redis.zremrangebyscore("session_expirations", 0, now);
  }
  async deleteSession(sessionId) {
    await this.redis.del(`session:${sessionId}`);
  }
  async deleteUserSessions(userId) {
    const sessions = await this.redis.smembers(`user_sessions:${userId}`);
    sessions.forEach(async (session) => {
      await this.redis.del(`session:${session}`);
    });
    await this.redis.del(`user_sessions:${userId}`);
  }
  async getSessionAndUser(sessionId) {
    const sessionData = await this.redis.hgetall(`session:${sessionId}`);
    if (!sessionData?.id) {
      return [null, null];
    }
    const userData = await this.redis.hgetall(`user:${sessionData.userId}`);
    const session = {
      id: sessionData.id,
      userId: sessionData.userId,
      expiresAt: new Date(sessionData.expiresAt),
      attributes: sessionData.attributes
    };
    const user = {
      id: userData.id,
      attributes: userData
    };
    return [session, user];
  }
  async getUserSessions(userId) {
    const sessionIds = await this.redis.smembers(`user_sessions:${userId}`);
    const sessions = [];
    for (const id of sessionIds) {
      const sessionData = await this.redis.hgetall(`session:${id}`);
      let _sessionData = {
        id: sessionData.id,
        userId: sessionData.userId,
        expiresAt: new Date(sessionData.expiresAt),
        attributes: sessionData.attributes
      };
      sessions.push(_sessionData);
    }
    return sessions;
  }
  async setSession(session) {
    let user = await this.redis.hgetall(`user:${session.userId}`);
    if (!user?.id) {
      await this.redis.hmset(`user:${session.userId}`, {
        id: session.userId
      });
    }
    await this.redis.hmset(`session:${session.id}`, {
      id: session.id,
      userId: session.userId,
      expiresAt: session.expiresAt,
      attributes: session.attributes
    });
    await this.redis.sadd(`user_sessions:${session.userId}`, session.id);
    await this.redis.expire(`session:${session.id}`, Math.floor((session.expiresAt.getTime() - Date.now()) / 1e3));
    await this.redis.zadd("session_expirations", { score: session.expiresAt.getTime() / 1e3, member: session.id });
  }
  async updateSessionExpiration(sessionId, expiresAt) {
    await this.redis.expire(`session:${sessionId}`, Math.floor((expiresAt.getTime() - Date.now()) / 1e3));
  }
}

let adapter = new RedisAdapter("https://natural-dragon-44463.upstash.io", "Aa2vAAIncDE4NTM0NDE1NDAwMGQ0OTkwYTZmYzlmY2UyNzViNGJjZHAxNDQ0NjM");
const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: true
    }
  },
  getSessionAttributes: (attributes) => {
    return {
      nonce: attributes.nonce,
      siwe: attributes.siwe
    };
  }
});
const createUser = async (userId) => {
  const redis = new Redis({
    url: "https://natural-dragon-44463.upstash.io",
    token: "Aa2vAAIncDE4NTM0NDE1NDAwMGQ0OTkwYTZmYzlmY2UyNzViNGJjZHAxNDQ0NjM"
  });
  let result = await redis.hmset(`user:${userId}`, {
    id: userId
  });
  console.log(result);
  return;
};

export { createUser as c, lucia as l };
