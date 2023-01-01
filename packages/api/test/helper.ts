import * as helper from 'fastify-cli/helper.js';
import { FastifyInstance } from 'fastify';
import mongoose, { Model } from 'mongoose';
import * as path from 'path';
import { AppConfig } from '../src/app.types';
import { FetchedTestEntity } from 'types';

async function buildWithDecoratorsExposedForTesting(config?: Partial<AppConfig>): Promise<FastifyInstance> {
    const pathToApp = path.join(__dirname, '..', 'src', 'app.ts');
    const argv = [pathToApp];

    return (await helper.build(argv, config)) as FastifyInstance;
}

async function buildWithAllOptionsOfFastifyCli(config?: Partial<AppConfig>): Promise<FastifyInstance> {
    const app = buildWithDecoratorsExposedForTesting(config);

    return app;
}

export async function getConnection() {
    return mongoose.connection;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchEntity<Entity, T extends Model<Entity>>(
    EntityModel: T,
    filter: any
): Promise<FetchedTestEntity<Entity>> {
    const count = await EntityModel.countDocuments();
    const instance = await EntityModel.findOne(filter);
    return {
        count,
        instance,
    };
}
export const build = buildWithAllOptionsOfFastifyCli;
