import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import StorageItemService from './storage-item.service';

const Query = Type.Object({
    limit: Type.String(),
    currentPage: Type.String(),
});

type Querystring = Static<typeof Query>;

async function storageItemPlugin(fastify: FastifyInstance) {
    fastify.route<{ Querystring: Querystring }>({
        method: 'GET',
        url: '/api/storage-items',
        handler: async () => {
            return StorageItemService.findAll();
        },
    });
}

export default storageItemPlugin;
