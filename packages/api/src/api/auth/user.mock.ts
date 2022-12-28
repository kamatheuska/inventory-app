import { faker } from '@faker-js/faker';

import { IUser } from '@inventory-app/types';
import { signJWTAsync } from '../../lib/utils/jwt';

export const getMockedUsersWithHashedPasswords = async (amount: number, appSecret: string): Promise<IUser[]> => {
    const arrayPlaceholder = [...Array(amount)];

    return Promise.all(
        arrayPlaceholder.map(async () => {
            const username = faker.internet.userName();
            const password = faker.internet.password();

            const hashedPassword = await signJWTAsync({ username, password }, appSecret);

            return {
                username,
                password: hashedPassword,
                tokens: [],
            };
        })
    );
};
export const getMockedUsers = (amount: number): IUser[] => {
    const arrayPlaceholder = [...Array(amount)];

    return arrayPlaceholder.map(() => {
        const username = faker.internet.userName();
        const password = faker.internet.password();

        return {
            username,
            password,
            tokens: [],
        };
    });
};
