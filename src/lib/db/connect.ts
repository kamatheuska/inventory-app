import mongoose from 'mongoose';

export async function connectToDatabase(uri: string) {
  mongoose.set('strictQuery', true);
  const instance = await mongoose.connect(uri);

  return instance.connection;
}
