import {
  Schema,
  model,
  Types
} from "mongoose";

import {
  IMovement,
  IngredientDTO,
  MovementDTO,
  MovementInstanceMethods,
  MovementModel,
  OperationOptions
} from "@inventory-app/types"

const operations: OperationOptions[] = [
  'add',
  'remove'
]

export const movementSchema = new Schema<IMovement, MovementModel, MovementInstanceMethods>({
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
  }
}, {
  autoIndex: false,
  timestamps: true,
});

movementSchema.methods.toDTO = function toDTO(): MovementDTO {
  const ingredient: string | IngredientDTO = this.ingredient instanceof Types.ObjectId
    ? (this.ingredient as Types.ObjectId).toString()
    : this.ingredient.toDTO();

  return {
    _id: this._id.toString(),
    ingredient,
    amount: this.amount,
    operation: this.operation,
    createdAt: this.createdAt,
  }
}
const Movement = model('Movement', movementSchema);

export default Movement;
export type IMovementSchema = typeof movementSchema;