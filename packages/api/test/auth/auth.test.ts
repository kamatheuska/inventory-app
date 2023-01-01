import { IUser, UserModel } from '@inventory-app/types';
import { test } from 'tap';
import { getMockedUsers } from '../../src/api/auth/user.mock';
import User from '../../src/api/auth/user.model';
import { build, fetchEntity } from '../helper';
import { getLoginOptions, getSignupOptions, runLoginAssertions, runCreatedUserAssertions } from './utils.auth';

async function cleanDb() {
    await User.deleteMany({});
}

test('Auth: Signup: POST /api/auth/signup', { skip: false }, async (t) => {
    process.env.DISABLE_SIGNUP = 'false';

    const app = await build();

    const users = await getMockedUsers(4);

    t.teardown(async () => {
        await cleanDb();
        await app.close();
    });

    try {
        const res = await app.inject(getSignupOptions(users[0]));

        t.equal(res.statusCode, 200, 'returns a statusCode of 200');

        const fetched = await fetchEntity<IUser, UserModel>(User, {
            username: users[0].username,
        });
        runCreatedUserAssertions(t, users[0], fetched);
    } catch (error) {
        t.error(error);
    } finally {
        t.end();
    }
});

test('Auth: Signup: Fail to signup when DISABLE_SIGNUP is set to false', { skip: false }, async (t) => {
    process.env.DISABLE_SIGNUP = 'true';
    const app = await build();

    const users = await getMockedUsers(4);

    t.teardown(async () => {
        await cleanDb();
        await app.close();
    });

    try {
        const res = await app.inject(getSignupOptions(users[0]));

        t.equal(res.statusCode, 400, 'returns a statusCode of 200');

        const { count, instance: user } = await fetchEntity<IUser, UserModel>(User, {
            username: users[0].username,
        });

        t.equal(user, null, 'should not find any added documents');

        t.equal(count, 0, 'should have only one document on the Users collection');
    } catch (error) {
        t.error(error);
    } finally {
        t.end();
    }
});

test('Auth: Login: Logs in a user that is already signed up', { skip: false }, async (t) => {
    process.env.DISABLE_SIGNUP = 'false';

    const app = await build();
    const users = await getMockedUsers(4);

    t.teardown(async () => {
        await cleanDb();
        await app.close();
    });

    try {
        const res = await app.inject(getSignupOptions(users[0]));

        t.equal(res.statusCode, 200, 'returns a statusCode of 200 for the signup');

        const fetched = await fetchEntity<IUser, UserModel>(User, {
            username: users[0].username,
        });

        runCreatedUserAssertions(t, users[0], fetched);
    } catch (error) {
        t.error(error);
    }

    try {
        const res = await app.inject(getLoginOptions(users[0]));

        const fetched = await fetchEntity<IUser, UserModel>(User, {
            username: users[0].username,
        });

        t.equal(res.statusCode, 200, 'returns a statusCode of 200 for /api/auth/login');

        runLoginAssertions(t, users[0], fetched, res);
    } catch (error) {
        t.error(error);
    } finally {
        t.end();
    }
});

test('Auth: Login: Fails to login a user that does not exist', { skip: false }, async (t) => {
    const app = await build();
    const users = await getMockedUsers(4);

    t.teardown(async () => {
        await cleanDb();
        await app.close();
    });

    try {
        const res = await app.inject(getLoginOptions(users[0]));

        t.equal(res.statusCode, 401, 'returns a statusCode of 401 for /api/auth/login');
    } catch (error) {
        t.error(error);
    } finally {
        t.end();
    }
});

test('Auth: Login: Fails to login with the password of a different user', { skip: false }, async (t) => {
    process.env.DISABLE_SIGNUP = 'false';

    const app = await build();
    const users = await getMockedUsers(4);

    t.teardown(async () => {
        await cleanDb();
        await app.close();
    });

    try {
        const res = await app.inject(getSignupOptions(users[0]));

        t.equal(res.statusCode, 200, 'signup: returns a statusCode of 200');

        const fetched = await fetchEntity<IUser, UserModel>(User, {
            username: users[0].username,
        });

        runCreatedUserAssertions(t, users[0], fetched);
    } catch (error) {
        t.error(error);
    }

    try {
        const res = await app.inject(
            getLoginOptions({
                username: users[1].username,
                password: users[0].password,
            })
        );

        const { instance: user } = await fetchEntity<IUser, UserModel>(User, {
            username: users[0].username,
        });

        t.equal(user?.tokens.length, 0, 'login: user signed up should not have any tokens');
        t.equal(res.statusCode, 401, 'login: returns a statusCode of 401 for /api/auth/login');
    } catch (error) {
        t.error(error);
    } finally {
        t.end();
    }
});
