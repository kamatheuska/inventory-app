import mongoose from "mongoose";
import { IMovement } from "./movement.types";

export const getMockedMovements = (): IMovement[] => ([
  {
    ingredientId: new mongoose.Types.ObjectId(),
    amount: 100,
    operation: 'add'
  },
  {
    ingredientId: new mongoose.Types.ObjectId(),
    amount: 150,
    operation: 'remove'
  },
  {
    ingredientId: new mongoose.Types.ObjectId(),
    amount: 1502,
    operation: 'remove'
  },
])