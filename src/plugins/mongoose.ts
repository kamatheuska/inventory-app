import mongoose from 'mongoose';
import fp from 'fastify-plugin';
import { MongooseDecorator } from '../app.types';
// import { FastifyInstance } from 'fastify';


export default fp(async function mongooseConnector(fastify) {
  const {
    log: parentLog,
    config,
  } = fastify;

  const log = parentLog.child({ module: 'mongooseConnector' });

  async function connectToDatabase() {
    const uri = config.MONGODB_URI;
    log.info('Start connection to MongoDB');

    mongoose.set('strictQuery', true);
    await mongoose.connect(uri);
    log.info(`Connected succesfully to ${uri}`);
    
  }

  // function closeConnection(instance: FastifyInstance, done: () => void) {
  //   instance.mongoose.instance.connection.on('close', () => {
  //     done();
  //   });
  //   instance.mongoose.instance.connection.close();
  // }

  // const models = {};
  // const mongooseDecorator =  {
  //   instance: mongoose,
  //   models,
  // }

  // fastify.addHook('onClose', closeConnection);
  // fastify.decorate('mongoose', mongooseDecorator);

  await connectToDatabase();
}, {
  name: 'mongooseConnector',
});

declare module 'fastify' {
  export interface FastifyInstance {
    mongoose: MongooseDecorator
  }
}
