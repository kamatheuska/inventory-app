import { MovementDTO } from "@inventory-app/types";

const mapper = (data: any): MovementDTO => ({
  _id: data._id,
  amount: data.amount,
  ingredient: data.ingredient,
  operation: data.operation,
})

export default mapper;
