import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { IMovement } from "./movements.types";

export interface MovementsState {
  list: IMovement[],
  isLoading: boolean,
}

const initialState: MovementsState = {
  list: [],
  isLoading: false,
}

export const ingredientSlice = createSlice({
  name: 'movements',
  initialState,
  reducers: {
    setList(state, action: PayloadAction<IMovement[]>) {
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
export const getAll = (state: AppState) => state.movements.list
export const getIsLoading = (state: AppState) => state.movements.isLoading

export const { setList } = ingredientSlice.actions;

export default ingredientSlice.reducer;