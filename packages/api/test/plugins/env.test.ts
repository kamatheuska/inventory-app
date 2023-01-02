import { test } from 'tap';
import { build } from '../helper';

test('Plugins:Env: when NODE_ENV is in development, GET /plugins/env/config returns a config object', async (t) => {
    const initialNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    const app = await build();

    const res = await app.inject({
        url: '/plugins/env/config',
        method: 'GET',
        headers: {
            origin: 'http://localhost:5000',
        },
    });

    const body = res.json();

    t.equal(res.statusCode, 200, 'should return a statusCode of 200');
    t.hasProp(body, 'reqid');
    t.hasProp(body, 'cors');
    t.hasProp(body.cors, 'whitelisted');

    process.env.NODE_ENV = initialNodeEnv;

    await app.close();
});

test('Plugins:Env: when NODE_ENV is production, GET /plugins/env/config fails', async (t) => {
    const initialNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    const app = await build();

    const res = await app.inject({
        url: '/plugins/env/config',
        method: 'GET',
        headers: {
            origin: 'http://localhost:5000',
        },
    });
    t.equal(res.statusCode, 404, 'should return a statusCode of 404');

    process.env.NODE_ENV = initialNodeEnv;

    await app.close();
});
