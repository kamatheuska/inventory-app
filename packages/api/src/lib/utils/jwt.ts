import { TokenPayload } from '@inventory-app/types';
import { createSigner, createVerifier, SignerOptions } from 'fast-jwt';

export async function signJWTAsync(payload: TokenPayload, secret: string, options?: Partial<SignerOptions>) {
    const asyncSigner = createSigner({
        ...options,
        key: async () => secret,
    });

    return await asyncSigner(payload);
}

export async function verifyJWTAsync(token: string | Buffer, secret: string, options?: Partial<SignerOptions>) {
    const asyncVerifier = createVerifier({
        ...options,
        key: async () => secret,
    });

    return await asyncVerifier(token);
}
