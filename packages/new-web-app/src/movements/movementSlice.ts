import { MovementViewType } from '@inventory-app/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../lib/store';

export interface MovementsState {
    list: MovementViewType[];
    isLoading: boolean;
}

const initialState: MovementsState = {
    list: [],
    isLoading: false,
};

export const ingredientSlice = createSlice({
    name: 'movements',
    initialState,
    reducers: {
        setList(state, action: PayloadAction<MovementViewType[]>) {
            state.list = action.payload;
        },
        startRequest(state) {
            state.isLoading = true;
        },
        finishRequest(state) {
            state.isLoading = false;
        },
    },
});

// actions
export const { setList } = ingredientSlice.actions;

// selectors
export const getAll = (state: RootState) => state.movements.list;
export const getIsLoading = (state: RootState) => state.movements.isLoading;

export default ingredientSlice.reducer;
