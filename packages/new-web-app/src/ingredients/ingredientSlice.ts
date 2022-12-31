import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../lib/store';
import { IngredientViewType } from '@inventory-app/types';

export interface IngredientsState {
    list: IngredientViewType[];
    isLoading: boolean;
}

const initialState: IngredientsState = {
    list: [],
    isLoading: false,
};

export const ingredientSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        setList(state, action: PayloadAction<IngredientViewType[]>) {
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

// Selectors
export const getAll = (state: RootState) => state.ingredients.list;
export const getIsLoading = (state: RootState) => state.ingredients.isLoading;

export const { setList, startRequest, finishRequest } = ingredientSlice.actions;

export default ingredientSlice.reducer;
