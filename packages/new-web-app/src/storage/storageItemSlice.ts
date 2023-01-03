import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../lib/store';
import { StorageItemView } from '@inventory-app/types';

export interface StorageItemState {
    list: StorageItemView[];
    current: StorageItemView | null;
    isLoading: boolean;
}

const initialState: StorageItemState = {
    list: [],
    current: null,
    isLoading: false,
};

export const storageItemSlice = createSlice({
    name: 'storageItems',
    initialState,
    reducers: {
        setList(state, action: PayloadAction<StorageItemView[]>) {
            state.list = action.payload;
        },
        setCurrent(state, action: PayloadAction<StorageItemView>) {
            state.current = action.payload;
        },
        startRequest(state) {
            state.isLoading = true;
        },
        finishRequest(state) {
            state.isLoading = false;
        },
    },
});

// Selectors
export const getAll = (state: RootState) => state.storageItems.list;
export const getCurrent = (state: RootState) => state.storageItems.current;
export const getIsLoading = (state: RootState) => state.storageItems.isLoading;

export const { setList, startRequest, finishRequest, setCurrent } = storageItemSlice.actions;

export default storageItemSlice.reducer;
