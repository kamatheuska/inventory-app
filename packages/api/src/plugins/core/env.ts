import fp from 'fastify-plugin';
import Env, { FastifyEnvOptions } from '@fastify/env';
import { Type } from '@sinclair/typebox';
import debug from 'debug';

import { AppConfig } from '../../app.types';

const $debug = debug('app:debug:plugins:env');

export default fp<FastifyEnvOptions>(async (fastify) => {
    const schema = Type.Object({
        DISABLE_SIGNUP: Type.Boolean({ default: true }),
        JWT_SECRET: Type.String(),
        MONGODB_COLLECTION: Type.String({ default: 'inventory-app' }),
        MONGODB_HOST: Type.String({ default: 'localhost' }),
        MONGODB_PASSWORD: Type.String(),
        MONGODB_PORT: Type.Number({ default: 27017 }),
        MONGODB_PROTOCOL: Type.String({ default: 'mongodb' }),
        MONGODB_SERVER_SELECTION_TIMEOUT_MS: Type.Number({ default: 10000 }),
        MONGODB_URI: Type.String(),
        MONGODB_USER: Type.String(),
        NODE_ENV: Type.String(),
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
