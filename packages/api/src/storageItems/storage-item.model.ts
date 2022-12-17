import { Schema, model } from "mongoose";
import { movementSchema } from "../movements/movement.model";
import { IStorageItem } from "./storage-item.types";

const storageItemSchema = new Schema<IStorageItem>({
  _id: Schema.Types.ObjectId,
  ingredient: {
    type: Schema.Types.ObjectId,
    ref: 'Ingredients',
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  movements: [movementSchema]
});

const StorageItem = model('StorageItem', storageItemSchema);

export default StorageItem;
