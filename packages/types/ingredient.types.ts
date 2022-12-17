import { Model, Types } from "mongoose";

export interface IIngredient {
  _id: Types.ObjectId;
  name: string,
  measureUnit: MeasureUnitOptions,
  category: string,
  description?: string,
  inventory?: InventoryDetails,
  tags?: Tags,
}

interface Tags {
  label: string;
}
export interface InventoryDetails {
  minAmount?: number,
  note?: string,
  shopAt?: string,
}

export type MeasureUnitOptions = 'kg' | 'gr' | 'u' | 'lt';
export type IngredientCategoryOptions = 'fruits' | 'vegetables';

export interface IngredientDTO extends Omit<IIngredient, '_id'> {
  _id: string,
};


export interface IngredientInstanceMethods {
  toDTO: () => IngredientDTO
}

export interface IngredientModel extends Model<IIngredient, {}, IngredientInstanceMethods> {}