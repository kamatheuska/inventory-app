import { StorageItemView } from '@inventory-app/types';

const mapper = (data: any): StorageItemView => ({
    _id: data._id,
    amount: data.amount,
    ingredient: data.ingredient,
    movements: data.movements,
});

export default mapper;
