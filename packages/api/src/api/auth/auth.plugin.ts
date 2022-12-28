import { FastifyInstance } from 'fastify';
import { Static, Type } from '@sinclair/typebox';

import AuthService from './auth.service';
import { cookies } from '../../lib/constants';

const CredentialsBodySchema = Type.Object({
    username: Type.String(),
    password: Type.String(),
});

export type CredentialsBodySchemaType = Static<typeof CredentialsBodySchema>;

async function authPlugin(fastify: FastifyInstance) {
    const { config } = fastify;

    fastify.route<{ Body: CredentialsBodySchemaType }>({
        method: 'POST',
        url: '/api/auth/signup',
        schema: {
            body: CredentialsBodySchema,
        },
        handler: async (req, reply) => {
            if (config.DISABLE_SIGNUP) return reply.badRequest('Signup is disabled');

            const { username, password } = req.body;
            const secret = config.JWT_SECRET;

            return AuthService.signup({ username, password }, secret);
        },
    });

    fastify.route<{ Body: CredentialsBodySchemaType }>({
        method: 'POST',
        url: '/api/auth/login',
        schema: {
            body: CredentialsBodySchema,
        },
        handler: async (req, reply) => {
            const { username, password } = req.body;
            const secret = config.JWT_SECRET;

            const token = await AuthService.login({ username, password }, secret);

            reply
                .setCookie(cookies.AUTH, token.hash, {
                    httpOnly: true,
                    signed: true,
                    path: '/',
                })
                .send();
        },
    });
}

export default authPlugin;
