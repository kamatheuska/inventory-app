import { default as parentDebug } from 'debug';
import * as createError from 'http-errors'
import { Types } from 'mongoose';
import Movement from "./movement.model";
import { MovementType } from "./movement.plugin";

const debug = parentDebug('app:services:movement')

class MovementService {
  static async findAll() {
    try {
      const movements = await Movement.find({});

      debug(movements)

      return movements;
    } catch (error) {
      throw createError(400, error as createError.UnknownError)
    }
  }

  static async add(movement: MovementType) {
    try {
        
      const instance = new Movement({
        ...movement,
        _id: new Types.ObjectId()
      });

      const saved = await instance.save();
  
      debug(saved);
  
      return saved;
    } catch (error) {
      throw createError(400, error as createError.UnknownError)
    }
  }
}

export default MovementService;