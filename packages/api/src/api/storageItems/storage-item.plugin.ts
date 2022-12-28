import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import StorageItemService from './storage-item.service';

const Query = Type.Object({
    limit: Type.String(),
    currentPage: Type.String(),
});

const Params = Type.Object({
    id: Type.String(),
});

type Querystring = Static<typeof Query>;
type ParamsType = Static<typeof Params>;

async function storageItemPlugin(fastify: FastifyInstance) {
    fastify.route<{ Querystring: Querystring }>({
        method: 'GET',
        url: '/api/storage-items',
        handler: async () => {
            return StorageItemService.findAll();
        },
    });

    fastify.route<{ Querystring: Querystring; Params: ParamsType }>({
        method: 'GET',
        url: '/api/storage-items/:id',
        schema: {
            params: Params,
        },
        handler: async (req) => {
            const { id } = req.params;
            return StorageItemService.findById(id);
        },
    });
}

export default storageItemPlugin;
