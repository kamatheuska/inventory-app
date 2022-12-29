import mongoose from 'mongoose';
import fp from 'fastify-plugin';
import debug from 'debug';

import { AppConfig, MongooseDecorator } from '../../app.types';
import { FastifyInstance } from 'fastify';
import { connectToDatabase } from '../../lib/db/connect';

const $debug = debug('app:info:plugins:env');

type PluginOptions = {
    MONGODB_SERVER_SELECTION_TIMEOUT_MS: number;
};

const buildUri = (config: AppConfig): string => {
    const { MONGODB_PROTOCOL, MONGODB_USER, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_PORT, MONGODB_COLLECTION } = config;

    $debug('Mongoose Connection Options: %O', {
        MONGODB_PROTOCOL,
        MONGODB_USER,
        MONGODB_HOST,
        MONGODB_PORT,
        MONGODB_COLLECTION,
    });

    return `${MONGODB_PROTOCOL}://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_COLLECTION}`;
};

export default fp<PluginOptions>(
    async function mongoosePlugin(fastify, options) {
        const { config } = fastify;

        mongoose.connection.on('error', (e) => {
            throw e;
        });

        async function closeConnection(instance: FastifyInstance) {
            instance.mongoosePlugin.instance.connection.close();
        }

        const mongooseDecorator = {
            instance: mongoose,
        };

        fastify.addHook('onClose', closeConnection);
        fastify.decorate('mongoosePlugin', mongooseDecorator);
        try {
            const uri = buildUri(config);
            $debug('Start connection to MongoDB ');

            await connectToDatabase(uri, {
                serverSelectionTimeoutMS:
                    options.MONGODB_SERVER_SELECTION_TIMEOUT_MS || config.MONGODB_SERVER_SELECTION_TIMEOUT_MS,
            });
            $debug('Connected succesfully to mongodb database');
        } catch (error) {
            $debug(error);
            throw error;
        }
    },
    {
        name: 'mongoosePlugin',
    }
);

declare module 'fastify' {
    export interface FastifyInstance {
        mongoosePlugin: MongooseDecorator;
    }
}
