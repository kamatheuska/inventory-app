import cors, { FastifyCorsOptions } from '@fastify/cors';
import debug from 'debug';
import fastifyPlugin from 'fastify-plugin';

const $debug = debug('app:debug:plugins:cors');

export default fastifyPlugin<FastifyCorsOptions>(async (fastify) => {
    const { config } = fastify;

    await fastify.register(cors, {
        origin: (origin, cb) => {
            $debug('Origin:', origin);

            const hostname = new URL(origin).hostname;

            if (hostname === 'localhost') {
                cb(null, true);
                return;
            }

            let validHostsList: string[] = [];

            if (config.WHITE_LISTED_DOMAINS && typeof config.WHITE_LISTED_DOMAINS === 'string') {
                validHostsList = config.WHITE_LISTED_DOMAINS.split(',');
            }

            if (validHostsList.includes(hostname)) {
                cb(null, true);
                return;
            }

            cb(new Error('Not allowed'), false);
        },
    });
});