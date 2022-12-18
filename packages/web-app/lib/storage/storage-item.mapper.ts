import { StorageItemDTO } from "@inventory-app/types";

const mapper = (data: any): StorageItemDTO => ({
  _id: data._id,
  amount: data.amount,
  ingredient: data.ingredient,
  movements: data.movements,
})

export default mapper;
