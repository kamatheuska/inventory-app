export interface IIngredients {
  name: string,
  measureUnit: MeasureUnitOptions,
  category: string,
  description?: string,
  inventory?: InventoryDetails,
  tags?: Tags
}

interface Tags {
  label: string;
}
export interface InventoryDetails {
  minAmount?: number,
  note?: string,
  shopAt?: string,
}

export type MeasureUnitOptions = 'kg' | 'gr' | 'u' | 'lt';
export type IngredientCategoryOptions = 'fruits' | 'vegetables';