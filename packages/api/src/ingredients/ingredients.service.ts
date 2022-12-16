import { default as parentDebug } from 'debug';
import * as createError from 'http-errors'
import Ingredients from './ingredients.model';

const debug = parentDebug('app:services:ingredients')

class IngredientsService {
  static async findAll() {
    try {
      const ingredients = await Ingredients.find({});

      debug(ingredients)

      return ingredients;
    } catch (error) {
      throw createError(400, error as createError.UnknownError)
    }
  }
}

export default IngredientsService;