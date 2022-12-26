import { Model, Types } from "mongoose";

export type IngredientCategories = 'fruits' | 'vegetables';
export type MeasureUnits = 'gr' | 'kg' | 'lt' | 'u';


export interface IIngredient {
  _id: Types.ObjectId;
  name: string,
  measureUnit: MeasureUnits,
  category: IngredientCategories,
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

export interface IngredientDTO extends Omit<IIngredient, '_id'> {
  _id: string,
};

export type IngredientViewType = IngredientDTO;

export interface IngredientModel extends Model<IIngredient> {}