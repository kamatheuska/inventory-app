import { test } from 'tap';
import { IStorageItem, StorageItemModel } from '@inventory-app/types';

import { getMockedMovementPayloads } from '../../src/api/movements/movement.mock';
import { build, fetchEntity } from '../helper';
import StorageItem from '../../src/api/storageItems/storage-item.model';
import { getMockedStorageItems } from '../../src/api/storageItems/storage-item.mocks';
import { MovementBodySchemaType } from '../../src/api/movements/movement.plugin';
import { getMockedIngredients } from '../../src/api/ingredients/ingredients.mock';
import Ingredient from '../../src/api/ingredients/ingredients.model';

async function cleanDb() {
    await Ingredient.deleteMany({});
    await StorageItem.deleteMany({});
}

test('Movements: POST /api/movements/new', { skip: false }, async (t) => {
    const app = await build();
    const payloads = getMockedMovementPayloads();

    t.teardown(async () => {
        await cleanDb();
        await app.close();
    });

    try {
        const res = await app.inject({
            url: '/api/movements/new',
            method: 'POST',
            payload: payloads[0],
            headers: {
                ['content-type']: 'application/json',
            },
        });

        const itemEntity = await fetchEntity<IStorageItem, StorageItemModel>(StorageItem, {
            ingredient: payloads[0].ingredient,
        });
        const item = itemEntity.instance;
        const itemCount = itemEntity.count;

        t.type(item, 'object', 'should return an storage item document');
        t.equal(item?.amount, payloads[0].amount, 'should have the same amount as in the passed movement');
        t.equal(itemCount, 1, 'should have only one document on the StorageItem collection');
        t.equal(res.statusCode, 200, 'returns a statusCode of 200');
    } catch (error) {
        t.error(error);
    } finally {
        t.end();
    }
});

test('Movements: POST /api/movements/new to an existing StorageItem', { skip: false }, async (t) => {
    const app = await build();
    const payloads = getMockedMovementPayloads();

    t.teardown(async () => {
        await cleanDb();
        await app.close();
    });

    try {
        const res = await app.inject({
            url: '/api/movements/new',
            method: 'POST',
            payload: payloads[0],
            headers: {
                ['content-type']: 'application/json',
            },
        });

        const itemEntity = await fetchEntity<IStorageItem, StorageItemModel>(StorageItem, {
            ingredient: payloads[0].ingredient,
        });
        const item = itemEntity.instance;
        const itemCount = itemEntity.count;
        t.type(item, 'object', 'should return an storage item document');

        t.equal(item?.amount, payloads[0].amount, 'should have the same amount as in the passed movement');
        t.equal(itemCount, 1, 'should have only one document on the StorageItem collection');
        t.equal(res.statusCode, 200, 'returns a statusCode of 200 POST /api/movements/new');
    } catch (error) {
        t.error(error);
    }

    try {
        const payload: MovementBodySchemaType = {
            ...payloads[0],
            amount: 2000,
        };

        const res = await app.inject({
            url: '/api/movements/new',
            method: 'POST',
            payload,
            headers: {
                ['content-type']: 'application/json',
            },
        });

        const itemEntity = await fetchEntity<IStorageItem, StorageItemModel>(StorageItem, {
            ingredient: payloads[0].ingredient,
        });
        const item = itemEntity.instance;
        const itemCount = itemEntity.count;

        t.type(item, 'object', 'should return an storage item document');
        t.equal(item?.amount, 2100, 'should have the new amount');
        t.equal(itemCount, 1, 'should have only one document on the StorageItem collection');
        t.equal(item?.movements.length, 2, 'should have two documents on the Movement array');
        t.equal(res.statusCode, 200, 'should return a statusCode of 200 for second POST /api/movements/new');
    } catch (error) {
        t.error(error);
    }
});

test('Movements: GET /api/movements', { skip: false }, async (t) => {
    const ingredients = getMockedIngredients(10);
    const storageItems = getMockedStorageItems(20, ingredients);

    const app = await build();

    t.teardown(async () => {
        await cleanDb();
        await app.close();
    });
    try {
        const resultIngredients = await Ingredient.insertMany(ingredients);
        const resultStorageItems = await StorageItem.insertMany(storageItems);

        t.equal(resultIngredients.length, 10, 'should insert 3 mocked storage items');
        t.equal(resultStorageItems.length, 20, 'should insert 3 mocked storage items');

        const res = await app.inject({
            url: '/api/movements',
        });

        t.equal(res.statusCode, 200, 'should return a statusCode of 200 for GET /api/movements');
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8', 'should have the correct headers');
        t.type(res.body, 'string', 'should have a response.body prop type string');

        const body = res.json();

        t.equal(body.length, 10, 'should return the same amount of movements as mocked');
        t.type(body[1].amount, 'number', 'should have a prop amount of type number');
        t.type(body[1].ingredient, 'object', 'should have a prop ingredient of type object');
        t.type(body[1].ingredient.category, 'string', 'should have a prop ingredient.category of type string');
    } catch (error) {
        t.error(error);
    } finally {
        t.end();
    }
});
