import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIngredient } from "./ingredients.types";

export interface IngredientsState {
  list: IIngredient[],
}

const initialState: IngredientsState = {
  list: []
}

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredientsList(state, action: PayloadAction<IIngredient[]>) {
      state.list = action.payload;
    }
  }
})

export const { setIngredientsList } = ingredientSlice.actions;

export default ingredientSlice.reducer;