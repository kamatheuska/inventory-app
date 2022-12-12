import { join } from 'path';
import { FastifyPluginAsync } from 'fastify';

import AutoLoad from '@fastify/autoload';

import { AppOptions, LoggerOptions } from './app.types';

// Pass --options via CLI arguments in command to enable these options.
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

const app: FastifyPluginAsync<AppOptions> = async (fastify, opts) => {
  await fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts
  })
};

export default app;
export { app, options }
