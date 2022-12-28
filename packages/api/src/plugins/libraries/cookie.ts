import fp from 'fastify-plugin';
import cookie, { FastifyCookieOptions } from '@fastify/cookie';

export default fp<FastifyCookieOptions>(async (fastify) => {
    const { config } = fastify;

    fastify.register(cookie, {
        secret: config.JWT_SECRET,
    });
});
