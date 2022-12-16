
import mongoose, { Types } from "mongoose";
import { MovementType } from "../movements/movement.plugin";
import StorageItem from "./storage-item.model";
import { StorageItemDocument } from "./storage-item.types";


class StorageItemService {
  static async handleMovement(movement: MovementType) {
    const storageItemDoc = await StorageItem.findOne({
      ingredientId: movement.ingredientId
    })

    if (storageItemDoc) {
      await StorageItemService.updateAndSave(storageItemDoc, movement)
    } else {
      await StorageItemService.createFromMovement(movement)
    }
  }

  static async updateAndSave(doc: StorageItemDocument, movement: MovementType) {
    doc.amount = movement.amount;
    return doc.save();
  }

  static async createFromMovement(movement: MovementType) {
    const item = new StorageItem({
      _id: new Types.ObjectId(),
       amount: movement.amount,
       ingredientId: new mongoose.Types.ObjectId(movement.ingredientId),
    })

    return item.save()
  }
}

export default StorageItemService;