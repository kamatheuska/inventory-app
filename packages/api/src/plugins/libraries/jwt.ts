import fp from 'fastify-plugin';
import jwt, { FastifyJWTOptions } from '@fastify/jwt';
import '@fastify/jwt';
import { FastifyRequest } from 'fastify';
import { FastifyReply } from 'fastify';
import { cookies } from '../../lib/constants';
import { TokenPayload } from '@inventory-app/types';

type AuthenticateFunction = (request: FastifyRequest, reply: FastifyReply) => any;

export default fp<FastifyJWTOptions>(async (fastify) => {
    const { config } = fastify;

    await fastify.register(jwt, {
        secret: config.JWT_SECRET,
        cookie: {
            cookieName: cookies.AUTH,
            signed: false,
        },
    });

    fastify.decorate<AuthenticateFunction>('authenticate', async function (request, reply) {
        try {
            await request.jwtVerify();
        } catch (error) {
            reply.send(error);
        }
    });
});

declare module '@fastify/jwt' {
    interface FastifyJWT {
        payload: TokenPayload;
        user: {
            id: number;
            name: string;
            age: number;
        }; // user type is return type of `request.user` object
    }
}
