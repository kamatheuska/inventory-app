import { Types } from 'mongoose';
import { IIngredient } from '@inventory-app/types';
import { faker } from '@faker-js/faker';
import { getRandomProperty } from '../../lib/utils/random';
import { ingredientCategories, measureUnits } from './ingredients.constants';

export const getMockedIngredients = (amount: number): IIngredient[] =>
    [...Array(amount)].map(() => ({
        _id: new Types.ObjectId(),
        category: getRandomProperty(ingredientCategories),
        measureUnit: measureUnits.GRAM,
        name: faker.lorem.word(),
    }));
