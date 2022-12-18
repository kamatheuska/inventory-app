import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { StorageItemDTO } from "@inventory-app/types"

export interface StorageItemState {
  list: StorageItemDTO[],
  isLoading: boolean,
}

const initialState: StorageItemState = {
  list: [],
  isLoading: false,
}

export const storageItemSlice = createSlice({
  name: 'storageItems',
  initialState,
  reducers: {
    setList(state, action: PayloadAction<StorageItemDTO[]>) {
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
export const getAll = (state: AppState) => state.storageItems.list
export const getIsLoading = (state: AppState) => state.storageItems.isLoading

export const { setList, startRequest, finishRequest } = storageItemSlice.actions;

export default storageItemSlice.reducer;