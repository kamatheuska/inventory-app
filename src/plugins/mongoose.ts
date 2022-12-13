import mongoose from 'mongoose';
import fp from 'fastify-plugin';
import { MongooseDecorator } from '../app.types';
import { FastifyBaseLogger, FastifyInstance } from 'fastify';
// import { FastifyInstance } from 'fastify';

export async function connectToDatabase(uri: string, logger: FastifyBaseLogger) {
  logger.info('Start connection to MongoDB');

  mongoose.set('strictQuery', true);
  const instance = await mongoose.connect(uri);

  logger.info('Connected succesfully to mongodb database');

  return instance.connection;
}

export default fp(async function mongooseConnector(fastify) {
  const {
    log: parentLog,
    config,
  } = fastify;
  const log = parentLog.child({ module: 'mongooseConnector' });


  function closeConnection(instance: FastifyInstance, done: () => void) {
    instance.mongoose.instance.connection.on('close', () => {
      done();
    });
    instance.mongoose.instance.connection.close();
  }

  const mongooseDecorator =  {
    instance: mongoose,
  }

  fastify.addHook('onClose', closeConnection);
  fastify.decorate('mongoose', mongooseDecorator);

  await connectToDatabase(config.MONGODB_URI, log);
}, {
  name: 'mongooseConnector',
});

declare module 'fastify' {
  export interface FastifyInstance {
    mongoose: MongooseDecorator
  }
}
