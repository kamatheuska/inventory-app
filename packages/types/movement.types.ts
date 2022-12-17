import { Types } from "mongoose";
import { IIngredient } from "./ingredient.types";

export type OperationOptions = 'add' | 'remove';

export interface IMovement {
  ingredient: Types.ObjectId;
  _id: Types.ObjectId;
  amount: number;
  operation: OperationOptions;
}

export interface MovementDTO {
  ingredient: Types.ObjectId | IIngredient;
  _id: Types.ObjectId;
  amount: number;
  operation: OperationOptions;
}