import { IUser, UserCredentials } from '@inventory-app/types';
import { InjectOptions, LightMyRequestResponse } from 'fastify';
import * as cookie from 'cookie';
import { cookies } from '../../src/lib/constants';
import { FetchedTestEntity } from 'types';

export type InjectOptionsFunction<T> = (users: T, headers?: InjectOptions['headers']) => InjectOptions;

export const getSignupOptions: InjectOptionsFunction<IUser> = (user, headers = {}) => ({
    url: '/api/auth/signup',
    method: 'POST',
    payload: user,
    headers: {
        ['content-type']: 'application/json',

        Origin: 'http://localhost:5000',
        ...headers,
    },
});

export const getLoginOptions: InjectOptionsFunction<UserCredentials> = (credentials, headers = {}) => ({
    url: '/api/auth/login',
    method: 'POST',
    payload: credentials,
    headers: {
        ['content-type']: 'application/json',

        Origin: 'http://localhost:5000',
        ...headers,
    },
});

export function runCreatedUserAssertions(
    t: Tap.Test,
    mockedUser: IUser,
    { instance: user, count }: FetchedTestEntity<IUser>
) {
    t.type(user, 'object', 'user: should return an user document');
    t.equal(user?.username, mockedUser.username, 'user: should have the same username as in the passed user');
    t.not(user?.password, mockedUser.password, 'user: should have a different password as the one passed');
    t.equal(count, 1, 'user: should have only one document on the Users collection');
}

export function runLoginAssertions(
    t: Tap.Test,
    mockedUser: IUser,
    { instance: user, count }: FetchedTestEntity<IUser>,
    res: LightMyRequestResponse
) {
    if (res.headers['set-cookie'] && typeof res.headers['set-cookie'] == 'string') {
        const parsedCookies = cookie.parse(res.headers['set-cookie']);
        t.type(parsedCookies[cookies.AUTH], 'string', 'should return a Set-Cookie header type string');
    }

    t.type(user, 'object', 'should return an user document');
    t.equal(user?.username, mockedUser.username, 'should have the same username as in the passed user');
    t.not(user?.password, mockedUser.password, 'should have a different password as the one passed');
    t.equal(count, 1, 'should have only one document on the Users collection');
    t.ok(Array.isArray(user?.tokens), 'should have an array of tokens');
    t.equal(user?.tokens.length, 1, 'should only one token in the tokens array');
    t.hasProp(user?.tokens[0], 'hash', 'should have one token with a hash prop');
    t.type(user?.tokens[0].hash, 'string', 'should have one token with a hash prop type string');
}
