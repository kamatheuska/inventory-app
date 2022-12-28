import { Types } from 'mongoose';

import { faker } from '@faker-js/faker';

import { IIngredient, IStorageItem } from '@inventory-app/types';
import { getMockedMovements } from '../movements/movement.mock';
import { getRandomItem } from '../../lib/utils/random';

export const getMockedStorageItems = (amount: number, ingredients: IIngredient[]): IStorageItem[] => {
    return [...Array(amount)].map(() => {
        const amountOfMovements = faker.datatype.number({ min: 1, max: 4 });
        const ingredientId = getRandomItem(ingredients)._id;

        return {
            _id: new Types.ObjectId(),
            amount: faker.datatype.number({ min: 100, max: 5000 }),
            ingredient: ingredientId,
            movements: getMockedMovements(amountOfMovements, ingredientId),
        };
    });
};
