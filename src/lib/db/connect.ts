import mongoose from 'mongoose';

export async function connectToDatabase(uri: string) {
  mongoose.set('strictQuery', true);
  mongoose.set('autoIndex', false);
  
  const instance = await mongoose.connect(uri);

  return instance.connection;
}
