import { FastifyInstance } from "fastify";
import { Static, Type } from '@sinclair/typebox'
import MovementService from "./movement.service";
import StorageItemService from "../storageItems/storage-item.service";

const Query = Type.Object({
  limit: Type.String(),
  currentPage: Type.String(),
})

const Movement = Type.Object({
  ingredientId: Type.String(),
  amount: Type.Number(),
  operation: Type.String()
})

type Querystring = Static<typeof Query>
export type MovementType = Static<typeof Movement>

async function movementPlugin(fastify: FastifyInstance) {
  fastify.route<{ Querystring: Querystring }>({
    method: 'GET',
    url: '/api/movements',
    handler: async () => {
      return MovementService.findAll();
    }
  });

  fastify.route<{ Querystring: Querystring, Body: MovementType }>({
    method: 'POST',
    url: '/api/movements/new',
    handler: async (req) => {
      const movement = {
        ingredientId: req.body.ingredientId,
        amount: req.body.amount,
        operation: req.body.operation,
      }
      await MovementService.add(movement);
      await StorageItemService.handleMovement(movement);
    }
  });
}

export default movementPlugin;