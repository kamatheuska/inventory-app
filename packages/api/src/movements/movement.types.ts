import { Types } from "mongoose";

export type OperationOptions = 'add' | 'remove';

export interface IMovement {
  _id: Types.ObjectId;
  ingredientId: Types.ObjectId;
  amount: number;
  operation: OperationOptions;
}
