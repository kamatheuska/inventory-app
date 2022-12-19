import fp from 'fastify-plugin';
import Env, { FastifyEnvOptions } from '@fastify/env';
import { Type } from '@sinclair/typebox';

import { AppConfig } from '../app.types';

export default fp<FastifyEnvOptions>(async (fastify) => {
    await fastify.register(Env, {
        schema: Type.Object({
            NODE_ENV: Type.String(),
            MONGODB_URI: Type.String(),
        }),
    });
});

declare module 'fastify' {
    export interface FastifyInstance {
        config: AppConfig;
    }
}
