import { StorageItemViewType } from "@inventory-app/types";

const mapper = (data: any): StorageItemViewType => ({
  _id: data._id,
  amount: data.amount,
  ingredient: data.ingredient,
  movements: data.movements,
})

export default mapper;
