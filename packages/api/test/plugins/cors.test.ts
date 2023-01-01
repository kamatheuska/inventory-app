import { test } from 'tap';
import { build } from '../helper';

test('Plugins:CORS sets the correct header when a request comes from a localhost host', { skip: false }, async (t) => {
    const app = await build();
    t.ok(app, 'should build app correctly');

    const res = await app.inject({
        url: '/api/movements',
        headers: {
            Origin: 'http://localhost:5000',
        },
    });

    t.equal(res.statusCode, 200, 'should return a 200 status code');
    t.type(
        res.headers['access-control-allow-origin'],
        'string',
        'should return access-control-allow-origin header with the response'
    );

    await app.close();
});

test(
    'Plugins:CORS sets the correct header when a request comes from a whitelisted host',
    { skip: false },
    async (t) => {
        process.env.WHITE_LISTED_DOMAINS = 'foobar.com';

        const app = await build();
        t.ok(app, 'should build app correctly');

        const res = await app.inject({
            url: '/api/movements',
            headers: {
                Origin: 'http://foobar.com/feh',
            },
        });

        t.equal(res.statusCode, 200, 'should return a 200 status code');
        t.type(
            res.headers['access-control-allow-origin'],
            'string',
            'should return access-control-allow-origin header with the response'
        );

        await app.close();
    }
);

test(
    'Plugins:CORS sets the correct header when a request comes from a whitelisted host and accepts list of domains in env var WHITE_LISTED_DOMAINS',
    { skip: false },
    async (t) => {
        process.env.WHITE_LISTED_DOMAINS = 'foosbar.com,foobar.com';

        const app = await build();
        t.ok(app, 'should build app correctly');

        const res = await app.inject({
            url: '/api/movements',
            headers: {
                Origin: 'http://foobar.com/feh',
            },
        });

        t.equal(res.statusCode, 200, 'should return a 200 status code');
        t.type(
            res.headers['access-control-allow-origin'],
            'string',
            'should return access-control-allow-origin header with the response'
        );

        await app.close();
    }
);

test(
    'Plugins:CORS does not set any CORS header when a request comes from a non whitelisted host',
    { skip: false },
    async (t) => {
        process.env.WHITE_LISTED_DOMAINS = 'fehbar.com';
        const app = await build();
        t.ok(app, 'should build app correctly');

        const res = await app.inject({
            url: '/api/movements',
            method: 'GET',
            headers: {
                Origin: 'https://foobar.com',
            },
        });

        t.equal(res.statusCode, 500, 'should return a 500 status code');
        t.equal(
            res.headers['access-control-allow-origin'],
            undefined,
            'should not return access-control-allow-origin header with the response'
        );

        await app.close();
    }
);
