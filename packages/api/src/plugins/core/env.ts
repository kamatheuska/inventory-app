import fp from 'fastify-plugin';
import Env, { FastifyEnvOptions } from '@fastify/env';
import { Type } from '@sinclair/typebox';
import debug from 'debug';

import { AppConfig } from '../../app.types';

const $debug = debug('app:debug:plugins:env');

export default fp<FastifyEnvOptions>(async (fastify) => {
    const schema = Type.Object({
        // Required
        JWT_SECRET: Type.String(),
        MONGODB_URI: Type.String(),
        NODE_ENV: Type.String(),

        // Optional with Defaults
        PORT: Type.Optional(Type.Number({ default: 3000 })),
        MONGODB_SERVER_SELECTION_TIMEOUT_MS: Type.Optional(Type.Number({ default: 10000 })),
        DISABLE_SIGNUP: Type.Optional(Type.Boolean({ default: true })),
    });

    $debug('Init plugin. Schema: %O: ', schema);

    await fastify.register(Env, {
        schema,
    });
});

declare module 'fastify' {
    export interface FastifyInstance {
        config: AppConfig;
    }
}
