import { join } from 'path';
import { FastifyPluginAsync } from 'fastify';

import AutoLoad from '@fastify/autoload';

import { AppOptions, LoggerOptions } from './app.types';
import movementPlugin from './movements/movement.plugin';
import ingredientsPlugin from './ingredients/ingredients.plugin';


const app: FastifyPluginAsync<AppOptions> = async function app(fastify, opts) {
  await fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts
  })

  await fastify.register(movementPlugin);
  await fastify.register(ingredientsPlugin);
};

function getOptions (): AppOptions {
  let loggerOptions: LoggerOptions = true;
  
  if (process.env.NODE_ENV === 'development') {
    loggerOptions = {
      transport: {
        target: 'pino-pretty',
      },
    }
  } else if (process.env.NODE_ENV === 'test') {
    loggerOptions = false;
  }

  return {
    logger: loggerOptions,
    pluginTimeout: 0,
  }
}

const options = getOptions();
export default app;

export { app, options }
