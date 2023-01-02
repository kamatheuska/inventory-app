import cors, { FastifyCorsOptions } from '@fastify/cors';
import debug from 'debug';
import * as fp from 'lodash/fp';
import fastifyPlugin from 'fastify-plugin';
import { isLocalhost } from '../../lib/utils/url';

const $debug = debug('app:debug:plugins:cors');

export default fastifyPlugin<FastifyCorsOptions>(async (fastify) => {
    const { config, isDevelopment } = fastify;

    await fastify.register(cors, {
        origin: (origin, cb) => {
            $debug('Origin:', origin);

            const hostname = new URL(origin).hostname;

            if (isLocalhost(hostname) && isDevelopment) {
                cb(null, true);
                return;
            }

            const list: string[] = fp.split(',')(config.WHITE_LISTED_DOMAINS);

            $debug('Whitelisted Domains list: %O', list);

            if (list.includes(hostname)) {
                cb(null, true);
                return;
            }

            cb(new Error('Not allowed'), false);
        },
    });
});
