import mongoose from 'mongoose';
import fp from 'fastify-plugin';
import { MongooseDecorator } from '../../app.types';
import { FastifyInstance } from 'fastify';
import { connectToDatabase } from '../../lib/db/connect';

export default fp(
    async function mongooseConnector(fastify) {
        const { log: parentLog, config } = fastify;
        const log = parentLog.child({ module: 'mongooseConnector' });

        function closeConnection(instance: FastifyInstance, done: () => void) {
            instance.mongoose.instance.connection.on('close', () => {
                done();
            });
            instance.mongoose.instance.connection.close();
        }

        const mongooseDecorator = {
            instance: mongoose,
        };

        fastify.addHook('onClose', closeConnection);
        fastify.decorate('mongoose', mongooseDecorator);

        log.info('Start connection to MongoDB');
        await connectToDatabase(config.MONGODB_URI);
        log.info('Connected succesfully to mongodb database');
    },
    {
        name: 'mongooseConnector',
    }
);

declare module 'fastify' {
    export interface FastifyInstance {
        mongoose: MongooseDecorator;
    }
}
