import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from '../../ingredients/ingredientSlice';
import movementReducer from '../../movements/movementSlice';
import storageItemReducer from '../../storage/storageItemSlice';

export const store = configureStore({
    reducer: {
        ingredients: ingredientsReducer,
        movements: movementReducer,
        storageItems: storageItemReducer,
    },
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
