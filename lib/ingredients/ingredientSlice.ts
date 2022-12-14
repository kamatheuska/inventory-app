import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIngredients } from "./ingredients.types";

export interface IngredientsState {
  list: IIngredients[],
}

const initialState: IngredientsState = {
  list: []
}

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredientsList(state, action: PayloadAction<IIngredients[]>) {
      state.list = action.payload;
    }
  }
})

export const { setIngredientsList } = ingredientSlice.actions;

export default ingredientSlice.reducer;