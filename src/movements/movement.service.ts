import Movement from "./movement.model";
import { default as parentDebug } from 'debug';
import { MovementType } from "./movement.plugin";

const debug = parentDebug('app:services:movement')

class MovementService {
  static async findAll() {
    return await Movement.find({});
  }

  static async add(movement: MovementType) {
    const instance = new Movement(movement)

    const saved = await instance.save();

    debug(saved);

    return saved;
  }
}

export default MovementService;