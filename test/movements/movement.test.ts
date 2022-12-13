import { test } from 'tap'
import { getMockedMovements } from '../../src/movements/movement.mocks'
import { build } from '../helper'
import Movement from '../../src/movements/movement.model'
import StorageItem from '../../src/storageItems/storage-item.model'
import { IStorageItem } from '../../src/storageItems/storage-item.types'
import { IMovement } from '../../src/movements/movement.types'
import { Types } from 'mongoose'

async function cleanDb() {
  await Movement.deleteMany({})
  await StorageItem.deleteMany({})
}

async function fetchEntity(Model: any, filter: any) {
  const count = await Model.countDocuments()
  const instance = await Model.findOne(filter)
  if (instance) {
    return {
      count,
      instance
    };
  } else {
    throw new Error('storage item not found')
  }  
}


test('Movements: POST /api/movements/new', async (t) => {
  const app = await build()
  const movements = getMockedMovements();

  t.teardown(async () => {
    await cleanDb()
    await app.close()
  })

  try {
    const res = await app.inject({
      url: '/api/movements/new',
      method: 'POST',
      payload: movements[0],
      headers: {
        ['content-type']: 'application/json'
      }
    })
  
    const itemEntity = await fetchEntity(StorageItem, { ingredientId: movements[0].ingredientId })
    const item = itemEntity.instance as unknown as IStorageItem;
    const itemCount = itemEntity.count;
    
    t.equal(item.amount, movements[0].amount, 'should have the same amount as in the passed movement')
    t.equal(itemCount, 1, 'should have only one document on the collection')
  
    const movementEntity = await fetchEntity(Movement, { ingredientId: movements[0].ingredientId })
    const movement = movementEntity.instance as unknown as IMovement;
    const movementCount = movementEntity.count;
    
    t.equal(movement.amount, movements[0].amount, 'should have the same amount as in the passed movement')
    t.equal(movementCount, 1, 'should have only one document on the collection')
    
    t.equal(res.statusCode, 200, 'returns a statusCode of 200')
  } catch (error) {
    t.error(error)
  } finally {
    t.end()
  }
})

test('Movements: GET /api/movements', async (t) => {
  
  const movements = getMockedMovements();
  const app = await build()

  t.teardown(async () => {
    await cleanDb()
    await app.close();
  })
  try {
    const result =  await Movement.insertMany(movements);
    t.equal(result.length, 3, 'should insert mocked movements')
    const res = await app.inject({
      url: '/api/movements'
    })
  
  
    t.equal(res.statusCode, 200, 'returns a statusCode of 200')
    t.equal(res.headers['content-type'], 'application/json; charset=utf-8')
    t.type(res.body, 'string')
  
    const body = res.json();
    
    t.equal(body.length, movements.length, 'should return the same amount of movements as mocked');
    t.equal(body[0].amount, movements[0].amount, 'should be equal to mocked movement amount')
    t.equal(
      body[1].ingredientId,
      (movements[1].ingredientId as Types.ObjectId).toString(),
      'should be equal to ingredientId'  
    )
    
  } catch (error) {
    t.error(error)
  } finally {
    t.end()
  }
})