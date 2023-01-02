import { test } from 'tap';
import { isLocalhost } from '../../../src/lib/utils/url';

test('Lib/Url: ', (t) => {
    t.test('isLocalhost', (t) => {
        t.test('returns true for a url string that contains localhost', (t) => {
            const result = isLocalhost('http://localhost');
            t.ok(result);
            t.end();
        });

        t.test('returns false any other url or type', (t) => {
            [
                'http://google.com',
                'google.com',
                'https://foo.com',
                'yahoo.ya',
                null,
                124,
                ['test'],
                { test: 2 },
            ].forEach((url: unknown) => {
                const result = isLocalhost(url as string);
                t.notOk(result, `should be false for ${url}`);
            });
            t.end();
        });
        t.end();
    });
    t.end();
});
