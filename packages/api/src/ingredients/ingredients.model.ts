import { Schema, model } from 'mongoose';
import {
    IIngredient,
    IngredientCategoryOptions,
    IngredientDTO,
    IngredientInstanceMethods,
    IngredientModel,
    MeasureUnitOptions,
} from '@inventory-app/types';

const measureUnits: MeasureUnitOptions[] = ['gr', 'kg', 'lt', 'u'];

const categories: IngredientCategoryOptions[] = ['fruits', 'vegetables'];

const ingredientsSchema = new Schema<IIngredient, IngredientModel, IngredientInstanceMethods>(
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
            enum: categories,
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
            enum: measureUnits,
            required: true,
            default: 'gr' as MeasureUnitOptions,
        },
    },
    {
        autoIndex: false,
    }
);

ingredientsSchema.methods.toDTO = function (): IngredientDTO {
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
