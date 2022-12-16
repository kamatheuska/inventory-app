import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { getAllIngredients } from "./ingredients.rest";
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


export const { setList, startRequest, finishRequest } = ingredientSlice.actions;

export default ingredientSlice.reducer;