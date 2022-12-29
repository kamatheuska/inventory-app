import mongoose, { ConnectOptions } from 'mongoose';

export async function connectToDatabase(uri: string, options: ConnectOptions = {}) {
    mongoose.set('strictQuery', true);
    mongoose.set('autoIndex', false);

    const instance = await mongoose.connect(uri, options);

    return instance.connection;
}
