import mongoose from "mongoose";
import { IMovement } from "./movement.types";

export const getMockedMovements = (): IMovement[] => ([
  {
    _id: new mongoose.Types.ObjectId(),
    ingredientId: new mongoose.Types.ObjectId(),
    amount: 100,
    operation: 'add'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    ingredientId: new mongoose.Types.ObjectId(),
    amount: 150,
    operation: 'remove'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    ingredientId: new mongoose.Types.ObjectId(),
    amount: 1502,
    operation: 'remove'
  },
])