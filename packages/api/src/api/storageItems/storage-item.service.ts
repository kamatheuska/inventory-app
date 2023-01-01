import { default as parentDebug } from 'debug';
import * as createHttpError from 'http-errors';
import mongoose, { Types } from 'mongoose';
import { IMovement, OperationOptions, StorageItemDocument } from '@inventory-app/types';

import StorageItem from './storage-item.model';
import { MovementBodySchemaType, Querystring } from '../movements/movement.plugin';
import { getMovementsAggrStages, sortOrder } from './storage-item.aggregations';

const debug = parentDebug('app:services:storage-items');

class StorageItemService {
    static async findAll(): Promise<any> {
        const docs = await StorageItem.find({}).populate('ingredient').exec();

        return docs;
    }

    static async findById(id: string): Promise<any> {
        const doc = await StorageItem.findById(id).populate('ingredient').exec();

        return doc;
    }

    static async findAllMovements({ limit, currentPage }: Querystring): Promise<any> {
        const stages = getMovementsAggrStages({
            limit,
            skip: currentPage * limit,
            sort: sortOrder.DESCENDING,
        });

        const aggregate = await StorageItem.aggregate(stages);
        const [aggResult] = aggregate;
        const result = aggResult ? aggResult.result : aggregate;
        debug(result);

        return result;
    }

    static async addMovement({ ingredient, amount, operation }: MovementBodySchemaType) {
        try {
            const doc = await StorageItem.findOne({
                ingredient,
            });

            const movement: IMovement = {
                _id: new Types.ObjectId(),
                ingredient: new mongoose.Types.ObjectId(),
                amount,
                operation: operation as OperationOptions,
            };

            const storageItem = doc
                ? StorageItemService.updateFromMovement(doc, movement)
                : StorageItemService.createFromMovement(ingredient, movement);

            storageItem.movements.push(movement);

            return await storageItem.save();
        } catch (error) {
            createHttpError(500, error as unknown as createHttpError.UnknownError);
        }
    }

    private static updateFromMovement(doc: StorageItemDocument, movement: IMovement) {
        if (movement.operation === 'add') {
            doc.amount += movement.amount;
        } else {
            doc.amount -= movement.amount;
        }

        return doc;
    }

    private static createFromMovement(ingredient: string, movement: IMovement) {
        return new StorageItem({
            _id: new Types.ObjectId(),
            amount: movement.amount,
            ingredient: new mongoose.Types.ObjectId(ingredient),
        });
    }
}

export default StorageItemService;
