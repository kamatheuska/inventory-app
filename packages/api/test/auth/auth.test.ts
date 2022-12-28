import { IUser, UserModel } from '@inventory-app/types';
import { test } from 'tap';
import { getMockedUsers } from '../../src/api/auth/user.mock';
import User from '../../src/api/auth/user.model';
import { build, fetchEntity } from '../helper';

async function cleanDb() {
    await User.deleteMany({});
}

test('Auth: POST /api/auth/signup with DISABLE_SIGNUP set to false', async (t) => {
    process.env.DISABLE_SIGNUP = 'false';

    const app = await build();

    const users = await getMockedUsers(4);

    t.teardown(async () => {
        await cleanDb();
        await app.close();
    });

    try {
        const res = await app.inject({
            url: '/api/auth/signup',
            method: 'POST',
            payload: users[0],
            headers: {
                ['content-type']: 'application/json',
            },
        });

        t.equal(res.statusCode, 200, 'returns a statusCode of 200');

        const itemEntity = await fetchEntity<IUser, UserModel>(User, {
            username: users[0].username,
        });

        const user = itemEntity.instance;
        const userCount = itemEntity.count;
        t.type(user, 'object', 'should return an user document');

        t.equal(user?.username, users[0].username, 'should have the same username as in the passed user');
        t.not(user?.password, users[0].password, 'should have a different password as the one passed');
        t.equal(userCount, 1, 'should have only one document on the Users collection');
    } catch (error) {
        t.error(error);
    } finally {
        t.end();
    }
});

test('Auth: POST /api/auth/signup: Fail to post when DISABLE_SIGNUP is set to true', async (t) => {
    process.env.DISABLE_SIGNUP = 'true';
    const app = await build();

    const users = await getMockedUsers(4);

    t.teardown(async () => {
        await cleanDb();
        await app.close();
    });

    try {
        const res = await app.inject({
            url: '/api/auth/signup',
            method: 'POST',
            payload: users[0],
            headers: {
                ['content-type']: 'application/json',
            },
        });

        t.equal(res.statusCode, 400, 'returns a statusCode of 200');

        const itemEntity = await fetchEntity<IUser, UserModel>(User, {
            username: users[0].username,
        });

        const user = itemEntity.instance;
        const userCount = itemEntity.count;
        t.equal(user, null, 'should not find any added documents');

        t.equal(userCount, 0, 'should have only one document on the Users collection');
    } catch (error) {
        t.error(error);
    } finally {
        t.end();
    }
});
