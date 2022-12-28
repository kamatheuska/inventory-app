import { default as parentDebug } from 'debug';
import * as createError from 'http-errors';
import Ingredient from './ingredients.model';

const debug = parentDebug('app:services:ingredients');

class IngredientsService {
    static async findAll() {
        try {
            const ingredients = await Ingredient.find({});

            debug(ingredients);

            return ingredients;
        } catch (err) {
            const error = err as createError.UnknownError;
            throw createError(400, error);
        }
    }
}

export default IngredientsService;
