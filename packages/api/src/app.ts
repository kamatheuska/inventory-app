import { join } from 'path';
import { FastifyPluginAsync } from 'fastify';
import debug from 'debug';

import AutoLoad from '@fastify/autoload';

import { AppOptions } from './app.types';
import movementPlugin from './api/movements/movement.plugin';
import ingredientsPlugin from './api/ingredients/ingredients.plugin';
import storageItemPlugin from './api/storageItems/storage-item.plugin';
import authPlugin from './api/auth/auth.plugin';

const d = debug('app:root');

const app: FastifyPluginAsync<AppOptions> = async function app(fastify, options) {
    d('Start app with options: %O', options);

    await fastify.register(AutoLoad, { dir: join(__dirname, 'plugins/core'), options });
    await fastify.register(AutoLoad, { dir: join(__dirname, 'plugins/database'), options });
    await fastify.register(AutoLoad, { dir: join(__dirname, 'plugins/libraries'), options });

    await fastify.register(authPlugin);
    await fastify.register(movementPlugin);
    await fastify.register(ingredientsPlugin);
    await fastify.register(storageItemPlugin);
};

export default app;

export { app };
