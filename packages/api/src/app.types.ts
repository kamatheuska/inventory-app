import { AutoloadPluginOptions } from '@fastify/autoload';
import { PinoLoggerOptions } from 'fastify/types/logger';
import { Mongoose } from 'mongoose';

export type LoggerOptions = PinoLoggerOptions | boolean;

export type AppOptions = {
    logger: LoggerOptions;
    pluginTimeout: number;
} & Partial<AutoloadPluginOptions>;

export interface AppConfig {
    DISABLE_SIGNUP: boolean;
    JWT_SECRET: string;
    MONGODB_URI: string;
    MONGODB_PROTOCOL: string;
    MONGODB_USER: string;
    MONGODB_PASSWORD: string;
    MONGODB_HOST: string;
    MONGODB_PORT: number;
    MONGODB_COLLECTION: string;
    MONGODB_AUTH_SOURCE: string;
    MONGODB_SERVER_SELECTION_TIMEOUT_MS: number;
    NODE_ENV: string;
    PORT: string;
}

export interface MongooseDecorator {
    instance: Mongoose;
}
