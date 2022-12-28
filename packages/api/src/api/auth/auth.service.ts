import { IToken, TokenPayload, UserCredentials } from '@inventory-app/types';
import * as createHttpError from 'http-errors';
import User from './user.model';
import { signJWTAsync, verifyJWTAsync } from '../../lib/utils/jwt';
import { parse } from '@lukeed/ms';

class AuthService {
    static async signup({ username, password }: UserCredentials, secret: string) {
        const tokenPayload: TokenPayload = {
            username,
            password,
        };

        const hashedPassword = await signJWTAsync(tokenPayload, secret);
        const user = new User({
            username,
            password: hashedPassword,
        });

        return user.save();
    }

    static async login(credentials: UserCredentials, secret: string): Promise<IToken> {
        const user = await AuthService.verifyUser(credentials, secret);
        const token = await AuthService.createToken(user, secret);

        user.tokens.push(token);

        await user.save();

        return token;
    }

    static async verifyUser({ username, password }: UserCredentials, secret: string) {
        const user = await User.findOne({ username });

        if (!user) throw new createHttpError.Unauthorized('No user with that username');

        const decoded: TokenPayload = await verifyJWTAsync(user.password, secret);

        if (decoded.password !== password) throw new createHttpError.Unauthorized('Password does not match');

        return user;
    }

    static async createToken({ username, password }: UserCredentials, secret: string): Promise<IToken> {
        const hash = await signJWTAsync({ username, password }, secret, {
            expiresIn: parse('12h') || 10000,
        });

        return { hash };
    }
}

export default AuthService;
