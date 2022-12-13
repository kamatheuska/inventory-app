import { Types } from "mongoose";

export type OperationOptions = 'add' | 'remove';

export interface IMovement {
  ingredientId: Types.ObjectId;
  amount: number;
  operation: OperationOptions;
}
