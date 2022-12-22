import { Schema, model } from 'mongoose';

import { IStorageItem, StorageItemDTO, StorageItemModel } from '@inventory-app/types';

import { movementSchema } from '../movements/movement.model';

const storageItemSchema = new Schema<IStorageItem, StorageItemModel>(
    {
        _id: Schema.Types.ObjectId,
        ingredient: {
            type: Schema.Types.ObjectId,
            ref: 'Ingredients',
            required: true,
            unique: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        movements: [movementSchema],
    },
    {
        autoIndex: false,
    }
);

storageItemSchema.methods.toJSON = function (): StorageItemDTO {
    return {
        _id: this._id.toString(),
        ingredient: this.ingredient,
        amount: this.amount,
        movements: this.movements,
    };
};

const StorageItem = model('StorageItem', storageItemSchema);

export default StorageItem;
