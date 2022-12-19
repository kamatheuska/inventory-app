import { Schema, model, Types } from 'mongoose';

import {
    IngredientDTO,
    IStorageItem,
    StorageItemDTO,
    StorageItemModel,
    StorateItemInstanceMethods,
} from '@inventory-app/types';

import { movementSchema } from '../movements/movement.model';

const storageItemSchema = new Schema<IStorageItem, StorageItemModel, StorateItemInstanceMethods>(
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

storageItemSchema.methods.toDTO = function (): StorageItemDTO {
    const ingredient: string | IngredientDTO =
        this.ingredient instanceof Types.ObjectId
            ? (this.ingredient as Types.ObjectId).toString()
            : this.ingredient?.toDTO();

    return {
        _id: this._id.toString(),
        ingredient: ingredient,
        amount: this.amount,
        movements: this.movements,
    };
};

const StorageItem = model('StorageItem', storageItemSchema);

export default StorageItem;
