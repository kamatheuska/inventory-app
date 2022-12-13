import { Schema, model } from "mongoose";
import { IStorageItem } from "./storage-item.types";

const storageItemSchema = new Schema<IStorageItem>({
  ingredientId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  }
});

const StorageItem = model('StorageItem', storageItemSchema);

export default StorageItem;
