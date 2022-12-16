import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovement } from "./movements.types";

export interface MovementsState {
  list: IMovement[],
}

const initialState: MovementsState = {
  list: []
}

export const ingredientSlice = createSlice({
  name: 'movements',
  initialState,
  reducers: {
    setMovementsList(state, action: PayloadAction<IMovement[]>) {
      state.list = action.payload;
    }
  }
})

export const { setMovementsList } = ingredientSlice.actions;

export default ingredientSlice.reducer;