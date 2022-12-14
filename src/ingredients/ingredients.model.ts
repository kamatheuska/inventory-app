import { Schema, model } from "mongoose";
import { IIngredients, IngredientCategoryOptions, MeasureUnitOptions } from "./ingredients.types";

const measureUnits: MeasureUnitOptions[] = [
  'gr',
  'kg',
  'lt',
  'u'
]

const categories: IngredientCategoryOptions[] = [
  'fruits',
  'vegetables'
]

const ingredientsSchema = new Schema<IIngredients>({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  category: {
    type: String,
    enum: categories,
    required: true
  },
  inventory: {
    note: String,
    minAmount: Number,
    shopAt: String,
  },
  tags: [
    {
      label: String
    }
  ],
  measureUnit: {
    type: String,
    enum: measureUnits,
    required: true,
    default: 'gr' as MeasureUnitOptions,
  }
});

const Ingredients = model('Ingredients', ingredientsSchema);

export default Ingredients;
