import { Schema, model } from "mongoose";
import { IMovement, OperationOptions } from "./movement.types";

const operations: OperationOptions[] = [
  'add',
  'remove'
]

const movementSchema = new Schema<IMovement>({
  ingredientId: {
    type: Schema.Types.ObjectId,
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
});

const Movement = model('Movement', movementSchema);

export default Movement;
