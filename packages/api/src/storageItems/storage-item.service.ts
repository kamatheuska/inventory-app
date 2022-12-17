import { default as parentDebug } from 'debug';
import * as createHttpError from 'http-errors';
import mongoose, { Types } from "mongoose";
import {
  IMovement,
  MovementDTO,
  OperationOptions,
  StorageItemDocument
} from "@inventory-app/types"

import StorageItem from "./storage-item.model";
import { MovementPayloadType } from '../movements/movement.plugin';

const debug = parentDebug('app:services:storage-items')

class StorageItemService {
  static async findAllMovements(): Promise<MovementDTO[]> {
    const docs = await StorageItem.find({}).populate('ingredient').exec();

    const movements: MovementDTO[] = docs.reduce((acc, storageItem) => {
      const item = storageItem.toDTO()

      return [
        ...acc,
        ...storageItem.movements.map(movement => {
          const dto = (movement as any).toDTO() as MovementDTO;

          return {
            ...dto,
            ingredient: item.ingredient,
          }
        })
      ]
    }, [] as MovementDTO[]);

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

      return await storageItem.save();
    } catch (error) {
      createHttpError(500, error as unknown as createHttpError.UnknownError);
    }
  }

  private static updateFromMovement(doc: StorageItemDocument, movement: IMovement) {
    if (movement.operation === 'add') {
      doc.amount += movement.amount;
    } else {
      doc.amount -= movement.amount;
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