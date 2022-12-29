import { HydratedDocument } from 'mongoose';

export interface FetchedTestEntity<Entity> {
    count: number;
    instance: HydratedDocument<Entity> | null;
}
