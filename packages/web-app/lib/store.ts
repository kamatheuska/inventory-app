import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import ingredientsReducer from "./ingredients/ingredientSlice";
import movementReducer from "./movements/movementSlice";
import storageItemReducer from "./storage/storageItemSlice";

const makeStore = () => configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    movements: movementReducer,
    storageItems: storageItemReducer
  },
  devTools: true,
})

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false });