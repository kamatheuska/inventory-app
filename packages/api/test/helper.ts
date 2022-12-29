import * as helper from 'fastify-cli/helper.js';
import { FastifyInstance } from 'fastify';
import mongoose, { Model } from 'mongoose';
import * as path from 'path';
import { AppConfig } from '../src/app.types';
import { FetchedTestEntity } from 'types';

const AppPath = path.join(__dirname, '..', 'src', 'app.ts');

export async function build(config?: Partial<AppConfig>): Promise<FastifyInstance> {
    // you can set all the options supported by the fastify CLI command
    const argv = [AppPath];

    // fastify-plugin ensures that all decorators
    // are exposed for testing purposes, this is
    // different from the production setup
    const app = (await helper.build(argv, config)) as FastifyInstance;

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
