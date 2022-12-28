import { IToken, IUser, TokenModel, UserModel } from '@inventory-app/types';
import { model, Schema } from 'mongoose';

const tokenSchema = new Schema<IToken, TokenModel>(
    {
        hash: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const userSchema = new Schema<IUser, UserModel>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    tokens: [tokenSchema],
});

const User = model('User', userSchema);

export default User;
