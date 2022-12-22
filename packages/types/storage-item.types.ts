import { Document, Model, Types } from "mongoose";
import { IMovement, IngredientDTO }from "../types"

export interface IStorageItem {
  _id: Types.ObjectId,
  ingredient: Types.ObjectId;
  amount: number;
  movements: IMovement[];
}

export type StorageItemDocument = Document<unknown, any, IStorageItem> & IStorageItem & {
  _id: Types.ObjectId;
}

export interface StorageItemDTO  {
  amount: number;
  movements: IMovement[];
  _id: string,
  ingredient: string | IngredientDTO,
};


export interface StorageItemModel extends Model<IStorageItem> {}