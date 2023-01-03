import { Document, Model, Types } from "mongoose";
import { IMovement, IngredientDTO, IngredientViewType, MovementDTO, MovementViewType }from "../types"

export interface IStorageItem {
  _id: Types.ObjectId,
  amount: number;
  ingredient: Types.ObjectId;
  movements: IMovement[];
}

export type StorageItemDocument = Document<unknown, any, IStorageItem> & IStorageItem & {
  _id: Types.ObjectId;
}

export interface StorageItemDTO {
  _id: string,
  amount: number;
  ingredient: string | IngredientDTO,
  movements: MovementDTO[];
};

export interface StorageItemView {
    _id: string,
    amount: number;
    ingredient: IngredientViewType,
    movements: MovementViewType[];
};



export interface StorageItemModel extends Model<IStorageItem> {}