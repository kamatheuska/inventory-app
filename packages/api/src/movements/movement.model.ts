import { Schema, model } from "mongoose";
import { IMovement, MovementDTO, OperationOptions } from "@inventory-app/types"

const operations: OperationOptions[] = [
  'add',
  'remove'
]

export const movementSchema = new Schema<IMovement>({
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
  timestamps: true,
  methods: {
    toJSON(): MovementDTO {
      return {
        _id: this._id,
        ingredient: this.ingredient,
        amount: this.amount,
        operation: this.operation,

      }
    }
  }
});

const Movement = model('Movement', movementSchema);

export default Movement;
