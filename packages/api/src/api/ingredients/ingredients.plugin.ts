import { FastifyInstance } from 'fastify';
import { Static, Type } from '@sinclair/typebox';
import IngredientsService from './ingredients.service';

const Query = Type.Object({
    limit: Type.String(),
    currentPage: Type.String(),
});

type Querystring = Static<typeof Query>;

async function ingredientsPlugin(fastify: FastifyInstance) {
    fastify.route<{ Querystring: Querystring }>({
        method: 'GET',
        url: '/api/ingredients',
        handler: async () => {
            return IngredientsService.findAll();
        },
    });
}

export default ingredientsPlugin;
