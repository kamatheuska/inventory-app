import { Document, Types } from "mongoose";

export interface IStorageItem {
  _id: Types.ObjectId,
  ingredientId: Types.ObjectId;
  amount: number;
}

export type StorageItemDocument = Document<unknown, any, IStorageItem> & IStorageItem & {
  _id: Types.ObjectId;
}