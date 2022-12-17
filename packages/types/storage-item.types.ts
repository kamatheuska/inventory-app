import { Document, Types } from "mongoose";
import { IMovement }from "@inventory-app/types"

export interface IStorageItem {
  _id: Types.ObjectId,
  ingredient: Types.ObjectId;
  amount: number;
  movements: IMovement[];
}

export type StorageItemDocument = Document<unknown, any, IStorageItem> & IStorageItem & {
  _id: Types.ObjectId;
}