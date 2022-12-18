import mongoose from "mongoose";
import { MovementBodySchemaType } from "./movement.plugin";
import { IMovement } from "@inventory-app/types"

export const getMockedMovements = (): IMovement[] => ([
  {
    _id: new mongoose.Types.ObjectId(),
    ingredient: new mongoose.Types.ObjectId(),
    amount: 100,
    operation: 'add'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    ingredient: new mongoose.Types.ObjectId(),
    amount: 150,
    operation: 'remove'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    ingredient: new mongoose.Types.ObjectId(),
    amount: 1502,
    operation: 'remove'
  },
])

export const getMockedMovementPayloads = (): MovementBodySchemaType[] => ([
  {
    ingredient: new mongoose.Types.ObjectId().toString(),
    amount: 100,
    operation: 'add'
  },
  {
    ingredient: new mongoose.Types.ObjectId().toString(),
    amount: 150,
    operation: 'remove'
  },
  {
    ingredient: new mongoose.Types.ObjectId().toString(),
    amount: 1502,
    operation: 'remove'
  },
])