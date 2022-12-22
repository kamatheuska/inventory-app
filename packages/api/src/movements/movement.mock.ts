import mongoose, { Types } from 'mongoose';
import { MovementBodySchemaType } from './movement.plugin';
import { IMovement } from '@inventory-app/types';
import { faker } from '@faker-js/faker';

// (amount: number): IIngredient[] =>
//     [...Array(amount)].map(() => ({
export const getMockedMovements = (amount: number, ingredientsId: Types.ObjectId): IMovement[] =>
    [...Array(amount)].map(() => ({
        _id: new mongoose.Types.ObjectId(),
        ingredient: ingredientsId,
        amount: faker.datatype.number({ min: 1, max: 5000 }),
        operation: 'add',
    }));

export const getMockedMovementPayloads = (): MovementBodySchemaType[] => [
    {
        ingredient: new mongoose.Types.ObjectId().toString(),
        amount: 100,
        operation: 'add',
    },
    {
        ingredient: new mongoose.Types.ObjectId().toString(),
        amount: 150,
        operation: 'remove',
    },
    {
        ingredient: new mongoose.Types.ObjectId().toString(),
        amount: 1502,
        operation: 'remove',
    },
];
