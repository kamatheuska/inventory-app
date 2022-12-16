import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { IIngredient } from "./ingredients.types";

export interface IngredientsState {
  list: IIngredient[],
  isLoading: boolean,
}

const initialState: IngredientsState = {
  list: [],
  isLoading: false,
}

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setList(state, action: PayloadAction<IIngredient[]>) {
      state.list = action.payload;
    },
    startRequest(state) {
      state.isLoading = true;
    },
    finishRequest(state) {
      state.isLoading = false;
    }
  }
})

// Selectors
export const getAll = (state: AppState) => state.ingredients.list
export const getIsLoading = (state: AppState) => state.ingredients.isLoading

export const { setList, startRequest, finishRequest } = ingredientSlice.actions;

export default ingredientSlice.reducer;