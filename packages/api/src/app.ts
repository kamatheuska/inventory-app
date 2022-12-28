import { join } from 'path';
import { FastifyPluginAsync } from 'fastify';

import AutoLoad from '@fastify/autoload';

import { AppOptions, LoggerOptions } from './app.types';
import movementPlugin from './api/movements/movement.plugin';
import ingredientsPlugin from './api/ingredients/ingredients.plugin';
import storageItemPlugin from './api/storageItems/storage-item.plugin';
import authPlugin from './api/auth/auth.plugin';

const app: FastifyPluginAsync<AppOptions> = async function app(fastify, options) {
    await fastify.register(AutoLoad, { dir: join(__dirname, 'plugins/core'), options });
    await fastify.register(AutoLoad, { dir: join(__dirname, 'plugins/database'), options });
    await fastify.register(AutoLoad, { dir: join(__dirname, 'plugins/libraries'), options });

    await fastify.register(authPlugin);
    await fastify.register(movementPlugin);
    await fastify.register(ingredientsPlugin);
    await fastify.register(storageItemPlugin);
};

function getOptions(): AppOptions {
    let loggerOptions: LoggerOptions = true;

    if (process.env.NODE_ENV === 'development') {
        loggerOptions = {
            transport: {
                target: 'pino-pretty',
            },
        };
    } else if (process.env.NODE_ENV === 'test') {
        loggerOptions = false;
    }

    return {
        logger: loggerOptions,
        pluginTimeout: 0,
    };
}

const options = getOptions();
export default app;

export { app, options };
