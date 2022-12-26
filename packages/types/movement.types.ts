import { Model, Types } from "mongoose";
import { IngredientDTO, IngredientViewType } from "./ingredient.types";

export type OperationOptions = 'add' | 'remove';

export interface IMovement {
  ingredient: Types.ObjectId;
  _id: Types.ObjectId;
  amount: number;
  operation: OperationOptions;
  createdAt?: Date;
}

export interface MovementDTO extends Omit<IMovement, '_id' | 'ingredient' > {
  _id?: string,
  ingredient: string | IngredientDTO,
};

export interface MovementViewType extends Omit<IMovement, '_id' | 'ingredient' > {
  _id?: string,
  ingredient: IngredientViewType,
};


export interface MovementModel extends Model<IMovement> {}