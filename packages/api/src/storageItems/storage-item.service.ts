import { default as parentDebug } from 'debug';
import createHttpError = require('http-errors');
import mongoose, { Types } from "mongoose";
import { MovementPayloadType } from "../movements/movement.plugin";
import { IMovement, OperationOptions } from "../movements/movement.types";
import StorageItem from "./storage-item.model";
import { StorageItemDocument } from "./storage-item.types";

const debug = parentDebug('app:services:storage-items')

class StorageItemService {
  static async findAllMovements() {
    const docs = await StorageItem.find({}).populate('ingredient').exec();

    const movements: IMovement[] = docs.reduce((acc, storageItem) => {
      const item = storageItem.toJSON();
      return [
        ...acc,
        ...item.movements.map(movement => ({
          ...movement,
          ingredient: item.ingredient,
        }))
      ]
    }, [] as IMovement[]);

    debug(movements);

    return movements;
  }

  static async addMovement({ ingredientId, amount, operation }: MovementPayloadType) {
    try {
      const doc = await StorageItem.findOne({
        ingredient: ingredientId
      })

      const movement: IMovement = {
        _id: new Types.ObjectId(),
        ingredient: new mongoose.Types.ObjectId(),
        amount,
        operation: operation as OperationOptions,
      }

      const storageItem = doc
        ? StorageItemService.updateFromMovement(doc, movement)
        : StorageItemService.createFromMovement(ingredientId, movement);

      storageItem.movements.push(movement)

      await storageItem.save();
    } catch (error) {
      createHttpError(500, error as unknown as createHttpError.UnknownError);
    }
  }

  private static updateFromMovement(doc: StorageItemDocument, movement: IMovement) {
    if (movement.operation === 'add') {
      doc.amount =+ movement.amount;
    } else {
      doc.amount =- movement.amount;
    }

    return doc;
  }

  private static createFromMovement(ingredientId: string, movement: IMovement) {
    return new StorageItem({
      _id: new Types.ObjectId(),
      amount: movement.amount,
      ingredient: new mongoose.Types.ObjectId(ingredientId),
    })
  }
}

export default StorageItemService;