import { Schema, model } from 'mongoose';
import { IIngredient, IngredientDTO, IngredientModel } from '@inventory-app/types';
import { ingredientCategories, measureUnits } from './ingredients.constants';

const ingredientsSchema = new Schema<IIngredient, IngredientModel>(
    {
        _id: Schema.Types.ObjectId,
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: String,
        category: {
            type: String,
            enum: Object.values(ingredientCategories),
            required: true,
        },
        inventory: {
            note: String,
            minAmount: Number,
            shopAt: String,
        },
        tags: [
            {
                label: String,
            },
        ],
        measureUnit: {
            type: String,
            enum: Object.values(measureUnits),
            required: true,
            default: measureUnits.GRAM,
        },
    },
    {
        autoIndex: false,
    }
);

ingredientsSchema.methods.toJSON = function (): IngredientDTO {
    return {
        _id: this._id.toString(),
        category: this.category,
        measureUnit: this.measureUnit,
        name: this.name,
        inventory: this.inventory,
        tags: this.tags,
        description: this.description,
    };
};

const Ingredients = model('Ingredients', ingredientsSchema);

export default Ingredients;
