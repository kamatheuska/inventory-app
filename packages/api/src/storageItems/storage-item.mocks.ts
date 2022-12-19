import { Types } from 'mongoose';
import { IMovement, IStorageItem } from '@inventory-app/types';

export const getMockedStorageItems = (movements: IMovement[]): IStorageItem[] => [
    {
        _id: new Types.ObjectId(),
        amount: 200,
        ingredient: new Types.ObjectId(),
        movements: movements,
    },
    {
        _id: new Types.ObjectId(),
        amount: 400,
        ingredient: new Types.ObjectId(),
        movements: movements,
    },
    {
        _id: new Types.ObjectId(),
        amount: 2200,
        ingredient: new Types.ObjectId(),
        movements: movements,
    },
];
