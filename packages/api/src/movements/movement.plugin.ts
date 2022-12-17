import { FastifyInstance } from "fastify";
import { Static, Type } from '@sinclair/typebox'
import StorageItemService from "../storageItems/storage-item.service";

const Query = Type.Object({
  limit: Type.String(),
  currentPage: Type.String(),
})

const MovementPayload = Type.Object({
  ingredientId: Type.String(),
  amount: Type.Number(),
  operation: Type.String()
})

type Querystring = Static<typeof Query>
export type MovementPayloadType = Static<typeof MovementPayload>

async function movementPlugin(fastify: FastifyInstance) {
  fastify.route<{ Querystring: Querystring }>({
    method: 'GET',
    url: '/api/movements',
    handler: async () => {
      return StorageItemService.findAllMovements();
    }
  });

  fastify.route<{ Querystring: Querystring, Body: MovementPayloadType }>({
    method: 'POST',
    url: '/api/movements/new',
    handler: async (req) => {
      await StorageItemService.addMovement({
        amount: req.body.amount,
        operation: req.body.operation,
        ingredientId: req.body.ingredientId
      })
    }
  });
}

export default movementPlugin;