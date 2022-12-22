import { Schema, model } from 'mongoose';

import { IMovement, MovementDTO, MovementModel, OperationOptions } from '@inventory-app/types';

const operations: OperationOptions[] = ['add', 'remove'];

export const movementSchema = new Schema<IMovement, MovementModel>(
    {
        _id: Schema.Types.ObjectId,
        ingredient: {
            type: Schema.Types.ObjectId,
            ref: 'Ingredients',
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        operation: {
            type: String,
            enum: operations,
            required: true,
        },
    },
    {
        autoIndex: false,
        timestamps: true,
    }
);

movementSchema.methods.toJSON = function toJSON(): MovementDTO {
    return {
        _id: this._id.toString(),
        ingredient: this.ingredient,
        amount: this.amount,
        operation: this.operation,
        createdAt: this.createdAt,
    };
};
const Movement = model('Movement', movementSchema);

export default Movement;
export type IMovementSchema = typeof movementSchema;
