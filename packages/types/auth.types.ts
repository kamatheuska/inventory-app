import { Document, Model, Types } from 'mongoose';

export interface UserHashedCredentials {
    username: string;
    hashedPassword: string;
}

export interface UserCredentials {
    username: string;
    password: string;
}

export interface IUser {
    username: string;
    password: string;
    tokens: IToken[];
}

export type VerifiedUser = Promise <{
    user: UserDocument,
    decoded: TokenPayload,
}>

export type UserModel = Model<IUser>;

export type UserDocument = Document<unknown, any, IUser> & IUser & {
    _id: Types.ObjectId;
};


export interface IToken {
    hash: string;
    createdAt?: Date;
}

export interface TokenPayload {
    username: string;
    password: string;
}

export type TokenModel = Model<IToken>;
