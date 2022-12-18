import { FastifyInstance } from "fastify";
import { Static, Type } from '@sinclair/typebox'
import StorageItemService from "../storageItems/storage-item.service";

const Query = Type.Object({
  limit: Type.String(),
  currentPage: Type.String(),
})

const MovementBodySchema = Type.Object({
  ingredient: Type.String(),
  amount: Type.Number(),
  operation: Type.String()
})

type Querystring = Static<typeof Query>
export type MovementBodySchemaType = Static<typeof MovementBodySchema>

async function movementPlugin(fastify: FastifyInstance) {
  fastify.route<{ Querystring: Querystring }>({
    method: 'GET',
    url: '/api/movements',
    handler: async () => {
      return StorageItemService.findAllMovements();
    }
  });

  fastify.route<{ Querystring: Querystring, Body: MovementBodySchemaType }>({
    method: 'POST',
    url: '/api/movements/new',
    schema: {
      body: MovementBodySchema,
    },
    handler: async (req) => {
      await StorageItemService.addMovement({
        amount: req.body.amount,
        operation: req.body.operation,
        ingredient: req.body.ingredient,
      })
    }
  });
}

export default movementPlugin;